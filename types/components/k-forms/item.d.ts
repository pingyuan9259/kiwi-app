import { KInputWidgetType } from '@kiwi/kiwi-app/components/k-input/props';
import { KTextareaWidgetType } from '@kiwi/kiwi-app/components/k-textarea/props';
import { HyperScriptFunction } from '@kiwi/kiwi-app/types';
import { StyledProps } from '@kiwi/kiwi-app/types/styled-props';
import { ButtonSize } from '@kiwi/kiwi-styled-components/types/attributes';
import { FormConfiguration } from '.';
import { ButtonType, ColorType, InputType, ListItemType, SwitchType } from '../../attributes';
import { ListItemConfig } from '../../common';
import IconType from '../k-icons';
import { FormPropParser, FromDataHandler } from './handler';
import { FormRule } from './rule';

/**
 * {基础}表单项配置
 */
interface FormBase<D = any, C = any> {
  /** 表单元素id */
  id?: string;
  /** 表单项的名称 */
  name?: string | FormPropParser<D, C, string>;
  /** 表单项的值名称图标 */
  icon?: IconType | FormPropParser<D, C, IconType>;
  /** 是否隐藏 */
  hidden?: boolean | FormPropParser<D, C, boolean>;
  /** 是否禁用 */
  disabled?: boolean | FormPropParser<D, C, boolean>;
  /** 监听：激活表单项更新的某字段引用路径 */
  listen?: string | string[];
  /** 表单项的样式 */
  styledProps?: StyledProps | FormPropParser<D, C, StyledProps>;
}

/**
 * {值属性}表单项配置
 */
interface FormValue<D = any, C = any, V = any> extends FormBase<D, C> {
  /** 表单项解析后的值 */
  value?: V | FormPropParser<D, C, V>;
  /** 表单项的值校验规则 */
  rules?: FormRule<D, C, V> | FormPropParser<D, C, FormRule<D, C, V>>;
}

/**
 * {文本}表单项配置
 */
export interface FormStringConfig<D = any, C = any, V = any> extends FormValue<D, C, V> {
  /** 表单项的类型 */
  type: 'string';
}

/**
 * {输入框}表单项配置
 */
export interface FormInputConfig<D = any, C = any, V = any> extends FormValue<D, C, V> {
  /** 表单项的类型 */
  type: 'input';
  /** 输入框类型（默认'text'） */
  inputType?: InputType | FormPropParser<D, C, InputType>;
  /** 高度（默认'auto'） */
  height?: string | FormPropParser<D, C, string>;
  /** 提示文字 */
  placeholder?: string | FormPropParser<D, C, string>;
  /** 输入中实时校验 */
  validateOnInput?: boolean;
  /** 最大输入字数 */
  maxLength?: number;
  /** 圆头输入框 */
  round?: boolean;
  /** 左侧控件 */
  leftWidget?: FormPropParser<D, C, KInputWidgetType>;
  /** 右侧控件 */
  rightWidget?: FormPropParser<D, C, KInputWidgetType>;
}

/**
 * {文本区域}表单项配置
 */
export interface FormTextAreaConfig<D = any, C = any, V = any> extends FormValue<D, C, V> {
  /** 表单项的类型 */
  type: 'textArea';
  /** 高度（默认'auto'） */
  height?: string | FormPropParser<D, C, string>;
  /** 提示文字 */
  placeholder?: string | FormPropParser<D, C, string>;
  /** 输入中实时校验 */
  validateOnInput?: boolean;
  /** 最大输入字数 */
  maxLength?: number;
  /** 调整输入框大小 */
  resize?: boolean;
  /** 左侧控件 */
  leftWidget?: FormPropParser<D, C, KTextareaWidgetType>;
  /** 右侧控件 */
  rightWidget?: FormPropParser<D, C, KTextareaWidgetType>;
}

/**
 * {选择}表单项配置
 */
export interface FormSelectConfig<D = any, C = any, V = any> extends FormValue<D, C, V> {
  /** 表单项的类型 */
  type: 'select';
  /** 列表类型（默认为'select'） */
  listType?: ListItemType;
  /** 列表数据 */
  list: ListItemConfig<V>[] | FormPropParser<D, C, ListItemConfig<V>[]>;
  /** 是否支持多选 */
  multiple?: boolean;
}

/**
 * {开关}表单项配置
 */
export interface FormSwitchConfig<D = any, C = any, V = any> extends FormValue<D, C, V> {
  /** 表单项的类型 */
  type: 'switch';
  /** 开关类型（默认为'switch'） */
  switchType?: SwitchType;
  /** 提示文字 */
  placeholder?: string | FormPropParser<D, C, string>;
  /** 开关值配置 */
  valueConfig?: [V, V] | FormPropParser<D, C, [V, V]>;
}

/**
 * {下拉列表}表单项配置
 */
export interface FormDropdownListConfig<D = any, C = any, V = any> extends FormValue<D, C, V> {
  /** 表单项的类型 */
  type: 'dropdownList';
  /** 下拉列表数据 */
  list: ListItemConfig<V>[] | FormPropParser<D, C, ListItemConfig<V>[]>;
  /** 是否启用搜索功能 */
  search?: boolean | FormPropParser<D, C, boolean>;
  /** 下拉内容宽度 */
  contentWidth?: string | FormPropParser<D, C, string>;
  /** 是否允许输入自定义的值 */
  enableInput?: boolean | FormPropParser<D, C, boolean>;
  /** 提示文字 */
  placeholder?: string | FormPropParser<D, C, string>;
}

