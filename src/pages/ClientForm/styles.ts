import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  h3 {
    color: #2873b6;
  }

  h4 {
    margin-bottom: 8px;
  }
`;

export const Fields = styled.div`
  display: flex;
`;

export const FieldContainer = styled.div.attrs(
  (props: { flex: number }) => props
)`
  display: flex;
  flex-direction: column;
  margin: 0px 8px;
  flex: ${(props: any) => `0 1 calc(${props.flex}% - 10px)`};
`;

export const FooterButtons = styled.div`
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  background-color: #eaf1f8;
  margin-top: 16px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 25%;
  align-items: center;
  justify-content: space-evenly;
`;

export const BottomFields = styled.div`
  margin-top: 104px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: end;
  margin-bottom: 8px;
`;

export const InputMaskContainer = styled.div`
  input {
    min-width: -webkit-fill-available;
    height: 16px;
    padding: 8px 16px;
    border: 1px solid #e7e7e7;
    border-radius: 16px;
  }
`;
