import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  body {
    color: #131313;
    background-color: #ffffff;
    font-family: 'Roboto', sans-serif;

    div#root {
      height: 100%;
      width: calc(100% - 32px);
    }

    a {
      text-decoration: none;
    }
  }
`;
