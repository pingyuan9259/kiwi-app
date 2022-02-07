import { HyperScriptFunction } from '../..';
import { ColorType, TextAlign } from '../../attributes';
import IconType from '../k-icons';
import { TableCellHandler, TablePropParser } from './handlers';

/**
 * 表格列配置
 *
 */
export type TableColumn<Data, Ctx = any, Val = any> = TableBaseColumn<Data, Ctx, Val> &
  (
    | TableStringColumn
    | TableImageColumn<Data, Ctx, Val>
    | TableInputColumn<Data, Ctx, Val>
    | TableComponentColumn<Data, Ctx, Val>
    | TableButtonsColumn<Data, Ctx>
  );

/**
 * {基础}表格列配置
 */
interface TableBaseColumn<D, C, V> {
  /** 表格列的名称 */
  name: string | TablePropParser<D, C, V, string>;
  /** 表格单元格值解析 */
  value?: TablePropParser<D, C, V, V>;
  /** 表格列的宽度（默认：'200px'） */
  width?: string | TablePropParser<D, C, V, string>;
  /** 表格列的文字排布 */
  align?: TextAlign | TablePropParser<D, C, V, TextAlign>;
  /** 是否固定表格列 */
  fixed?: ('left' | 'right') | TablePropParser<D, C, V, 'left' | 'right'>;
  /** 表格列的提示信息 */
  tips?: TablePropParser<D, C, V, (h: HyperScriptFunction) => JSX.Element>;
}

/**
 * {文本}表格列配置
 */
interface TableStringColumn {
  type: 'string';
}

/**
 * {图片}表格列配置
 */
interface TableImageColumn<Data, Ctx, Val> {
  /** 表格列的展示类型 */
  type: 'image';
  /** 图片高度（图片宽度继承表格列的宽度） */
  height?: string | TablePropParser<Data, Ctx, Val, string>;
}

/**
 * {输入框}表格列配置
 */
interface TableInputColumn<Data, Ctx, Val> {
  /** 表格列的展示类型 */
  type: 'input';
  /** 提示文字 */
  placeholder?: string;
  /** 表格单元格值监听器 */
  onChange?: TableCellHandler<Data, Ctx, Val>;
}

/**
 * {组件}表格列配置
 */
interface TableComponentColumn<Data, Ctx, Val> {
  /** 表格列的展示类型 */
  type: 'component';
  /** 组件 */
  component: TablePropParser<Data, Ctx, Val, (...args: any[]) => JSX.Element>;
}

/**
 * {按钮组}表格列配置
 */
interface TableButtonsColumn<Data, Ctx> {
  /** 表格列的展示类型 */
  type: 'buttons';
  /** 表格列按钮组配置 */
  configs: ButtonConfig<Data, Ctx>[];
}

/**
 * 表格按钮配置
 */
interface ButtonConfig<Data, Ctx> {
  /** 按钮名称 */
  name: string | TablePropParser<Data, Ctx, any, string>;
  /** 按钮时间处理函数 */
  handler: TableCellHandler<Data, Ctx, never>;
  /** 按钮是否禁用 */
  disabled?: boolean | TablePropParser<Data, Ctx, any, boolean>;
  /** 按钮是否隐藏 */
  hidden?: boolean | TablePropParser<Data, Ctx, any, boolean>;
  /** 按钮图标 */
  icon?: IconType | TablePropParser<Data, Ctx, any, IconType>;
  /** 按钮颜色类型（默认为'highlight'） */
  type?: ColorType | TablePropParser<Data, Ctx, any, ColorType>;
}
