import React, { useState, useMemo, useCallback } from "react";
import * as S from "./VolunteerPage.style";
import OpenShifts from "../../components/OpenShifts/OpenShifts";
import FutureShifts from "../../components/FutureShifts/FutureShifts";
import PastShifts from "../../components/PastShifts/PastShifts";
import { TabOption } from "../../types/volunteerTypes";

interface VolunteerPageProps {
  volunteerId: string;
  onLogout: () => void;
}

const VolunteerPage: React.FC<VolunteerPageProps> = (props) => {
  const { volunteerId, onLogout } = props;
  const [activeTab, setActiveTab] = useState<TabOption>("open");

  const tabs: { label: string; value: TabOption }[] = [
    { label: "משמרות פתוחות", value: "open" },
    { label: "משמרות עתידיות", value: "future" },
    { label: "היסטוריה", value: "history" },
  ];

  const handleTabChange = useCallback((tab: TabOption) => {
    setActiveTab(tab);
  }, []);

  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case "open":
        return <OpenShifts volunteerId={volunteerId} />;
      case "future":
        return <FutureShifts volunteerId={volunteerId} />;
      case "history":
        return <PastShifts volunteerId={volunteerId} />;
      default:
        return null;
    }
  }, [activeTab, volunteerId]);

  return (
    <S.Container>
      <S.Header>
        <S.Title>פירוט המשמרות שלך:</S.Title>
        <S.LogoutButton onClick={onLogout}>התנתקות</S.LogoutButton>
      </S.Header>

      <S.TabBar>
        {tabs.map((tab) => (
          <S.Tab
            key={tab.value}
            $active={activeTab === tab.value}
            onClick={() => handleTabChange(tab.value)}
          >
            {tab.label}
          </S.Tab>
        ))}
      </S.TabBar>

      <S.Content>{renderTabContent}</S.Content>
    </S.Container>
  );
};

export default VolunteerPage;
