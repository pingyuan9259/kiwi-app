/**
 * 列表组件参数
 */
export default class KListProps<D = {}> {
  /** 下拉列表数据 */
  readonly list?: D[] = [];
  /** 是否加载中 */
  readonly loading?: boolean = false;
  /** 加载更多配置 */
  readonly loadMoreConfig?: KListLoadMoreConfig<D> = undefined;
  /** 列表项渲染器 */
  readonly itemRender?: (item: D, index: number) => JSX.Element = undefined;
}

/**
 * 列表加载更多配置
 */
export interface KListLoadMoreConfig<D> {
  /** 自动加载更多或手动加载更多 */
  type: 'auto' | 'manual';
  /** 分页大小 */
  size: number;
  /** 条目总数 */
  total: number;
  /** 加载更多处理器 */
  handler: (curPage: number) => D[] | Promise<D[]>;
}
