/**
 * 文本区域组件参数
 */
export class KTextareaProps {
  /** 左侧控件 */
  leftWidget?: KTextareaWidgetType = undefined;
  /** 右侧控件 */
  rightWidget?: KTextareaWidgetType = undefined;
  /** 输入框是否禁用 */
  disabled?: boolean = undefined;
  /** 输入内容错误 */
  invalid?: boolean = undefined;
  /** 调整输入框大小 */
  resize?: boolean = undefined;
  /** 输入框的值 */
  value?: any = undefined;
  /** 输入框预展示内容 */
  placeholder?: string = undefined;
  /** 最大输入字数 */
  maxLength?: number = undefined;
  /** 输入框输入事件 */
  handleInput?: (value: any) => void = undefined;
  /** 输入框聚焦事件 */
  handleFocus?: (event: FocusEvent) => void = undefined;
  /** 输入框离焦事件 */
  handleBlur?: (event: FocusEvent) => void = undefined;
  /** 输入框的值改变事件 */
  handleChange?: (event: Event) => void = undefined;
}

/**
 * 文本区域控件
 */
export type KTextareaWidgetType = 'clear' | 'count' | JSX.Element | ((h: any) => JSX.Element);
