import { createGlobalStyle } from "styled-components";
import ProximaNovaRegularWoff from "../assets/fonts/ProximaNova-Regular.woff";
import ProximaNovaRegularWoff2 from "../assets/fonts/ProximaNova-Regular.woff2";
import { cBlack, cGreyE } from "./colors";

const GlobalStyle = createGlobalStyle`
 @font-face {
        font-family: 'Proxima Nova';
        src: local('Proxima Nova'), local('ProximaNova'),
        url(${ProximaNovaRegularWoff2}) format('woff2'),
        url(${ProximaNovaRegularWoff}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
 body {
   background: ${cGreyE};
   margin: 0;
   padding: 0;
   color: ${cBlack};
   font-family: 'Proxima Nova','Courier New', Courier, monospace, sans-serif;
 }
`;

export default GlobalStyle;
