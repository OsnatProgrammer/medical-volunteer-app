import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #333;
`;

export const LogoutButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #ff4c4c;
  }
`;

export const TabBar = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding: 12px 0;
  border-bottom: 1px solid #ccc;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Tab = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? "#1976d2" : "transparent")};
  color: ${({ $active }) => ($active ? "white" : "#1976d2")};
  border: none;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #1976d2;
    color: white;
  }
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-top: 16px;
  min-height: 0;

  @media (max-width: 600px) {
    margin-top: 12px;
  }
`;
