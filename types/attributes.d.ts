/**
 * 层级
 */
 export type Layer = 'base' | 'content' | 'widget' | 'panel' | 'angle';

 /**
  * 鼠标指针样式
  */
 export type Cursor =
   | 'crosshair'
   | 'default'
   | 'pointer'
   | 'move'
   | 'e-resize'
   | 'ne-resize'
   | 'nw-resize'
   | 'n-resize'
   | 'se-resize'
   | 'sw-resize'
   | 's-resize'
   | 'w-resize'
   | 'text'
   | 'wait'
   | 'help';
 
 /**
  * 摆放位置
  */
 export type Place =
   | 'center'
   | 'top'
   | 'right'
   | 'bottom'
   | 'left'
   | 'top-right'
   | 'bottom-right'
   | 'bottom-left'
   | 'top-left';
 
 /**
  * 定位属性
  */
 export type PositionAttr = 'top' | 'right' | 'bottom' | 'left';
 
 /**
  * 横向布局
  */
 export type HorizontalLayout = 'center' | 'left' | 'right' | 'space-between' | 'space-around';
 
 /**
  * 纵向布局
  */
 export type VerticalLayout = 'center' | 'top' | 'bottom';
 
 /**
  * 宽度类型
  */
 export type WidthType =
   | 'none'
   | 'margin1'
   | 'margin2'
   | 'margin3'
   | 'margin4'
   | 'borderRadius1'
   | 'borderRadius2'
   | 'borderRadius3'
   | 'shadowWidth1'
   | 'shadowWidth2'
   | String;
 
 /**
  * 边框样式
  */
 export type BorderStyle = 'solid' | 'dashed' | 'dotted';
 
 /**
  * 颜色联合类型
  */
 export type UnionColor =
   | /** 颜色联合类型 */
   UnionColorBase
   /** 携带透明度的颜色联合类型（透明度0到1） */
   | [UnionColorBase, number];
 
 /**
  * 颜色联合类型基础类型
  */
 type UnionColorBase = ColorType | Color | String;
 
 /**
  * 颜色类别
  */
 export type ColorType =
   | 'default'
   | 'highlight'
   | 'success'
   | 'warning'
   | 'danger'
   | 'comment'
   | 'background'
   | 'shading'
   | 'border'
   | 'shadow'
   | 'hover';
 
 /**
  * 颜色
  */
 export type Color =
   | 'transparent'
   | 'inherit'
   | 'white'
   | 'white2'
   | 'black'
   | 'black2'
   | 'lightGray'
   | 'lightGray2'
   | 'gray'
   | 'gray2'
   | 'deepGray'
   | 'deepGray2'
   | 'lightRed'
   | 'lightRed2'
   | 'red'
   | 'red2'
   | 'lightOrange'
   | 'lightOrange2'
   | 'orange'
   | 'orange2'
   | 'yellow'
   | 'yellow2'
   | 'lightGreen'
   | 'lightGreen2'
   | 'green'
   | 'green2'
   | 'lightBlue'
   | 'lightBlue2'
   | 'blue'
   | 'blue2'
   | 'deepBlue'
   | 'deepBlue2'
   | 'cyan'
   | 'cyan2'
   | 'brown'
   | 'brown2'
   | 'pink'
   | 'pink2';
 
 /**
  * 文本类别
  */
 export type TextType =
   | 'header1'
   | 'header2'
   | 'header3'
   | 'header4'
   | 'header5'
   | 'paragraph'
   | 'comment'
   | 'label';
 
 /**
  * 文本排布
  */
 export type TextAlign = 'center' | 'left' | 'right';
 
 /**
  * 文本纵向排布
  */
 export type VerticalAlign =
   | 'top'
   | 'middle'
   | 'height'
   | 'text-top'
   | 'text-bottom'
   | 'base-line'
   | String;
 
 /**
  * 按钮大小
  */
 export type ButtonSize = 'small' | 'medium' | 'large';
 
 /**
  * 按钮类型
  */
 export type ButtonType = 'standard' | 'hollow' | 'link' | 'tag';
 
 /**
  * 输入框类型
  */
 export type InputType = 'text' | 'number' | 'password' | 'file';
 
 /**
  * 列表项类型
  */
 export type ListItemType = 'menu' | 'subMenu' | 'tab' | 'select' | 'checkBox' | 'radio';
 
 /**
  * 开关类型
  */
 export type SwitchType = 'switch' | 'checkBox';
 
 /**
  * 缓动函数类型
  */
 export type TimingFunctionType =
   | 'linear'
   | 'ease'
   | 'ease-in'
   | 'ease-out'
   | 'ease-in-out'
   | 'ease-in-back'
   | 'ease-out-back';
 
 /**
  * 动效类型
  */
 type AnimationType = 'rotate' | 'breath';
 
 /**
  * 定位值配置
  */
 export interface PositionAttrConfig {
   /** 定位值（定位以该值为准，未定义则取以下值） */
   value: WidthType;
   /** 致使该元素把头的摆放位置数组 */
   start: Place[];
   /** 致使该元素居中的摆放位置数组 */
   center?: Place[];
   /** 轴方向 */
   axis?: 'x' | 'y';
   /** 禁用该定位值（禁用后该定位为空） */
   disabled?: boolean;
 }
 