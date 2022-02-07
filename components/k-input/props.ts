import { InputType } from '@kiwi/kiwi-app/types/attributes';

/**
 * 输入框组件参数
 */
export class KInputProps {
  /** 左侧控件 */
  leftWidget?: KInputWidgetType = undefined;
  /** 右侧控件 */
  rightWidget?: KInputWidgetType = undefined;
  /** 圆头输入框 */
  round?: boolean = undefined;
  /** 输入框是否禁用 */
  disabled?: boolean = undefined;
  /** 输入内容错误 */
  invalid?: boolean = undefined;
  /** 输入框的值 */
  value?: any = undefined;
  /** 输入框预展示内容 */
  placeholder?: string = undefined;
  /** 输入框类型 */
  type?: InputType = undefined;
  /** 自动补全 */
  autocomplete?: 'on' | 'off' = undefined;
  /** 是否为只读 */
  readonly?: boolean = false;
  /** 最大输入字数 */
  maxLength?: number = undefined;
  /** 最大输入值（用于数字类型） */
  maxValue?: number = undefined;
  /** 最小输入值（用于数字类型） */
  minValue?: number = undefined;
  /** 输入框输入事件 */
  handleInput?: (value: any) => void = undefined;
  /** 输入框聚焦事件 */
  handleFocus?: (event: FocusEvent) => void = undefined;
  /** 输入框离焦事件 */
  handleBlur?: (event: FocusEvent) => void = undefined;
  /** 输入框的值改变事件 */
  handleChange?: (event: Event) => void = undefined;
  /** 输入框的键盘事件 */
  handleKeydown?: (event: KeyboardEvent) => void = undefined;
  /** 输入框的键盘事件 */
  handleKeyup?: (event: KeyboardEvent) => void = undefined;
  /** 输入框的键盘事件 */
  handleKeypress?: (event: KeyboardEvent) => void = undefined;
}

/**
 * 输入框控件
 */
export type KInputWidgetType = 'clear' | 'step' | JSX.Element | ((h: any) => JSX.Element);
