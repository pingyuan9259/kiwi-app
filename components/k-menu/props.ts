import { ListItemConfig } from '@kiwi/kiwi-app/types/common';
import { MenuConfiguration } from '@kiwi/kiwi-app/types/components/k-menu';

/**
 * 菜单组件参数
 */
export default class KMenuProps<Val = any> {
  /** 菜单配置 */
  readonly configuration: MenuConfiguration<Val> = [];
  /** 默认菜单项的值 */
  readonly defaultValue?: Val = undefined;
  /** 是否收起 */
  readonly collapse?: boolean = false;
  /** 是否只保持一个子菜单的展开 */
  readonly uniqueSubMenu?: boolean = false;
  /** 菜单切换处理函数 */
  readonly handleSelect?: (item: ListItemConfig<Val>) => void = undefined;
}
