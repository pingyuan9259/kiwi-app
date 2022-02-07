import { FormThemeConfig } from '@kiwi/kiwi-app/types/themes';
import { FormPropParser } from './handler';
import { FormConfig } from './item';

/**
 * 表单配置
 */
export type FormConfiguration<D, C = any> = {
  [K in keyof (D & { [key: string]: any })]?:
    | FormConfig<D, C, D[K]>
    | FormPropParser<D, C, FormConfig<D, C, D[K]>>;
};

/**
 * 表单配置用于渲染
 */
export type FormConfigurationForRender<D, C = any> = {
  [K in keyof (D & { [key: string]: any })]?: FormConfig<D, C, D[K]>;
};

/**
 * 表单类型
 */
export type FormType = 'object' | 'collection' | 'array';

/**
 * 表单项通用处理器参数
 */
export interface FormHandlerParams<D = any, C = any> {
  /** 当前表单组件上下文 */
  context: C;
  /** 当前表单数据 */
  data: D;
  /** 当前表单数据的下标 */
  index: number;
  /** 配置项的key */
  key: string;
}

/**
 * 表单项信息
 */
export interface FormItemInfo<D = any> {
  /** 当前表单组件uid */
  formUid: number;
  /** 当前表单数据 */
  formData: D;
  /** 当前表单数据的下标 */
  formDataIndex: number;
  /** 配置项的key */
  itemKey: string;
}

/**
 * 当前表单组件实例信息
 */
export interface FormInstanceInfo<C = any> {
  /** 表单名称 */
  name: string;
  /** 组件uid */
  uid: number;
  /** 组件上下文 */
  context: C;
  /** 表单数据路径 */
  path: string;
  /** 根表单数据路径 */
  rootPath: string;
  /** 子表单类型 */
  formType: FormType;
  /** 表单数据数组 */
  dataList: object[];
  /** 表单校验数据数组 */
  validateDataList: object[];
  /** 表单数据数组最大个数 */
  maxLength?: number;
  /** 表单数据数组最小个数 */
  minLength?: number;
  /** 表单自定义主题 */
  themeConfig?: FormThemeConfig;
}