/**
 * {下拉内容}表单项配置
 */
export interface FormDropdownContentConfig<D = any, C = any, V = any> extends FormValue<D, C, V> {
  /** 表单项的类型 */
  type: 'dropdownContent';
  /** 下拉内容 */
  content: FormDropdownContentFunction | FormPropParser<D, C, FormDropdownContentFunction>;
  /** 提示文字 */
  placeholder?: string | FormPropParser<D, C, string>;
}

type FormDropdownContentFunction = (
  h: HyperScriptFunction,
  select: HandlerSelectFunction
) => JSX.Element;
type HandlerSelectFunction = (value: any) => void;

/**
 * {上传}表单项配置
 */
export interface FormUploadConfig<D = any, C = any, V = any> extends FormValue<D, C, V> {
  /** 表单项的类型 */
  type: 'upload';
  /** 文件类型 */
  fileType: 'image' | 'audio' | 'video';
  /** 上传回调函数 */
  handleUpload(files: File[]): Promise<string[]>;
  /** 是否正在上传中 */
  loading?: boolean;
  /** 是否支持多文件上传 */
  multiple?: boolean;
}

/**
 * {组件}表单项配置
 */
export interface FormComponentConfig<D = any, C = any, V = any> extends FormValue<D, C, V> {
  /** 表单项的类型 */
  type: 'component';
  /** 表单项的组件 */
  component: FormPropParser<D, C, FormComponentFunction>;
}

type FormComponentFunction = (
  h: HyperScriptFunction,
  updateValue: UpdateValueFunction
) => JSX.Element;
type UpdateValueFunction = (value: any) => void;

/**
 * {对象子表单}表单项配置
 */
export interface ObjectSubFormConfig<D = any, C = any> extends FormValue<D, C> {
  /** 表单项的类型 */
  type: 'subForm';
  /** 子表单类型 */
  formType: 'object';
  /** 表单配置 */
  configuration: FormConfiguration<D, C>;
}

/**
 * {集合子表单}表单项配置
 */
export interface CollectionSubFormConfig<D = any, C = any> extends FormValue<D, C> {
  /** 表单项的类型 */
  type: 'subForm';
  /** 子表单类型 */
  formType: 'collection';
  /** 表单配置 */
  configuration: FormConfiguration<D[any], C>;
  /** 集合最大个数 */
  maxLength?: number | FormPropParser<D, C, number>;
  /** 集合最小个数 */
  minLength?: number | FormPropParser<D, C, number>;
  /** 默认集合个数 */
  defaultLength?: number | FormPropParser<D, C, number>;
}

/**
 * {数组表单}表单项配置
 */
export interface ArraySubFormConfig<D = any, C = any, V = any> extends FormValue<D, C, V> {
  /** 表单项的类型 */
  type: 'subForm';
  /** 子表单类型 */
  formType: 'array';
  /** 表单配置 */
  config: FormConfig<D, C, V> | FormPropParser<D, C, FormConfig<D, C, V>>;
  /** 数组最大个数 */
  maxLength?: number | FormPropParser<D, C, number>;
  /** 数组最小个数 */
  minLength?: number | FormPropParser<D, C, number>;
  /** 默认数组个数 */
  defaultLength?: number | FormPropParser<D, C, number>;
}

/**
 * {按钮}表单项配置
 */
export interface FormButtonsConfig<D = any, C = any> extends FormBase<D, C> {
  /** 表单项的类型 */
  type: 'buttons';
  /** 表单项名称 */
  name?: string;
  /** 表单按钮组配置 */
  configs: ButtonConfig<D, C>[];
}

/**
 * 表单按钮配置
 */
interface ButtonConfig<D = any, C = any> extends FormBase<D, C> {
  /** 按钮事件处理函数 */
  handler: FromDataHandler<D, C>;
  /** 按钮类型 */
  type?: ButtonType;
  /** 按钮颜色类型（默认'highlight'） */
  colorType?: ColorType | FormPropParser<D, C, ColorType>;
  /** 按钮大小 */
  size?: ButtonSize | FormPropParser<D, C, ButtonSize>;
  /** 按钮是否配合校验 */
  validate?: boolean;
  /** 按钮校验数据路径 */
  validatePath?: string;
}

/**
 * 表单项配置
 */
export type FormConfig<D = any, C = any, V = any> =
  | FormStringConfig<D, C, V>
  | FormInputConfig<D, C, V>
  | FormTextAreaConfig<D, C, V>
  | FormSelectConfig<D, C, V>
  | FormSwitchConfig<D, C, V>
  | FormDropdownListConfig<D, C, V>
  | FormDropdownContentConfig<D, C, V>
  | FormUploadConfig<D, C, V>
  | FormComponentConfig<D, C, V>
  | ObjectSubFormConfig<V, C>
  | CollectionSubFormConfig<V, C>
  | ArraySubFormConfig<D, C, V>
  | FormButtonsConfig<D, C>;

/**
 * {基础}表单项静态配置
 */
export type FormBaseLike = { [K in keyof FormBase]?: any } & { type: string };

/**
 * {值属性}表静态配置
 */
export type FormValueLike = { [K in keyof FormValue]: any } & { type: string };
