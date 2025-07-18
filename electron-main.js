const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const cron = require("node-cron");

// Centralized file path config
const userDataPath = app.getPath("userData");
const FILES = {
  volunteers: path.join(userDataPath, "volunteers.json"),
  shifts: path.join(userDataPath, "shifts.json"),
  currentVolunteer: path.join(userDataPath, "currentVolunteer.json"),
  defaultVolunteers: path.join(__dirname, "data", "volunteers.json"),
  defaultShifts: path.join(__dirname, "data", "shifts.json"),
};

function ensureFileExists(filePath, defaultFilePath) {
  if (!fs.existsSync(filePath)) {
    fs.copyFileSync(defaultFilePath, filePath);
    console.log(`Created default file at ${filePath}`);
  }
}

function readJSON(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

let isWritingShifts = false; 

function writeJSON(filePath, data) {
  if (filePath === FILES.shifts) {
    if (isWritingShifts) {
      console.warn("Save already in progress, skipping");
      return;
    }
    isWritingShifts = true;
  }
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save file:", error);
  } finally {
    if (filePath === FILES.shifts) {
      isWritingShifts = false;
    }
  }
}

function updateById(array, updatedItem) {
  const index = array.findIndex((item) => item.id === updatedItem.id);
  if (index !== -1) {
    array[index] = updatedItem;
    return true;
  }
  return false;
}

function isValidDate(dateString, timeString) {
  const d = new Date(`${dateString}T${timeString}`);
  return !isNaN(d.getTime());
}

function updateCompletedShifts() {
  try {
    const now = new Date();
    const shifts = readJSON(FILES.shifts);
    let updated = false;

    const updatedShifts = shifts.map((shift) => {
      if (!isValidDate(shift.date, shift.startTime) || !isValidDate(shift.date, shift.endTime)) return shift;
      let shiftStart = new Date(`${shift.date}T${shift.startTime}`);
      let shiftEnd = new Date(`${shift.date}T${shift.endTime}`);

      if (shiftEnd <= shiftStart) {
        shiftEnd.setDate(shiftEnd.getDate() + 1);
      }

      if (shift.status !== "Completed" && shiftEnd < now) {
        updated = true;
        return { ...shift, status: "Completed" };
      }
      return shift;
    });

    if (updated) {
      writeJSON(FILES.shifts, updatedShifts);
      console.log("Updated shifts statuses to Completed where needed");
    } else {
      console.log("No shifts needed status update");
    }
  } catch (error) {
    console.error("Error during updateCompletedShifts:", error);
  }
}

function scheduleDailyUpdate() {
  cron.schedule("0 0 * * *", () => {
    console.log("Running daily shifts status update at midnight");
    updateCompletedShifts();
  });
}

app.whenReady().then(() => {
  ensureFileExists(FILES.volunteers, FILES.defaultVolunteers);
  ensureFileExists(FILES.shifts, FILES.defaultShifts);

  createWindow();

  scheduleDailyUpdate();
  updateCompletedShifts(); 
});

ipcMain.handle("getCurrentVolunteerId", () => {
  try {
    if (fs.existsSync(FILES.currentVolunteer)) {
      const data = fs.readFileSync(FILES.currentVolunteer, "utf-8");
      return JSON.parse(data).id;
    }
    return null;
  } catch (err) {
    console.error("Error reading current volunteer ID:", err);
    return null;
  }
});

ipcMain.handle("setCurrentVolunteerId", (event, id) => {
  try {
    if (id === null) {
      if (fs.existsSync(FILES.currentVolunteer))
        fs.unlinkSync(FILES.currentVolunteer);
    } else {
      fs.writeFileSync(FILES.currentVolunteer, JSON.stringify({ id }), "utf-8");
    }
    return true;
  } catch (err) {
    console.error("Error writing current volunteer ID:", err);
    return false;
  }
});

ipcMain.handle("getVolunteers", () => {
  try {
    return readJSON(FILES.volunteers);
  } catch (err) {
    console.error("Error reading volunteers:", err);
    return [];
  }
});

ipcMain.handle("saveVolunteers", (event, volunteers) => {
  try {
    writeJSON(FILES.volunteers, volunteers);
    return true;
  } catch (err) {
    console.error("Error saving volunteers:", err);
    return false;
  }
});

ipcMain.handle("getShifts", () => {
  try {
    updateCompletedShifts(); 
    return readJSON(FILES.shifts);
  } catch (err) {
    console.error("Error getting shifts:", err);
    return [];
  }
});

ipcMain.handle("updateShift", (event, updatedShift) => {
  try {
    const shifts = readJSON(FILES.shifts);
    if (updateById(shifts, updatedShift)) {
      writeJSON(FILES.shifts, shifts);
      return updatedShift;
    } else {
      return { error: "Shift not found" };
    }
  } catch (err) {
    console.error("Error updating shift:", err);
    return { error: "Internal error" };
  }
});

ipcMain.handle("saveShift", (event, shift) => {
  try {
    const shifts = readJSON(FILES.shifts);
    const newShift = {
      ...shift,
      id: Date.now().toString(),
    };
    shifts.push(newShift);
    writeJSON(FILES.shifts, shifts);
    return newShift;
  } catch (err) {
    console.error("Error saving shift:", err);
    return { error: "Internal error" };
  }
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true, 
      contextIsolation: false, 
    },
  });
  win.loadURL("http://localhost:3000");
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
