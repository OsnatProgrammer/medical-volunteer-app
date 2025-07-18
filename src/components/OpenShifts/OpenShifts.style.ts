import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ShiftCard = styled.div`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: 0.2s ease;
`;

export const ShiftDate = styled.div`
  font-weight: 600;
  margin-bottom: 6px;
`;

export const ShiftDetails = styled.div`
  font-size: 14px;
  color: #555;
`;

export const AssignButton = styled.button`
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #45a049;
  }
`;