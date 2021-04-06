import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing:border-box;
  }
  html {
    --color-text: black;
    --color-text-inverse: white;
    --color-background: white;
    --color-border: hsl(6, 0%, 92%);
    --color-shadow: hsl(6, 0%, 92%);
    --color-hover: hsl(6, 0%, 92%);
    --color-primary: #2F0079;
    --color-status-success: #69CC8B;
    --color-status-error: #C00000;
  
    --height-card-frame: 10rem;
    --width-container: 90%;
    --width-menu: 15rem;
    --max-width-menu: 40rem;

    --text-sm: 0.85rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 1.875rem;
    --text-4xl: 2.25rem;

    --spacing-xxs: .15rem;
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

  h1 {
    font-size: var(--text-3xl);
  }

  h2 {
    font-size: var(--text-2xl);
  }

  h3 {
    font-size: var(--text-xl);
  }

  p {
    font-size: var(--text-base);
  }
`

export default GlobalStyles
