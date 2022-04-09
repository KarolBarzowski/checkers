import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
    }

    body {
        margin: 0;
        height: 100vh;
        width: 100%;
        font-size: 1.6rem;
    }

    canvas {
        outline: none;
    }

    span[role=img] {
        color: #ffffff;
    }
`;

export default GlobalStyle;
