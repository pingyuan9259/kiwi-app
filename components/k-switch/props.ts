import { SwitchType } from '@kiwi/kiwi-app/types/attributes';

/**
 * 开关组件参数
 */
export default class KSwitchProps<Val = any> {
  /** 开关类型（默认为'switch'） */
  readonly type?: SwitchType = 'switch';
  /** 开关占位文字 */
  readonly placeholder?: string = '';
  /** 开关值设定 */
  readonly valueConfig?: [Val, Val] = undefined;
  /** 默认激活的值（如果是多选，则为数组） */
  readonly defaultValue?: Val = undefined;
  /** 是否禁用 */
  readonly disabled?: boolean = false;
  /** 选择事件 */
  readonly handleSwitch?: (val: Val) => void = undefined;
}
