import {
  ButtonSize,
  ButtonType,
  Color,
  ColorType,
  HorizontalLayout,
  Layer, ListItemType, PositionAttr,
  TextAlign,
  TextType,
  UnionColor,
  WidthType
} from './attributes';
import IconType from './components/k-icons';
import { StyledProps } from './styled-props';

/**
 * 主题配置
 */
export interface ThemesConfig {
  /** 适配比例 */
  fittingRatio?: number;
  /** 颜色类型配置 */
  colorTypes?: { [K in ColorType]?: Color };
  /** 颜色配置 */
  colors?: { [K in Color]?: string };
  /** 宽度类型配置 */
  widthTypes?: { [K in WidthType]?: string };
  /** 层级配置 */
  zIndex?: { [K in Layer]?: string };
  /** 文字配置 */
  textTypes?: { [K in TextType]?: TextConfig };
  /** 卡片配置 */
  card?: CardConfig;
  /** 按钮配置 */
  buttons?: { [K in ButtonType]?: ButtonDeconstruction };
  /** 列表项配置 */
  listItems?: { [K in ListItemType]?: ListItemConfig };
  /** 输入框配置 */
  input?: InputConfig;
  /** 表格配置 */
  table?: TableConfig;
  /** 表单配置 */
  form?: FormThemeConfig;
  /** 模态框配置 */
  modal?: ModalConfig;
  /** 字体图标配置 */
  iconfont?: IconfontConfig;
  /** 设备类型（默认为'pc'） */
  deviceType: 'pc' | 'mobile' | 'pad';
  /** 自定义额外配置 */
  extra: Record<string, any>;
}

/**
 * 文字配置
 */
interface TextConfig {
  /** 文字大小 */
  fontSize?: string;
  /** 文字颜色 */
  color?: UnionColor;
  /** 文字行高 */
  lineHeight?: string;
  /** 文字是否加粗 */
  bold?: boolean;
  /** 文字字体 */
  fontFamily?: string;
}

/**
 * 卡片配置
 */
interface CardConfig extends StyledProps {
  header?: StyledProps;
  footer?: StyledProps;
}

/**
 * 按钮解构配置
 */
interface ButtonDeconstruction {
  /** 按钮大小配置（权重低） */
  sizes?: { [K in ButtonSize]?: StyledProps };
  /** 按钮盒模型基础配置（权重中） */
  boxes?: ButtonConfig;
  /** 按钮颜色类型配置（权重高） */
  colorTypes?: { [K in ColorType]?: ButtonConfig };
}

/**
 * 按钮配置
 */
interface ButtonConfig extends StyledProps {
  hover?: StyledProps;
  disabled?: StyledProps;
}

/**
 * 列表项配置
 */
interface ListItemConfig extends StyledProps {
  /** 图标 */
  icon?: IconType;
  /** 激活状态配置 */
  active?: StyledProps & { icon?: IconType };
  /** 鼠标悬浮状态配置 */
  hover?: StyledProps & { icon?: IconType };
}

/**
 * 输入框配置
 */
interface InputConfig extends StyledProps {
  focus?: StyledProps;
  invalid?: StyledProps;
  disabled?: StyledProps;
  widget?: {
    clear?: StyledProps & { icon: IconType };
    step?: StyledProps & { upIcon: IconType; downIcon: IconType };
  };
};

/**
 * 表格主题配置
 */
interface TableConfig {
  /** 表格头配置（paddings以head为准） */
  head?: StyledProps;
  /** 表格单元格配置 */
  cell?: StyledProps;
  /** 合并整行样式，（合并后，独立的单元格样式将变为整行的样式） */
  mergeRowStyle?: boolean;
  /** 表格偶数行底纹颜色 */
  evenRowColor?: UnionColor;
  /** 表格奇数行底纹颜色 */
  oddRowColor?: UnionColor;
  /** 分页配置 */
  pagination?: {
    /** 按钮组件 */
    button?: 'Button' | 'ButtonLabel';
    /** 按钮类型 */
    buttonType?: ColorType;
    /** 按钮激活类型 */
    activeButtonType?: ColorType;
  };
}

/**
 * 表单主题配置
 */
export interface FormThemeConfig {
  /** 标签布局（默认'horizontal'） */
  labelLayout?: 'horizontal' | 'vertical';
  /** 标签宽度（默认'80px'） */
  labelWidth?: string;
  /** 标签下边距（当labelLayout为vertical时生效） */
  labelMarginBottom?: WidthType;
  /** 标签字号 */
  labelFontSize?: string;
  /** 标签颜色 */
  labelColor?: UnionColor;
  /** 标签是否携带冒号 */
  labelColon?: boolean;
  /** 表单盒模型 */
  boxStyle?: StyledProps & {
    /** 集合内边距（上，右，下，左） */
    collectionPadding?: WidthType;
  };
  /** 子表单盒模型 */
  subFormBoxStyle?: StyledProps & {
    /** 集合内边距（上，右，下，左） */
    collectionPadding?: WidthType;
  };
  /** 集合表单配置 */
  collection?: {
    /** 集合项控制条 */
    itemBar?: StyledProps & {
      /** 控制条位置 */
      position?: PositionAttr;
      /** 控制条宽度 */
      width?: string;
      /** 控制条高度 */
      height?: string;
      /** 布局 */
      layout?: HorizontalLayout;
      /** 反置 */
      reverse?: boolean;
    };
    /** 集合项序号 */
    index?: {
      /** 序号名称（'$'代表当前集合的key，'*'代表当前项的index） */
      name?: string;
      /** 是否隐藏 */
      hidden?: boolean;
      /** 文字颜色 */
      color?: UnionColor;
      /** 文字加粗 */
      bold?: boolean;
    };
    /** 添加按钮 */
    addButton?: FormButtonConfig & {
      /** 按钮宽度 */
      width?: 'string';
    };
    /** 插入按钮 */
    insertButton?: FormButtonConfig;
    /** 删除按钮 */
    removeButton?: FormButtonConfig;
  };
}

/**
 * 表格按钮配置
 */
interface FormButtonConfig {
  /** 按钮名称（'$'代表当前集合的key） */
  name?: string;
  /** 按钮图标 */
  icon?: IconType;
  /** 按钮类型 */
  type?: ColorType;
  /** 按钮大小 */
  size?: ButtonSize;
}

/**
 * 模态框主题配置
 */
interface ModalConfig {
  /** 吐司 */
  toast?: ModelDetailConfig;
  /** 确认框 */
  confirm?: ModelDetailConfig & {
    /** 按钮组件 */
    button?: 'Button' | 'ButtonLabel';
    /** 按钮摆放位置 */
    buttonPlace?: 'left' | 'center' | 'right';
    /** 按钮大小 */
    buttonSize?: ButtonSize;
  };
}

/**
 * 模态框详情
 */
interface ModelDetailConfig {
  /** 位置（上，右，下，左） */
  position?: [WidthType, WidthType, WidthType, WidthType];
  /** 宽度 */
  width?: string;
  /** 内边距（上，右，下，左） */
  padding?: [WidthType, WidthType, WidthType, WidthType];
  /** 文字排布 */
  align?: TextAlign;
}

/**
 * 字体图标配置
 */
interface IconfontConfig {
  /** 宽度 */
  width?: string;
  /** 高度 */
  height?: string;
  /** 纵向偏距 */
  offsetY?: string;
}
