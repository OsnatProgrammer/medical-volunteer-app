import React, { useEffect, useState } from "react";
import * as S from "./ManagerPage.style";

import ShiftCalendar from "../components/ShiftCalendar/ShiftCalendar";
import { fetchVolunteers, saveVolunteers } from "../api/volunteers";
import { fetchShifts, saveShift } from "../api/shifts";
import { Shift, ShiftFormData } from "../types/shiftTypes";
import { Volunteer } from "../types/volunteerTypes";
import TabsPanel from "../components/TabsPanel/TabsPanel";

interface ManagerPageProps {
  onLogout: () => void;
}

const ManagerPage: React.FC<ManagerPageProps> = (props) => {
  const { onLogout } = props;
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [activeTab, setActiveTab] = useState<string>("shift");

  useEffect(() => {
    (async () => {
      const volunteersData = await fetchVolunteers();
      const shiftsData = await fetchShifts();
      setVolunteers(volunteersData);
      setShifts(shiftsData);
    })();
  }, []);

  const handleAddShift = async (newShiftData: ShiftFormData) => {
    try {
      const savedShift = await saveShift(newShiftData);
      setShifts((prev) => [...prev, savedShift]);
    } catch (error) {
      console.error("Failed to add shift:", error);
      alert("שגיאה בהוספת המשמרת.");
    }
  };

  const handleDeleteVolunteer = async (volunteerId: string) => {
    const confirm = window.confirm(
      "האם את/ה בטוח/ה שברצונך למחוק את המתנדב/ת?"
    );
    if (!confirm) return;

    const updated = volunteers.filter((v) => v.id !== volunteerId);
    setVolunteers(updated);
    await saveVolunteers(updated);
  };

  return (
    <S.Container>
      <S.Header>
        <S.TitleHeader>ניהול התנדבויות</S.TitleHeader>
        <S.LogoutButton onClick={onLogout}>התנתק</S.LogoutButton>
      </S.Header>

      <S.MainContent>
        <S.RightColumn>
          <h4>יומן משמרות</h4>
          <ShiftCalendar
            shifts={shifts}
            setShifts={setShifts}
            volunteers={volunteers}
          />
        </S.RightColumn>
        <TabsPanel
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          volunteers={volunteers}
          setVolunteers={setVolunteers}
          onAddShift={handleAddShift}
          onDeleteVolunteer={handleDeleteVolunteer}
        />
      </S.MainContent>
    </S.Container>
  );
};

export default ManagerPage;
