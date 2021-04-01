import { createGlobalStyle } from 'styled-components'

/* import RobotoRegularWoff from "./roboto-v20-latin-regular.woff";
import RobotoRegularWoff2 from "./roboto-v20-latin-regular.woff2";

import RobotoBoldWoff from "./roboto-v20-latin-700.woff";
import RobotoBoldWoff2 from "./roboto-v20-latin-700.woff2";

import RobotoBoldItalicWoff from "./roboto-v20-latin-700italic.woff";
import RobotoBoldItalicWoff2 from "./roboto-v20-latin-700italic.woff2"; */

const Fonts = createGlobalStyle`
/* segoe ui */
@font-face {
    font-family: 'Segoe UI';
    src: url('/surface/Assets/css/fonts/all/normal/segoeui.eot');
    src: url('/surface/Assets/css/fonts/all/normal/segoeui.eot?#iefix') format('embedded-opentype'),
         url('/surface/Assets/css/fonts/all/normal/segoeui.woff') format('woff'),
         url('/surface/Assets/css/fonts/all/normal/segoeui.svg#SegoeUI') format('svg');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Segoe UI Semibold';
    src: url('/surface/Assets/css/fonts/all/semibold/seguisb.eot');
    src: url('/surface/Assets/css/fonts/all/semibold/seguisb.eot?#iefix') format('embedded-opentype'),
         url('/surface/Assets/css/fonts/all/semibold/seguisb.woff') format('woff'),
         url('/surface/Assets/css/fonts/all/semibold/seguisb.svg#SegoeUISemibold') format('svg');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Segoe UI Bold';
    src: url('/surface/Assets/css/fonts/all/bold/segoeuib.eot');
    src: url('/surface/Assets/css/fonts/all/bold/segoeuib.eot?#iefix') format('eot'), /* Wrong format will tell IE9+ to ignore and use WOFF instead. MSHAR-2822 */
         url('/surface/Assets/css/fonts/all/bold/segoeuib.woff') format('woff'),
         url('/surface/Assets/css/fonts/all/bold/segoeuib.svg#SegoeUIBold') format('svg');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Segoe UI Light';
    src: url('/surface/Assets/css/fonts/all/light/segoeuil.eot');
    src: url('/surface/Assets/css/fonts/all/light/segoeuil.eot?#iefix') format('embedded-opentype'),
         url('/surface/Assets/css/fonts/all/light/segoeuil.woff') format('woff'),
         url('/surface/Assets/css/fonts/all/light/segoeuil.svg#SegoeUILight') format('svg');
    font-weight: normal;
    font-style: normal;
}
`

export default Fonts
