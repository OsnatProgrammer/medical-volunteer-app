import React, { useState } from "react";
import * as S from "./VolunteerForm.style";
import { TextField, MenuItem, Button, Autocomplete } from "@mui/material";
import { departments } from "../../constants/departments";
import { isValidIsraeliID } from "../../utils/validate";
import { Volunteer } from "../../types/volunteerTypes";

interface VolunteerFormProps {
  onAdd: (data: Volunteer) => void;
}

const initialFormData: Volunteer = {
  id: "",
  name: "",
  phone: "",
  department: [],
};

const VolunteerForm: React.FC<VolunteerFormProps> = (props) => {
  const { onAdd } = props;
  const [formData, setFormData] = useState<Volunteer>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: keyof Volunteer, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.id) newErrors.id = "יש להזין תעודת זהות";
    else if (!isValidIsraeliID(formData.id))
      newErrors.id = "תעודת זהות לא תקינה";

    if (!formData.name) newErrors.name = "יש להזין שם";

    if (!formData.phone) newErrors.phone = "יש להזין טלפון";
    else if (!/^\d{9,10}$/.test(formData.phone))
      newErrors.phone = "טלפון לא תקין";

    if (!formData.department) newErrors.department = "יש לבחור מחלקה";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onAdd(formData);
      setFormData(initialFormData);
    }
  };

  return (
    <S.Container>
      <S.Title>הוספת מתנדב</S.Title>
      <S.VolunteerForm onSubmit={handleSubmit}>
        <TextField
          label="תעודת זהות"
          value={formData.id}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            if (value.length <= 9) handleChange("id", value);
          }}
          error={!!errors.id}
          helperText={errors.id}
          fullWidth
        />
        <TextField
          label="שם"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
        />
        <TextField
          label="טלפון"
          value={formData.phone}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            handleChange("phone", value);
          }}
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
        />
        <Autocomplete
          multiple
          options={departments}
          getOptionLabel={(option) => option}
          value={formData.department}
          onChange={(event, newValue) => handleChange("department", newValue)}
          renderInput={(params) => (
            <TextField {...params} label="מחלקות מועדפות" fullWidth />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          הוסף מתנדב
        </Button>
      </S.VolunteerForm>
    </S.Container>
  );
};

export default VolunteerForm;
