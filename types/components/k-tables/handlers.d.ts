/**
 * {表格属性}解析器
 *
 * @param params
 */
export type TablePropParser<Data, Ctx, Val, Prop> = (params: {
  /** 上下文 */
  context: Ctx;
  /** 表格当前行数据 */
  data: Data;
  /** 需要解析的属性 */
  prop: Prop;
  /** 表格当前单元格的值 */
  value: Val;
  /** 表格当前行下标 */
  index: number;
}) => Prop;

/**
 * {表格单元格}处理器
 *
 * @param params
 */
export type TableCellHandler<Data, Ctx, Val> = (params: {
  /** 上下文 */
  context: Ctx;
  /** 表格当前行数据 */
  data: Data;
  /** 表格当前行下标 */
  index: number;
  /** 表格当前单元格的值 */
  value?: Val;
  /** 手动触发当前表格渲染 */
  forceUpdate: () => void;
}) => void;
