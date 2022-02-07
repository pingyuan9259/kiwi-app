/**
 * 表格分页信息
 */
export interface TablePaginationInfo<Data> {
  /** 每页条目数 */
  size: number;
  /** 条目总数 */
  total: number;
  /** 页数 */
  pageCount: number;
  /** 当前页码（默认0） */
  curPage: number;
  /** 当前是否展示分页 */
  show?: boolean;
  /** 排序字段 */
  order?: TableOrder<Data>;
}

/**
 * {本地数据}表格分页配置
 */
export interface TableLocalPagination<Data> {
  /** 根据本地数据进行分页 */
  type: 'local';
  /** 每页条目数 */
  size: number;
  /** 当前页码（默认0） */
  curPage?: number;
  /** 排序字段 */
  order?: TableOrder<Data>;
  /** 分页描述 */
  description?: boolean | JSX.Element;
  /** 左侧控件 */
  leftWidget?: (params: TablePaginationWidgetParams) => JSX.Element;
  /** 右侧控件 */
  rightWidget?: (params: TablePaginationWidgetParams) => JSX.Element;
  /** 分页更新事件 */
  handleChange?: (pagination: TablePaginationInfo<Data>) => void;
}

/**
 * {远程数据}表格分页配置
 */
export interface TableRemotePagination<Data> {
  /** 根据远程数据进行分页 */
  type: 'remote';
  /** 每页条目数 */
  size: number;
  /** 条目总数 */
  total: number;
  /** 当前页码（默认0） */
  curPage?: number;
  /** 排序字段 */
  order?: TableOrder<Data>;
  /** 分页描述 */
  description?: boolean | JSX.Element;
  /** 左侧控件 */
  leftWidget?: (params: TablePaginationWidgetParams) => JSX.Element;
  /** 右侧控件 */
  rightWidget?: (params: TablePaginationWidgetParams) => JSX.Element;
  /** 分页更新事件 */
  handleChange?: (pagination: TablePaginationInfo<Data>) => void;
}

/**
 * 表格排序配置
 */
type TableOrder<Data> = { [Key in keyof Data]: 'asc' | 'desc' | '' };

/**
 * 表格分页控件参数
 */
export interface TablePaginationWidgetParams {
  curPage: number;
  total: number;
  size: number;
  jump: (page: number) => void;
}
