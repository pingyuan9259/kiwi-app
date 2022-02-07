import styled, { styledPropsParser, styleMapParser } from '@kiwi/kiwi-app/styled';
import themeTemplateParser from '@kiwi/kiwi-app/styled/parsers/theme-template-parser';
import { ButtonSize, ButtonType, ColorType } from '@kiwi/kiwi-app/types/attributes';
import { cloneDeep, merge } from 'lodash';

/**
 * 按钮组件参数
 */
class KButtonProps {
  /** 按钮大小 */
  size?: ButtonSize = null;
  /** 按钮类型 */
  type?: ButtonType = null;
  /** 按钮颜色类型 */
  colorType?: ColorType = null;
  /** 按钮禁用 */
  disabled?: boolean = null;
  /** 圆头按钮 */
  round?: boolean = null;
}

/**
 * 按钮组件
 */
const KButton = styled('div', KButtonProps)`
  display: inline-block;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s linear;
  pointer-events: ${(props) => (props.disabled ? 'none' : '')};
  overflow: hidden;
  ${(props) => {
    const size = props.size || 'medium';
    const type = props.type || 'standard';
    const colorType = props.colorType || 'default';
    const deviceType = props.themes.deviceType;
    const buttonTheme = cloneDeep(props.themes.buttons[type]);

    const boxStyle = styledPropsParser(themeTemplateParser(buttonTheme.boxes, { colorType }));
    const boxHoverStyle = styledPropsParser(themeTemplateParser(buttonTheme.boxes.hover, { colorType }));
    const boxDisabledStyle = styledPropsParser(themeTemplateParser(buttonTheme.boxes.disabled, { colorType }));

    const sizeTheme = buttonTheme.sizes && buttonTheme.sizes[size];
    const sizeStyle = styledPropsParser(themeTemplateParser(sizeTheme, { colorType }));

    const colorTypeTheme = buttonTheme.colorTypes && buttonTheme.colorTypes[colorType];
    const colorTypeStyle = styledPropsParser(themeTemplateParser(colorTypeTheme, { colorType }));
    const colorTypeHoverStyle = styledPropsParser(themeTemplateParser(colorTypeTheme && colorTypeTheme.hover, { colorType }));
    const colorTypeDisabledStyle = styledPropsParser(themeTemplateParser(colorTypeTheme && colorTypeTheme.disabled, { colorType }));

    const disabledStyle = props.disabled ? merge(boxDisabledStyle, colorTypeDisabledStyle) : {};
    const buttonStyle = merge(sizeStyle, boxStyle, colorTypeStyle, disabledStyle);
    const hoverStyle = deviceType === 'pc' ? merge(boxHoverStyle, colorTypeHoverStyle) : {};

    if (props.round) {
      buttonStyle.borderRadius = '100px';
    }

    return `${styleMapParser(buttonStyle)}&:hover{${styleMapParser(hoverStyle)}}`;
  }}

  /* 禁用双击选择文本 */
  -moz-user-select:none; /*火狐*/
  -webkit-user-select:none; /*webkit浏览器*/
  -ms-user-select:none; /*IE10*/
  user-select:none;
`;

export default KButton;
