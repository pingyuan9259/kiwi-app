import styled, { colorParser, styledPropsParser, styleMapParser } from '@kiwi/kiwi-app/styled';

/**
 * 表格组件
 *
 */
export const TableBody = styled('table')`
  border-collapse: collapse;
  ${(props) => {
    const headStyleMap = styledPropsParser(props.themes.table.head);
    const cellStyleMap = styledPropsParser(props.themes.table.cell);
    return `th>div{${styleMapParser(headStyleMap)}}td>div{${styleMapParser(cellStyleMap)}}`;
  }};
`;

/**
 * 表格行组件
 *
 */
export const TableRow = styled('tr')`
  ${(props) => {
    const { oddRowColor, evenRowColor } = props.themes.table;
    const oddShadingStyleStr = oddRowColor
      ? `&:nth-child(odd){${styleMapParser({ background: colorParser(oddRowColor) })}}`
      : '';
    const evenShadingStyleStr = evenRowColor
      ? `&:nth-child(even){${styleMapParser({ background: colorParser(evenRowColor) })}}`
      : '';
    return oddShadingStyleStr + evenShadingStyleStr;
  }}
`;

/**
 * 表头单元格组件
 *
 */
export const TableHeadCell = styled('th')`
  ${(props) => {
    if (props.themes.table.mergeRowStyle) {
      const left = {
        marginRight: '0 !important',
        borderRight: 'none !important',
        borderTopRightRadius: '0 !important',
        borderBottomRightRadius: '0 !important',
        boxShadow: 'none !important'
      };
      const middle = {
        borderRadius: '0 !important',
        marginLeft: '0 !important',
        marginRight: '0 !important',
        borderLeft: 'none !important',
        borderRight: 'none !important',
        boxShadow: 'none !important'
      };
      const right = {
        marginLeft: '0 !important',
        borderLeft: 'none !important',
        borderTopLeftRadius: '0 !important',
        borderBottomLeftRadius: '0 !important',
        boxShadow: 'none !important'
      };
      return (
        `&:first-child>div{${styleMapParser(left)}}` +
        `&:not(:first-child, :last-child)>div{${styleMapParser(middle)}}` +
        `&:last-child>div{${styleMapParser(right)}}`
      );
    } else {
      return '';
    }
  }}
`;

/**
 * 表体单元格组件
 *
 */
export const TableDataCell = styled('td')`
  ${(props) => {
    if (props.themes.table.mergeRowStyle) {
      const left = {
        marginRight: '0 !important',
        borderRight: 'none !important',
        borderTopRightRadius: '0 !important',
        borderBottomRightRadius: '0 !important',
        boxShadow: 'none !important'
      };
      const middle = {
        borderRadius: '0 !important',
        marginLeft: '0 !important',
        marginRight: '0 !important',
        borderLeft: 'none !important',
        borderRight: 'none !important',
        boxShadow: 'none !important'
      };
      const right = {
        marginLeft: '0 !important',
        borderLeft: 'none !important',
        borderTopLeftRadius: '0 !important',
        borderBottomLeftRadius: '0 !important',
        boxShadow: 'none !important'
      };
      return (
        `&:first-child>div{${styleMapParser(left)}}` +
        `&:not(:first-child, :last-child)>div{${styleMapParser(middle)}}` +
        `&:last-child>div{${styleMapParser(right)}}`
      );
    } else {
      return '';
    }
  }}
`;
