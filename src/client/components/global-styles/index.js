import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

export default createGlobalStyle`
  ${normalize()}
  html,
  body,
  div,
  article,
  section,
  main,
  footer,
  header,
  form,
  fieldset,
  legend,
  pre,
  code,
  a,
  h1,h2,h3,h4,h5,h6,
  p,
  ul,
  ol,
  li,
  dl,
  dt,
  dd,
  textarea,
  table, 
  td,
  th,
  tr,
  input[type="email"],
  input[type="number"],
  input[type="password"],
  input[type="tel"],
  input[type="text"],
  input[type="url"],
  .border-box {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors['near-white']};
    color: ${({ theme }) => theme.colors['near-black']};
    font: 0.75rem/1.6 ${({ theme }) => theme.typefaces.sansSerif};
`;
