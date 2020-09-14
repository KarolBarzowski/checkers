import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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
`;

export default GlobalStyle;
