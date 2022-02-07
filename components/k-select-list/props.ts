import { ListItemType } from '@kiwi/kiwi-app/types/attributes';
import { ListItemConfig } from '@kiwi/kiwi-app/types/common';

/**
 * 选择列表组件参数
 *
 */
export default class KSelectListProps<Val = any> {
  /** 列表数据 */
  readonly list: ListItemConfig<Val>[] = [];
  /** 列表项类型（默认为'select'） */
  readonly type?: ListItemType = 'select';
  /** 上下文（默认为当前勾选列表容器组件） */
  readonly context?: Vue = undefined;
  /** 默认激活的值（如果是多选，则为数组） */
  readonly defaultValue?: Val | Val[] = undefined;
  /** 是否禁用 */
  readonly disabled?: boolean = false;
  /** 是否多选 */
  readonly multiple?: boolean = false;
  /** 激活选项自动滚动到可见区域 */
  readonly activeScrollIntoView?: boolean = false;
  /** 选择事件 */
  readonly handleSelect?: (items: ListItemConfig<Val>[]) => void = undefined;
}
