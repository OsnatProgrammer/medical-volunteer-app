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
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #ddd;
  letter-spacing: 1px;
`;

export const VolunteerForm = styled.form`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 4px;
`;
