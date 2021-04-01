import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing:border-box;
  }
  html {
    --border-radius-card-frame: .75em;
    --color-text: black;
    --color-text-inverse: white;
    --color-background: white;
    --color-primary: #2F0079;
    --color-primary-rgb: 47,0,121;
    --color-secondary-rgb: 0,0,0;
    --color-status-success: #69CC8B;
    --color-status-error: #C00000;
    --height-card-frame: 10rem;
    --width-container: 90%;
    --width-card-frame: 17.775rem;
    --max-width-container: 40rem;
    --spacing-xxs: .25rem;
    --spacing-xs: .5rem;
    --spacing-s: 1rem;
    --spacing-m: 1.5rem;
    --spacing-l: 2rem;
  }
  body {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }
`

export default GlobalStyles
