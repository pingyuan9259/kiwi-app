import styled, { colorParser, styledPropsParser, styleMapParser } from '@kiwi/kiwi-app/styled';
import { StyledProps } from '@kiwi/kiwi-app/types/styled-props';
import { assign, cloneDeep, mapValues } from 'lodash';

const textareaContainerProps = {
  /** 文本区域是否禁用 */
  disabled: false,
  /** 输入内容错误 */
  invalid: false,
  /** 是否可以调整大小 */
  resize: false
};

const textareaWidgetProps = {
  /** 文本区域控件盒模型主题配置 */
  widgetTheme: undefined as StyledProps,
  /** 方向 */
  position: undefined as 'left' | 'right'
};

/**
 * 文本区域容器
 */
export const KTextareaContainer = styled('div', textareaContainerProps)`
  position: relative;
  overflow: auto;
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
    if (props.resize) {
      inputStyle.resize = 'both';
      inputStyle.overflow = 'auto';
      inputStyle.transition = '';
    }
    return `${styleMapParser(inputStyle)};&:focus{${styleMapParser(focusStyle)}}`;
  }}
`;

/**
 * 文本区域样式组件
 */
export const KTextareaElement = styled('textarea')`
  width: 100%;
  height: 100%;
  background-color: transparent;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  color: inherit;
  font-size: inherit;
  line-height: 1.5em;
  font-weight: inherit;
  font-family: inherit;
  resize: none;

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

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #ff0000;
  }
`;

/**
 * 文本区域控件样式组件
 */
export const KTextareaWidget = styled('div', textareaWidgetProps)`
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
