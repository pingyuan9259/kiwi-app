import styled, { styleMapParser } from '@kiwi/kiwi-app/styled';
import { HorizontalLayout, VerticalLayout } from '@kiwi/kiwi-app/types/attributes';

/**
 * 弹性盒组件参数
 */
class KFlexProps {
  /** 横向布局，默认'center' */
  horizontal?: HorizontalLayout = null;
  /** 纵向布局，默认'center' */
  vertical?: VerticalLayout = null;
  /** 排列，默认'row' */
  direction?: 'row' | 'column' | 'row-revert' | 'column-revert' = null;
  /** 子元素无缝衔接 */
  noSpace?: boolean = null;
  /** 锁定大小 */
  freezeSize?: boolean | string = null;
  /** 是否折行 */
  wrap?: boolean = null;
}

/**
 * 弹性盒模型组件
 */
const KFlexBox = styled('div', KFlexProps)`
  position: relative;
  display: flex;
  overflow-anchor: none;
  ${props => {
    const { direction, horizontal, vertical, wrap, noSpace, freezeSize } = props;
    let _freezeSize = '';
    if (typeof freezeSize === 'boolean') {
      _freezeSize = freezeSize ? '100%' : '';
    } else if (typeof freezeSize === 'string') {
      _freezeSize = freezeSize;
    };
    const styleStr = styleMapParser({
      flexDirection: direction || 'row',
      justifyContent: {
        center: 'center',
        left: 'flex-start',
        right: 'flex-end',
        'space-between': 'space-between',
        'space-around': 'space-around'
      }[horizontal || 'center'],
      alignItems: {
        center: 'center',
        top: 'flex-start',
        bottom: 'flex-end'
      }[vertical || 'center'],
      flexWrap: wrap ? 'wrap' : 'nowrap',
      flexBasis: _freezeSize,
      flexShrink: freezeSize ? '1' : '',
    });
    return styleStr + (noSpace ? '&>*{flex:1;text-align:center}' : '');
  }}
`;

export default KFlexBox;
