import { TableConfiguration, TablePagination } from '@kiwi/kiwi-app/types/components/k-tables';
import { TablePaginationInfo } from '@kiwi/kiwi-app/types/components/k-tables/pagination';

/**
 * 表格组件参数
 */
export default class KTablesProps<Data, Ctx> {
  /** 表格配置 */
  readonly configuration: TableConfiguration<Data, Ctx> = {};
  /** 表格数据 */
  readonly data: Data[] = [];
  /** 表格名称（在TableService中使用的key） */
  readonly name?: string = '';
  /** 上下文（默认为当前表格的容器组件） */
  readonly context?: Ctx = undefined;
  /** 隐藏表头 */
  readonly hideHeader?: boolean = false;
  /** 鼠标悬浮展示底纹 */
  readonly hoverShading?: boolean = false;
  /** 分页配置 */
  readonly pagination?: TablePagination<Data> = undefined;
  /** 列筛选 */
  readonly columnsScreen?: (keyof Data)[] = undefined;
}
