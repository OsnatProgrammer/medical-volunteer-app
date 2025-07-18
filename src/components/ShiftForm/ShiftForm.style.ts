import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 12px;
`;

export const Title = styled.h2`
  padding: 0px 8px 4px;
  margin: 0;
  font-size: 24px;
  border-bottom: 1px solid #ddd;
`;

export const ShiftForm = styled.form`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 4px;
`;
