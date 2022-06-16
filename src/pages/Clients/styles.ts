import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const Table = styled.table`
  margin-top: 16px;
  border-collapse: collapse;

  thead {
    border-top: 1px solid #5c5c5c;
    border-bottom: 1px solid #5c5c5c;

    th {
      text-align: start;
      padding: 8px;
      color: #6595c9;

      cursor: default;

      svg {
        margin-left: 8px;
        font-size: 12px;
      }
    }
  }

  tbody {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;

    td {
      padding: 8px;

      a {
        color: #2884bd;
        margin-right: 8px;
      }

      span {
        color: #f05487;
      }
    }
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export const ButtonNewClientContainer = styled.div`
  display: flex;
`;
