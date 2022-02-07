import { TableBoxInfo, TablePagination } from '@kiwi/kiwi-app/types/components/k-tables';
import { TableColumn } from '@kiwi/kiwi-app/types/components/k-tables/columns';
import { TablePaginationInfo } from '@kiwi/kiwi-app/types/components/k-tables/pagination';
import { chunk, map, max, zip } from 'lodash';

/**
 * 获取表格盒模型信息
 *
 * @param componentUid 组件标识号
 * @param tableLength 表格条目
 * @returns
 */
export function getTableBoxInfo(componentUid?: number, tableLength?: number): TableBoxInfo {
  const tableBoxInfo: TableBoxInfo = {
    tableWidth: '100%',
    fixedOffsetLeft: '0',
    fixedOffsetRight: '0',
    headHeight: '',
    rowHeights: []
  };
  if (componentUid !== undefined && tableLength) {
    const tableWidth = document.getElementById(`k_table_main_${componentUid}`).clientWidth;
    const fixedOffsetLeft = document.getElementById(
      `k_table_fixed_left_${componentUid}`
    ).clientWidth;
    const fixedOffsetRight = document.getElementById(
      `k_table_fixed_right_${componentUid}`
    ).clientWidth;
    const heads = document.getElementsByClassName(`k_table_head_${componentUid}`);
    const rowsSections = zip(
      ...chunk(document.getElementsByClassName(`k_table_row_${componentUid}`), tableLength)
    );
    tableBoxInfo.fixedOffsetLeft = `${fixedOffsetLeft}px !important`;
    tableBoxInfo.fixedOffsetRight = `${fixedOffsetRight}px !important`;
    tableBoxInfo.tableWidth = `${tableWidth}px`;
    tableBoxInfo.headHeight = `${max(map(heads, (i) => i.clientHeight))}px`;
    tableBoxInfo.rowHeights = map(rowsSections, (i) => `${max(map(i, (j) => j.clientHeight))}px`);
  }
  return tableBoxInfo;
}

/**
 * 获取表格列隐藏状态
 *
 * @param tableType
 * @param column 当前列配置
 * @returns
 */
export function getColumnHiddenStatus(
  tableType: 'main' | 'fixedLeft' | 'fixedRight',
  column: TableColumn<any>
): boolean {
  if (tableType === 'main') {
    return !!column.fixed;
  } else if (tableType === 'fixedLeft') {
    return column.fixed !== 'left';
  } else if (tableType === 'fixedRight') {
    return column.fixed !== 'right';
  }
}

/**
 * 获取容器高度
 *
 * @param target 目标元素
 */
export function getElementHeight(target: Element): string {
  const height = target.clientHeight;
  const computedStyle = getComputedStyle(target);
  const paddingTop = parseInt(computedStyle.paddingTop);
  const paddingBottom = parseInt(computedStyle.paddingBottom);
  return `${height - paddingTop - paddingBottom}px`;
}

/**
 * 获取当前分页信息
 *
 * @param pagination
 * @param dataLength
 * @returns
 */
export function getPaginationInfo<R>(
  pagination?: TablePagination<R>,
  dataLength?: number
): TablePaginationInfo<R> {
  const paginationInfo: TablePaginationInfo<R> = {
    curPage: 0,
    size: 10,
    pageCount: 0,
    total: 0
  };
  if (pagination && dataLength) {
    switch (pagination.type) {
      case 'local':
        paginationInfo.show = dataLength > pagination.size;
        paginationInfo.total = dataLength;
        break;

      case 'remote':
        paginationInfo.show = pagination.total > pagination.size;
        paginationInfo.total = pagination.total;
        break;
    }
    paginationInfo.size = pagination.size;
    paginationInfo.pageCount = Math.ceil(paginationInfo.total / paginationInfo.size);
  }
  return paginationInfo;
}

/**
 * 获取分页描述
 *
 * @param paginationInfo
 * @return
 */
export function getPaginationDesc(paginationInfo: TablePaginationInfo<any>): string {
  const startCount = paginationInfo.curPage * paginationInfo.size + 1;
  let endCount = (paginationInfo.curPage + 1) * paginationInfo.size;
  if (endCount > paginationInfo.total) {
    endCount = paginationInfo.total;
  }
  const range = startCount === endCount ? `${startCount}` : `${startCount}-${endCount}`;
  return `第${range}条 / 总共${paginationInfo.total}条`;
}

/**
 * 获取分页按钮组展示状态
 *
 * @param paginationInfo
 * @param index
 * @returns
 */
export function getPaginationButtonsShowStatus(
  paginationInfo: TablePaginationInfo<any>,
  index: number,
  maxButtonCount: number = 6,
  curPageFloat: number = 3
): boolean {
  // 左侧浮动
  const leftFloat = paginationInfo.curPage < curPageFloat && index < maxButtonCount;
  // 中间浮动
  const middleFloat =
    index > paginationInfo.curPage - curPageFloat && index < paginationInfo.curPage + curPageFloat;
  // 右侧浮动
  const rightFloat =
    paginationInfo.curPage >= paginationInfo.pageCount - curPageFloat &&
    index >= paginationInfo.pageCount - maxButtonCount;
  // 取并集
  return leftFloat || middleFloat || rightFloat;
}

/**
 * 表格属性解析器
 *
 * @param prop 需要解析的值
 * @param data 表格当前行数据
 * @param index 表格当前行下标
 * @param value 单元格的值
 * @return
 */
export function tablePropParser(
  context: any,
  prop: any,
  data?: any,
  index?: number,
  value?: any
): any {
  if (typeof prop === 'function') {
    return prop.call(context, { context, data, index, prop, value });
  } else {
    return prop;
  }
}
