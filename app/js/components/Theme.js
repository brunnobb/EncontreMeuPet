
/*
Default theme form material ui

*/
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import * as _colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
// tabela de cores em http://www.material-ui.com/#/customization/colors

/*
datePicker: {
color: palette.primary1Color,
textColor: palette.alternateTextColor,
calendarTextColor: palette.textColor,
selectColor: palette.primary2Color,
selectTextColor: palette.alternateTextColor,
calendarYearBackgroundColor: _colors.white
}
*/

const cristalPrimaryColor = '#257eb2';
const cristalSecondaryColor = '#ffe266';
const cristalWarmGray = '#BEB8B2';
const cristalWarmDarkGray = '#AEA79F';
const cristalWarmLightGray = '#DEDBD8';
const grayDisabledColor = 'rgb(174, 167, 159)';

const theme = getMuiTheme({
    palette: {
        primary1Color: cristalPrimaryColor,
        primary2Color: fade(cristalSecondaryColor, 0.07),
        primary3Color: cristalWarmGray,
        accent1Color: cristalSecondaryColor,
        accent2Color: cristalWarmLightGray,
        accent3Color: cristalWarmDarkGray,
        textColor: _colors.darkBlack,
        alternateTextColor: _colors.white,
        canvasColor: _colors.white,
        borderColor: cristalWarmLightGray,
        disabledColor: fade(_colors.darkBlack, 0.3),
        pickerHeaderColor: cristalSecondaryColor,
        clockCircleColor: fade(_colors.darkBlack, 0.07),
        shadowColor: _colors.fullBlack
    },
    dialog: {
        // className: 'teste'
    },
    textField: {
        disabledTextColor: _colors.fullBlack
    }
});

export {
  theme,
  cristalPrimaryColor,
  cristalSecondaryColor,
  cristalWarmGray,
  cristalWarmDarkGray,
  cristalWarmLightGray,
  grayDisabledColor
};
