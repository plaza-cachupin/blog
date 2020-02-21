import Typography from "typography"
import theme from "typography-theme-twin-peaks"

// was 19px.
theme.baseFontSize = '18px' 
// dont underline anchors
theme.overrideThemeStyles = ({ rhythm }, options) => ({
  'a': {
    'background-image': 'none',
  }
})

const typography = new Typography(theme)

export default typography