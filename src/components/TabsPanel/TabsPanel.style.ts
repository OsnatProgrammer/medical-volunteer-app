import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 900px) {
    height: 400px;
  }
`;
export const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  background: #f9f9f9;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 14px 0;
  background: ${({ $active }) => ($active ? "#fff" : "transparent")};
  border: none;
  border-bottom: ${({ $active }) => ($active ? "2px solid #1976d2" : "none")};
  color: ${({ $active }) => ($active ? "#1976d2" : "#333")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  font-size: 16px;
  cursor: pointer;
  outline: none;
`;

export const TabContent = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const TabInnerScroll = styled.div`
  flex: 1;
  min-height: 0;
  max-height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 900px) {
    max-height: 300px;
  }
`;

export const FormWrapper = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  height: 100%;
`;

export const ListWrapper = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  height: 100%;
  margin-top: 20px;
`;
