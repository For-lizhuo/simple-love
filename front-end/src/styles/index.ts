import {createGlobalStyle} from 'styled-components';
export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    font-family: Consolas, "微软雅黑", "黑体";
  }
`
export const navLinkStyle:React.CSSProperties = {
  color:'#FFFAFA',
  textDecoration: 'none',
}