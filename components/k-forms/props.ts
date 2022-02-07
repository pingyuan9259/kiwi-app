import { FormConfiguration, FormItemInfo, FormType } from '@kiwi/kiwi-app/types/components/k-forms';
import { FormValueLike } from '@kiwi/kiwi-app/types/components/k-forms/item';
import { FormThemeConfig } from '@kiwi/kiwi-app/types/themes';

/**
 * 表单组件参数
 */
export class KFormsProps<D = any, C = any> {
  /** 表单配置 */
  readonly configuration: FormConfiguration<D, C> = {};
  /** 表单默认数据 */
  readonly defaultData?: D | D[] = undefined;
  /** 表单名称 */
  readonly name?: string = '';
  /** 表单路径（在formService中使用的key，如'lessonVo'或'lessonVo.unitVo'） */
  readonly path?: string = '';
  /** 根表单路径 */
  readonly rootPath?: string = '';
  /** 上下文（默认为当前表单的容器组件） */
  readonly context?: C = undefined;
  /** 是否为子表单 */
  readonly subForm?: boolean = false;
  /** 子表单类型（配置此项则代表该表单为子表单） */
  readonly formType?: FormType = 'object';
  /** 最大个数（用于集合/数组表单） */
  readonly maxLength?: number = undefined;
  /** 最小个数（用于集合/数组表单） */
  readonly minLength?: number = undefined;
  /** 默认个数（用于集合/数组表单） */
  readonly defaultLength?: number = undefined;
  /** 展示表单数据调试面板 */
  readonly debugPanel?: boolean = false;
  /** 表单更新事件 */
  readonly onChange?: () => void = undefined;
  /** 表单自定义主题 */
  readonly themeConfig?: FormThemeConfig = undefined;
}

/**
 * 表单项容器组件参数
 */
export class FormItemContainerProps {
  /** 表单项配置 */
  readonly formItemConfig: FormValueLike = undefined;
  /** 表单项信息 */
  readonly formItemInfo: FormItemInfo = undefined;
  /** 表单默认数据，用于表单项监听表单默认数据的变化，从而触发更新 */
  readonly defaultData?: any = undefined;
}

/**
 * 表单子组件参数
 */
export class FormItemProps<T = any> {
  /** 默认值 */
  readonly defaultValue: any = undefined;
  /** 是否校验失败 */
  readonly isInvalid: boolean = false;
  /** 表单项配置 */
  readonly formItemConfig: { [K in keyof T]: any } = undefined;
  /** 表单项信息 */
  readonly formItemInfo: FormItemInfo = undefined;
  /** 表单项值更新事件 */
  readonly change?: (value: any) => void = undefined;
}
