import styled, { positionParser, widthParser } from '@kiwi/kiwi-app/styled';
import { placedPositionProps } from '@kiwi/kiwi-app/styled/props';
import { Layer } from '../types/attributes';

/**
 * 绝对定位盒模型组件
 */
const KAbsoluteBox = styled('div', placedPositionProps)`
  position: absolute;
  overflow-anchor: none;
  ${(props) =>
    positionParser(props.place, {
      top: widthParser(props.top),
      right: widthParser(props.right),
      bottom: widthParser(props.bottom),
      left: widthParser(props.left)
    })}
  z-index: ${(props) => props.themes.zIndex[props.zIndex as Layer] || ''};
`;

export default KAbsoluteBox;
