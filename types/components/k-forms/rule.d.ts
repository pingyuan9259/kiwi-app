import { FormRuleHandler } from './handler';

/**
 * 表单校验规则
 */
export interface FormRule<Data, Ctx, Val> {
  /** 非空校验 */
  required?: boolean;
  /** 最大字数校验 */
  maxLength?: number;
  /** 最小字数校验 */
  minLength?: number;
  /** 最大值校验 */
  maxValue?: number;
  /** 最小值校验 */
  minValue?: number;
  /** 正则列表 */
  regList?: FormRuleReg[];
  /** 校验函数 */
  handler?: FormRuleHandler<Data, Ctx, Val>;
}

/**
 * 表单校验正则
 */
interface FormRuleReg {
  /** 正则表达式 */
  reg: RegExp;
  /** 错误提示文案 */
  message: string;
}

/**
 * 表单校验类型
 */
export type FormValidateType =
  | 'required'
  | 'maxLength'
  | 'minLength'
  | 'maxValue'
  | 'minValue'
  | 'regList'
  | 'handler';

/**
 * 校验异常项
 */
export interface InvalidItem {
  /** 异常校验类型 */
  validateType: FormValidateType;
  /** 异常信息 */
  message?: string;
  /** 是否为初始化异常信息 */
  initial?: boolean;
  /** 校验规则 */
  rules: FormRule<any, any, any>;
}
