import React from "react";
import * as S from "./VolunteerList.style";
import { Volunteer } from "../../types/volunteerTypes";

interface VolunteerListProps {
  volunteers: Volunteer[];
  onDelete: (volunteerId: string) => void;
}

const VolunteerList: React.FC<VolunteerListProps> = (props) => {
  const { volunteers, onDelete } = props;
  return (
    <>
      <S.Title>רשימת מתנדבים</S.Title>
      <S.VolunteerList>
        {volunteers.map((volunteer) => (
          <S.VolunteerItem key={volunteer.id}>
            <S.VolunteerDetails>
              <strong>{volunteer.name}</strong> | ת.ז: {volunteer.id} | טלפון:{" "}
              {volunteer.phone} | מחלקות: {volunteer.department.join(", ")}
            </S.VolunteerDetails>
            <S.DeleteButton onClick={() => onDelete(volunteer.id)}>
              🗑️ מחק
            </S.DeleteButton>
          </S.VolunteerItem>
        ))}
      </S.VolunteerList>
    </>
  );
};

export default VolunteerList;
