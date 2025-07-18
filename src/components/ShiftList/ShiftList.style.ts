import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
  flex-shrink: 0;
`;

export const NoShifts = styled.p`
  color: gray;
  font-style: italic;
`;

export const Loading = styled.div`
  color: #555;
  font-style: italic;
  margin-top: 12px;
`;

export const ShiftText = styled.p`
  margin: 4px 0;
`;

export const ShiftCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
  background-color: #f9f9f9;
  line-height: 1.6;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #e9f5ff;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const CancelButton = styled.button`
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d9363e;
  }
`;
