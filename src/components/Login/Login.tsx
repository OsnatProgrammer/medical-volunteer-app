import React, { useState } from "react";
import * as S from "./Login.style";
import { isValidIsraeliID } from "../../utils/validate";

interface LoginProps {
  onAdminLogin: () => void;
  onVolunteerLogin: (volunteerId: string) => void;
}

const Login: React.FC<LoginProps> = (props) => {
  const { onAdminLogin, onVolunteerLogin } = props;
  const [volunteerId, setVolunteerId] = useState("");
  const [error, setError] = useState("");

  const handleVolunteerLogin = () => {
    const id = volunteerId.trim();
    if (id === "") {
      setError("אנא הכנס תעודת זהות");
      return;
    }
    if (!isValidIsraeliID(id)) {
      setError("תעודת זהות לא תקינה");
      return;
    }
    setError("");
    onVolunteerLogin(id);
  };

  return (
    <S.Container>
      <S.Title>בחר סוג כניסה</S.Title>
      <S.Button type="button" onClick={onAdminLogin}>
        כניסת מנהל (ללא הזנת ת"ז)
      </S.Button>

      <h3>כניסת מתנדב</h3>
      <S.Input
        placeholder="הכנס תעודת זהות"
        value={volunteerId}
        onChange={(e) => {
          const value = e.target.value.replace(/[^0-9]/g, "");
          setVolunteerId(value);
        }}
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={9}
      />
      <S.Button type="button" onClick={handleVolunteerLogin}>
        התחבר
      </S.Button>
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.Container>
  );
};

export default Login;
