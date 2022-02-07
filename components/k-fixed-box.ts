import styled, { placedPositionProps, positionParser, widthParser } from '@kiwi/kiwi-app/styled';
import { Layer } from '../types/attributes';

/**
 * 固定定位盒模型组件
 */
const KFixedBox = styled('div', placedPositionProps)`
  position: fixed;
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

export default KFixedBox;
