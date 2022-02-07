import { AnimationType, BorderStyle, Cursor, Layer, Place, TextAlign, TextType, TimingFunctionType, UnionColor, VerticalAlign, WidthType } from './attributes';
import { ThemesConfig } from './themes';

/**
 * 元素通用属性
 */
interface ElementAttrs {
  [ele: string]: any;
  onClick?: (event: MouseEvent) => void;
  onMousedown?: (event: MouseEvent) => void;
  onMouseup?: (event: MouseEvent) => void;
  onMouseover?: (event: MouseEvent) => void;
  onMouseleave?: (event: MouseEvent) => void;
  onKeypress?: (event: KeyboardEvent) => void;
  onKeydown?: (event: KeyboardEvent) => void;
  onKeyup?: (event: KeyboardEvent) => void;
  onScroll?: (event: Event) => void;
}

/**
 * 样式范式属性
 */
export interface StyledProps extends ElementAttrs {
  /** styledProps重载 */
  styledProps?: StyledProps;
  /** 主题 */
  themes?: ThemesConfig;
  /** 鼠标悬浮样式 */
  hover?: StyledProps;
  /** 首位子元素样式 */
  firstChild?: StyledProps;
  /** 末尾子元素样式 */
  lastChild?: StyledProps;
  /** 外边距（'y, x'，示例：margin="10px, 5%"） */
  margin?: WidthType;
  /** 外上边距（示例：marginTop="10px"） */
  marginTop?: WidthType;
  /** 外右边距（示例：marginRight="10px"） */
  marginRight?: WidthType;
  /** 外下边距（示例：marginBottom="10px"） */
  marginBottom?: WidthType;
  /** 外左边距（示例：marginLeft="10px"） */
  marginLeft?: WidthType;
  /** 内边距（'y, x'，示例：padding="10px, 5%"） */
  padding?: WidthType;
  /** 内上边距（示例：paddingTop="10px"） */
  paddingTop?: WidthType;
  /** 内右边距（示例：paddingRight="10px"） */
  paddingRight?: WidthType;
  /** 内下边距（示例：paddingBottom="10px"） */
  paddingBottom?: WidthType;
  /** 内左边距（示例：paddingLeft="10px"） */
  paddingLeft?: WidthType;
  /** 浮动 */
  float?: 'left' | 'right';
  /** 文字配置 */
  text?: TextType;
  /** 文字大小 */
  fontSize?: string;
  /** 文字颜色 */
  color?: UnionColor;
  /** 文字加粗 */
  bold?: boolean;
  /** 文字字体 */
  fontFamily?: string;
  /** 文字溢出省略号 */
  ellipsis?: boolean;
  /** 文字折行 */
  wrap?: boolean;
  /** 文字强制断行 */
  wordBreak?: boolean;
  /** 文字排布 */
  align?: TextAlign;
  /** 纵向文字排布 */
  verticalAlign?: VerticalAlign;
  /** 文字行高（示例：lingHeight="16px"） */
  lineHeight?: string;
  /** 背景颜色 */
  backgroundColor?: UnionColor;
  /** 透明度（示例：opacity="0.5"） */
  opacity?: string;
  /** 宽（示例：width="80px"） */
  width?: string;
  /** 高（示例：height="40px"） */
  height?: string;
  /** 最小宽（示例：minWidth="80px"） */
  minWidth?: string;
  /** 最小高（示例：minHeight="40px"） */
  minHeight?: string;
  /** 最大宽（示例：maxWidth="120px"） */
  maxWidth?: string;
  /** 最大高（示例：maxHeight="60px"） */
  maxHeight?: string;
  /** 边框圆角（示例：borderRadius="6px"，数组：[左上, 右上，右下，左下]） */
  borderRadius?: WidthType | [WidthType, WidthType, WidthType, WidthType];
  /** 边框 */
  border?: boolean | [WidthType, BorderStyle, UnionColor];
  /** 边框上 */
  borderTop?: boolean | [WidthType, BorderStyle, UnionColor];
  /** 边框右 */
  borderRight?: boolean | [WidthType, BorderStyle, UnionColor];
  /** 边框下 */
  borderBottom?: boolean | [WidthType, BorderStyle, UnionColor];
  /** 边框左 */
  borderLeft?: boolean | [WidthType, BorderStyle, UnionColor];
  /** 边框颜色 */
  borderColor?: UnionColor;
  /** 阴影 */
  shadow?: boolean;
  /** 阴影颜色 */
  shadowColor?: UnionColor;
  /** 阴影宽度 */
  shadowWidth?: string;
  /** 阴影透明度 */
  shadowOpacity?: number;
  /** 阴影方向（默认为'all'） */
  shadowDirection?: 'all' | 'top' | 'right' | 'bottom' | 'left';
  /** 块级样式 */
  block?: boolean;
  /** 行内块级样式 */
  inlineBlock?: boolean;
  /** 隐藏 */
  hidden?: boolean;
  /** 相对定位 */
  relative?: boolean;
  /** 层级 */
  zIndex?: Layer | String;
  /** 鼠标指针 */
  cursor?: Cursor;
  /** 溢出处理 */
  overflow?: 'hidden' | 'scroll' | 'scroll-x' | 'scroll-y';
  /** 和模型大小计算（默认'border-box'） */
  boxSizing?: 'border-box' | 'content-box';
  /** 点击穿透 */
  clickThrough?: boolean;
  /** 过渡（默认'all 0.2s linear'） */
  transition?: boolean | TransitionConfig;
  /** 变形 */
  transform?: TransformConfig;
  /** 动效（默认`2s infinite ${AnimationType}`) */
  animation?: AnimationType | AnimationConfig;
  /** 额外样式 */
  extra?: Partial<CSSStyleDeclaration>;
}

/**
 * 过渡配置
 */
interface TransitionConfig {
  /** 持续时间（单位毫秒） */
  duration?: number;
  /** 缓动函数 */
  timingFunction?: TimingFunctionType;
}

/**
 * 变形配置
 */
interface TransformConfig {
  /** 位移（'x, y'，示例：translate="-50%, 10px"） */
  translate?: string;
  /** 缩放（默认为1） */
  scale?: number;
  /** 旋转（默认为0） */
  rotate?: number;
  /** 翻转 */
  flip?: 'horizontal' | 'vertical';
}

/**
 * 动效配置
 */
export interface AnimationConfig {
  /** 动效类型 */
  type?: AnimationType;
  /** 持续时间（默认2000，单位毫秒） */
  duration?: number;
  /** 仅播放一次 */
  once?: boolean;
}

/**
 * {定位}样式组件参数类
 */
export interface KPositionProps {
  /** 上部距离 */
  top?: WidthType;
  /** 右部距离 */
  right?: WidthType;
  /** 下部距离 */
  bottom?: WidthType;
  /** 左部距离 */
  left?: WidthType;
}

/**
 * {带有摆放位置的定位}样式组件参数类
 */
export interface KPlacedPositionProps {
  /** 上部距离 */
  top?: WidthType;
  /** 右部距离 */
  right?: WidthType;
  /** 下部距离 */
  bottom?: WidthType;
  /** 左部距离 */
  left?: WidthType;
  /** 摆放位置，默认'center' */
  place?: Place;
}
