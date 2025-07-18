import styled from "styled-components";

export const CalendarContainer = styled.div`
  height: 80vh;
  direction: rtl;
  display: flex;
  flex-direction: column;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0; 
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 320px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  direction: rtl;
  cursor: default;
`;

export const Description = styled.p`
  font-size: 0.85rem;
  color: #555;
  margin-top: -10px;
  margin-bottom: 15px;
`;

export const InfoRow = styled.p`
  margin: 5px 0;
`;

export const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
`;

const ButtonBase = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
`;

export const CancelButton = styled(ButtonBase)`
  background-color: #e57373;
  margin-left: 10px;

  &:hover {
    background-color: #d45c5c;
  }
`;

export const CloseButton = styled(ButtonBase)`
  background-color: #2196f3;

  &:hover {
    background-color: #1976d2;
  }
`;
