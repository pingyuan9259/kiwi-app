import service from '@kiwi/kiwi-app/core/service';
import { TablePaginationInfo } from '@kiwi/kiwi-app/types/components/k-tables/pagination';

/**
 * 表格服务
 */
interface TableService<Data> {
  /** 表格分页信息（当表格为多个时，取当前页面DOM中第一个表格组件） */
  pagination: TablePaginationInfo<Data>;
  /** 表格分页信息映射 */
  paginationMap: { [Key in keyof Data]?: TablePaginationInfo<Data[Key]> };
}

/**
 * 注册表格服务
 */
const tableService = service({
  pagination: {},
  paginationMap: {}
});

/**
 * 获取表格服务
 */
export default function getTableService<Data = {}>(): TableService<Data> {
  return tableService as any;
}
