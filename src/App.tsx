import React, { useState } from "react";
import Login from "./components/Login/Login";
import VolunteerPage from "./pages/VolunteerPage/VolunteerPage";
import ManagerPage from "./pages/ManagerPage";

type User =  { type: "manager" } | { type: "volunteer"; volunteerId: string } | { type: null };

const App: React.FC = () => {
  const [user, setUser] = useState<User>({ type: null });

  const handleLogin = (type: "manager"): void => {
    setUser({ type });
  };

  const handleVolunteerLogin = (volunteerId: string): void => {
    setUser({ type: "volunteer", volunteerId });
  };

  const handleLogout = (): void => {
    setUser({ type: null });
  };

  if (user.type === null) {
    return (
      <Login
        onAdminLogin={() => handleLogin("manager")}
        onVolunteerLogin={handleVolunteerLogin}
      />
    );
  }

  if (user.type === "manager") {
    return <ManagerPage onLogout={handleLogout} />;
  }

  if (user.type === "volunteer") {
    return (
      <VolunteerPage volunteerId={user.volunteerId} onLogout={handleLogout} />
    );
  }

  return null;
};

export default App;
