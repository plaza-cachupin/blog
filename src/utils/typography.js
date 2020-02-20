import Typography from "typography"
import theme from "typography-theme-twin-peaks"

theme.baseFontSize = '18px' // was 19px.
theme.overrideThemeStyles = ({ rhythm }, options) => ({
  // dont underline anchors
  'a': {
    'text-decoration': 'none !important',
  }
})
const typography = new Typography(theme)


export default typography