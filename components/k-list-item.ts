import styled, { styledPropsParser, styleMapParser } from '@kiwi/kiwi-app/styled';
import { ListItemType } from '@kiwi/kiwi-app/types/attributes';
import { cloneDeep, merge } from 'lodash';

/**
 * 列表项组件参数
 */
class ListItemProps {
  /** 列表项类型 */
  type?: ListItemType = null;
  /** 列表项是否激活 */
  active?: boolean = null;
  /** 是否禁用 */
  disabled?: boolean = null;
  /** 选择项图标（默认IconCheckSquire） */
  icon?: any;
  /** 选择项激活图标（默认IconCheckedSquireFill） */
  activeIcon?: any;
}

/**
 * 列表项组件
 */
const KListItem = styled('div', ListItemProps)`
  position: relative;
  display: ${(props) => (props.type === 'tab' ? 'inline-block' : 'block')};
  cursor: pointer;
  transition: all 0.15s linear;
  opacity: ${(props) => (props.disabled ? '0.6' : '')};
  pointer-events: ${(props) => (props.disabled ? 'none' : '')};
  ${(props) => {
    const listItemTheme = cloneDeep(props.themes.listItems[props.type || 'select']);
    const deviceType = props.themes.deviceType;

    const baseStyle = styledPropsParser(listItemTheme);
    const activeStyle = styledPropsParser(listItemTheme.active);
    const listItemStyle = merge(baseStyle, props.active ? activeStyle : {});
    const hoverStyle = deviceType === 'pc' ? styledPropsParser(listItemTheme.hover) : {};

    return `${styleMapParser(listItemStyle)}&:hover{${styleMapParser(hoverStyle)}}`;
  }}
`;

export default KListItem;
