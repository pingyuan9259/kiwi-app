import styled, { colorParser, styledPropsParser, styleMapParser } from '@kiwi/kiwi-app/styled';
import { StyledProps } from '@kiwi/kiwi-app/types/styled-props';
import { assign, cloneDeep, mapValues } from 'lodash';

const inputContainerProps = {
  /** 圆头输入框 */
  round: false,
  /** 输入框是否禁用 */
  disabled: false,
  /** 输入内容错误 */
  invalid: false
};

const inputWidgetProps = {
  /** 输入框控件盒模型主题配置 */
  widgetTheme: undefined as StyledProps,
  /** 方向 */
  position: undefined as 'left' | 'right'
};

/**
 * 输入框容器
 */
export const KInputContainer = styled('div', inputContainerProps)`
  position: relative;
  pointer-events: ${(props) => (props.disabled ? 'none' : '')};
  ${(props) => {
    const inputTheme = cloneDeep(props.themes.input);
    const baseStyle = styledPropsParser(inputTheme);
    const invalidStyle = props.invalid
      ? mapValues(styledPropsParser(inputTheme.invalid), (i) => `${i} !important`)
      : {};
    const focusStyle = styledPropsParser(inputTheme.focus);
    const disabledStyle = props.disabled ? styledPropsParser(inputTheme.disabled) : {};
    const inputStyle = assign({}, baseStyle, invalidStyle, disabledStyle);
    if (props.round) {
      inputStyle.borderRadius = '100px';
    }
    return `${styleMapParser(inputStyle)};&:focus{${styleMapParser(focusStyle)}}`;
  }}
`;

/**
 * 输入框样式组件
 */
export const KInputElement = styled('input')`
  width: 100%;
  background-color: transparent;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  color: inherit;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  font-family: inherit;

  -moz-appearance: textfield;

  &::-webkit-input-placeholder {
    color: ${(props) => colorParser(props.themes.colors.gray)};
  }
  &:-moz-placeholder {
    color: ${(props) => colorParser(props.themes.colors.gray)};
  }
  &::-moz-placeholder {
    color: ${(props) => colorParser(props.themes.colors.gray)};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }
`;

/**
 * 输入框控件样式组件
 */
export const KInputWidget = styled('div', inputWidgetProps)`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => {
    const widgetTheme = cloneDeep(props.widgetTheme);
    if (widgetTheme.border) {
      widgetTheme.border = false;
      widgetTheme.borderBottom = true;
      switch (props.position) {
        case 'left':
          widgetTheme.borderRight = true;
          break;

        case 'right':
          widgetTheme.borderLeft = true;
          break;
      }
    }
    const style = styledPropsParser(widgetTheme);
    return styleMapParser(style);
  }}

  &:last-child {
    border-bottom: none;
  }

  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
`;
