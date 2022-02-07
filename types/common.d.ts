import IconType from './components/k-icons';

/**
 * 深层遍历
 */
export type MapDeep<Map> = {
  [K in keyof Map]: MapDeep<Map[K]>;
}

/**
 * 列表项
 *
 */
export interface ListItemConfig<Val = any> {
  /** 列表项名称 */
  name: string;
  /** 列表项的值 */
  value: Val;
  /** 列表项图标 */
  icon?: IconType;
  /** 是否禁用 */
  disabled?: boolean;
}
