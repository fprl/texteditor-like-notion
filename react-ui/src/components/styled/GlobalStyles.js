import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  html {
    --color-text: rgb(55, 53, 47);
    --color-text-inverse: white;
    --color-background: white;
    --color-gray-25: hsl(6, 0%, 95%);
    --color-gray: hsl(6, 0%, 80%);
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

    --text-sm: 0.90rem;
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

  html {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
	  font-size: 16px;
	  font-weight: 400;
	  color: var(--color-text);
  }
`

export default GlobalStyles
