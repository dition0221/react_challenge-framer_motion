import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
// Components
import Motion from "./Motion";

const GlobalStyle = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans 3', sans-serif;
    /*  */
    color: black;
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Motion />
    </>
  );
}
