import { TableColumn } from './columns';
import { TableLocalPagination, TableRemotePagination } from './pagination';

/**
 * 表格配置
 *
 */
export type TableConfiguration<Data, Ctx = any> = {
  [Key in keyof (Data & { [key: string]: any })]?: TableColumn<Data, Ctx, Data[Key]>;
};

/**
 * 表格分页配置
 */
export type TablePagination<Data> = TableLocalPagination<Data> | TableRemotePagination<Data>;

/**
 * 表格盒模型信息
 *
 */
export interface TableBoxInfo {
  /** 固定列左偏距 */
  fixedOffsetLeft: string;
  /** 固定列右偏距 */
  fixedOffsetRight: string;
  /** 表格宽度 */
  tableWidth: string;
  /** 表格头高度 */
  headHeight: string;
  /** 表格行高度 */
  rowHeights: string[];
}
