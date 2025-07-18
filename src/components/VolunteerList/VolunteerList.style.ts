import styled from "styled-components";

export const Title = styled.h2`
  padding: 0px 8px 4px;
  margin: 0;
  font-size: 24px;
  border-bottom: 1px solid #ddd;
`;

export const VolunteerList = styled.ul`
  padding: 0;
  margin: 0;
  overflow-y: auto;
  max-height:100%;
`;

export const VolunteerItem = styled.li`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  list-style: none;

  &:last-child {
    border-bottom: none;
  }

  strong {
    color: #007bff;
  }
`;
export const VolunteerDetails = styled.div`
`;

export const DeleteButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 4px 8px;
  margin-top: 4px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d9363e;
  }
`;