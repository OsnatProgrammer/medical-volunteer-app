import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0;
  background: #fff;
  box-sizing: border-box;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 20px;
`;

export const TitleHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background-color: #b02a37;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1 1 0;
  gap: 30px;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  min-height: 0;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 16px;
    padding: 12px;
    min-height: 100%;
    height: 100%;
    flex: 1;
  }
`;

export const RightColumn = styled.div`
  flex: 2;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fafafa;
  min-height: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  @media (max-width: 900px) {
    height: 400px;
    flex: 1;
  }
`;
