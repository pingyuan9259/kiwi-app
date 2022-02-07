import { HyperScriptFunction } from '@kiwi/kiwi-app/types';
import { PositionAttr } from '@kiwi/kiwi-app/types/attributes';
import { ListItemConfig } from '@kiwi/kiwi-app/types/common';

/**
 * 下拉框组件参数
 */
export default class KDropdownProps<Val = any> {
  /** 下拉列表数据 */
  readonly list?: ListItemConfig<Val>[] = undefined;
  /** 下拉内容 */
  readonly content?: (h: HyperScriptFunction, select: (value: Val) => void) => JSX.Element =
    undefined;
  /** 上下文（默认为当前勾选列表容器组件） */
  readonly context?: Vue = undefined;
  /** 下拉框宽度 */
  readonly contentWidth?: string = '190px';
  /** 弹出方向 */
  readonly direction?: PositionAttr = undefined;
  /** 默认值 */
  readonly defaultValue?: Val = undefined;
  /** 预展示内容 */
  readonly placeholder?: string = '请选择';
  /** 是否允许输入自定义的值 */
  readonly enableInput?: boolean = false;
  /** 是否禁用 */
  readonly disabled?: boolean = false;
  /** 是否启用搜索功能 */
  readonly search?: boolean = false;
  /** 选择事件 */
  readonly handleSelect?: (item: ListItemConfig) => void = undefined;
}
