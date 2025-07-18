import React, { useState } from "react";
import { Box, TextField, Button, Autocomplete } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { heIL } from "@mui/x-date-pickers/locales";
import dayjs, { Dayjs } from "dayjs";

import * as S from "./ShiftForm.style";
import { ShiftFormData } from "../../types/shiftTypes";
import { ShiftStatus } from "../../constants/shiftStatus";
import { validateShift } from "../../utils/validate";
import { departments } from "../../constants/departments";

interface ShiftFormProps {
  onAdd: (data: ShiftFormData) => void;
  volunteers: { id: string; name: string }[];
}

const ShiftForm: React.FC<ShiftFormProps> = (props) => {
  const { onAdd, volunteers } = props;
  const initialFormData: ShiftFormData = {
    date: "",
    startTime: "",
    endTime: "",
    department: "",
    volunteerId: "",
    status: ShiftStatus.Planned,
    description: "",
  };

  const [formData, setFormData] = useState<ShiftFormData>(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ShiftFormData, string>>
  >({});

  const handleChange = (
    field: keyof ShiftFormData,
    value: string | ShiftStatus | Dayjs | null
  ) => {
    if (
      (field === "date" || field === "startTime" || field === "endTime") &&
      dayjs.isDayjs(value)
    ) {
      const formatted =
        field === "date" ? value.format("YYYY-MM-DD") : value.format("HH:mm");
      setFormData((prev) => ({ ...prev, [field]: formatted }));
    } else if (
      value === null &&
      (field === "date" || field === "startTime" || field === "endTime")
    ) {
      setFormData((prev) => ({ ...prev, [field]: "" }));
    } else if (typeof value === "string" || typeof value === "number") {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
    // נקה את השגיאה עבור השדה הספציפי ברגע שמשנים אותו
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateShift(formData);

    if (Object.keys(validationErrors).length === 0) {
      onAdd(formData);
      setFormData(initialFormData);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <S.Container>
      <S.Title>הוספת משמרת</S.Title>
      <S.ShiftForm onSubmit={handleSubmit}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={
            heIL.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <DatePicker
            label="תאריך"
            value={formData.date ? dayjs(formData.date) : null}
            onChange={(newValue: Dayjs | null) =>
              handleChange("date", newValue)
            }
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors.date,
                helperText: errors.date,
                inputProps: { placeholder: "", dir: "rtl" },
              },
            }}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <TimePicker
              label="שעת התחלה"
              value={
                formData.startTime
                  ? dayjs(`2000-01-01T${formData.startTime}`)
                  : null
              }
              onChange={(newValue: Dayjs | null) =>
                handleChange("startTime", newValue)
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.startTime,
                  helperText: errors.startTime,
                  inputProps: { placeholder: "", dir: "rtl" },
                },
              }}
            />

            <TimePicker
              label="שעת סיום"
              value={
                formData.endTime
                  ? dayjs(`2000-01-01T${formData.endTime}`)
                  : null
              }
              onChange={(newValue: Dayjs | null) =>
                handleChange("endTime", newValue)
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.endTime,
                  helperText: errors.endTime,
                  inputProps: { placeholder: "", dir: "rtl" },
                },
              }}
            />
          </Box>
        </LocalizationProvider>

        <Autocomplete
          options={departments}
          value={formData.department || null}
          onChange={(e, newValue) => handleChange("department", newValue || "")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="מחלקה"
              error={!!errors.department}
              helperText={errors.department}
              inputProps={{
                ...params.inputProps,
                dir: "rtl",
              }}
            />
          )}
        />

        <Autocomplete
          options={volunteers}
          getOptionLabel={(option) => `${option.name} (${option.id})`}
          value={volunteers.find((v) => v.id === formData.volunteerId) || null}
          onChange={(e, newValue) =>
            handleChange("volunteerId", newValue?.id || "")
          }
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="מתנדב (לא חובה)"
              inputProps={{
                ...params.inputProps,
                dir: "rtl",
              }}
            />
          )}
        />

        <TextField
          label="תאור"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          multiline
          rows={2}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          הוסף משמרת
        </Button>
      </S.ShiftForm>
    </S.Container>
  );
};

export default ShiftForm;
