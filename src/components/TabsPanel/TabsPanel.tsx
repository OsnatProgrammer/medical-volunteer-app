import React from "react";
import * as S from "./TabsPanel.style";

import ShiftForm from "../ShiftForm/ShiftForm";
import VolunteerList from "../VolunteerList/VolunteerList";

import { Volunteer } from "../../types/volunteerTypes";
import { ShiftFormData } from "../../types/shiftTypes";
import VolunteerForm from "../VolunteerForm/VolunteerForm";

interface TabsPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  volunteers: Volunteer[];
  setVolunteers: React.Dispatch<React.SetStateAction<Volunteer[]>>;
  onAddShift: (newShiftData: ShiftFormData) => Promise<void>;
  onDeleteVolunteer: (volunteerId: string) => Promise<void>;
}

const TabsPanel: React.FC<TabsPanelProps> = (props) => {
  const {
    activeTab,
    setActiveTab,
    volunteers,
    setVolunteers,
    onAddShift,
    onDeleteVolunteer,
  } = props;

  return (
    <S.Container>
      <S.TabsHeader>
        <S.TabButton
          $active={activeTab === "shift"}
          onClick={() => setActiveTab("shift")}
        >
          הוספת משמרת
        </S.TabButton>
        <S.TabButton
          $active={activeTab === "volunteer"}
          onClick={() => setActiveTab("volunteer")}
        >
          הוספת מתנדב
        </S.TabButton>
        <S.TabButton
          $active={activeTab === "list"}
          onClick={() => setActiveTab("list")}
        >
          רשימת מתנדבים
        </S.TabButton>
      </S.TabsHeader>

      <S.TabContent>
        {activeTab === "shift" && (
          <S.ListWrapper as={S.TabInnerScroll}>
            <ShiftForm onAdd={onAddShift} volunteers={volunteers} />
          </S.ListWrapper>
        )}
        {activeTab === "volunteer" && (
          <S.ListWrapper as={S.TabInnerScroll}>
            <VolunteerForm
              onAdd={(data) => setVolunteers((prev) => [...prev, data])}
            />
          </S.ListWrapper>
        )}
        {activeTab === "list" && (
          <S.ListWrapper as={S.TabInnerScroll}>
            <VolunteerList
              volunteers={volunteers}
              onDelete={onDeleteVolunteer}
            />
          </S.ListWrapper>
        )}
      </S.TabContent>
    </S.Container>
  );
};

export default TabsPanel;
