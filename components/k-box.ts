import styled, { positionProps, widthParser } from '@kiwi/kiwi-app/styled';
import { Layer } from '../types/attributes';

/**
 * 普通盒模型组件
 */
const KBox = styled('div', positionProps)`
  position: relative;
  overflow-anchor: none;
  top: ${(props) => widthParser(props.top) || ''};
  right: ${(props) => widthParser(props.right) || ''};
  bottom: ${(props) => widthParser(props.bottom) || ''};
  left: ${(props) => widthParser(props.left) || ''};
  z-index: ${(props) => props.themes.zIndex[props.zIndex as Layer] || ''};
`;

export default KBox;
