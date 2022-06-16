import styled from "styled-components";

export const Button = styled.button.attrs(
  (props: { backgroudColor: string }) => props
)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30px;
  min-width: 100px;

  color: #fff;
  background-color: ${(props: any) =>
    props.backgroudColor ? props.backgroudColor : "#2873b6"};
  border-radius: 4px;
  border: none;

  padding: 0px 16px;

  svg {
    margin-right: 8px;
    font-size: 18px;
  }
`;
