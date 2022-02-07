import { ListItemConfig } from '../common';

/**
 * 菜单配置
 *
 */
export type MenuConfiguration<Val = any> = (ListItemConfig<Val> & {
  subMenu?: ListItemConfig<Val>[];
})[];
