import styled from "styled-components";

export const Container = styled.div`
  max-width: 380px;
  margin: 50px auto;
  padding: 25px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 12px 20px;
  margin: 12px 5px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
`;

export const ErrorText = styled.p`
  color: #d93025;
  margin-top: 10px;
  font-weight: 600;
`;
