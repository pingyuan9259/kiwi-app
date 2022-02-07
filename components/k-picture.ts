import styled from '@kiwi/kiwi-app/styled';

/**
 * 图片组件参数
 */
class KPictureProps {
  /** 图标连接 */
  file: any = null;
  /** 图标大小，默认50px */
  size?: string = null;
  /** 图片展示模式，默认cover */
  display?: 'cover' | 'contain' | 'unset' = null;
}

/**
 * 图片组件
 */
const KPicture = styled('div', KPictureProps)`
  display: block;
  width: ${(props) => props.size || '50px'};
  height: ${(props) => props.size || '50px'};
  background: url(${(props) => props.file}) no-repeat center;
  background-size: ${(props) => props.display || 'contain'};
`;

export default KPicture;
