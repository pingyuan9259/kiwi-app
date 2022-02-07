import { KModal } from '@kiwi/kiwi-app/components';
import { HyperScriptFunction } from '..';
import { PositionAttr } from '../attributes';

export type KModalUnionParams = KToastParams | KConfirmParams | KPopParams | KModalParams;

export type KModalType = 'toast' | 'alert' | 'confirm' | 'pop' | 'modal';

export type KModalColorType = 'default' | 'success' | 'danger' | 'warning';

interface KModalBase {
  /** 模态框内容 */
  content: string | ((h: HyperScriptFunction, modal: KModal) => JSX.Element);
  /** 模态框id */
  id?: string;
  /** 模态框上下文 */
  context?: Vue;
  /** 弹框关闭事件 */
  onDispose?: () => void;
}

/**
 * {toast}模态框参数
 */
export interface KToastParams extends KModalBase {
  /** 模态框类型 */
  modalType?: 'toast';
  /** 颜色类型 */
  type?: KModalColorType;
}

/**
 * {confirm}模态框参数
 */
export interface KConfirmParams extends KModalBase {
  /** 模态框类型 */
  modalType?: 'alert' | 'confirm';
  /** 模态框标题 */
  title?: string | ((h: HyperScriptFunction, modal: KModal) => JSX.Element);
  /** 颜色类型 */
  type?: 'default' | 'success' | 'danger' | 'warning';
  /** 点击空白处关闭 */
  blankCloseDisabled?: boolean;
}

/**
 * {pop}模态框参数
 */
export interface KPopParams extends KModalBase {
  /** 模态框类型 */
  modalType?: 'pop';
  /** 元素目标 */
  target: EventTarget;
  /** 弹出方向（默认为上） */
  direction?: PositionAttr;
  /** 弹出框与元素目标对齐（默认'center'） */
  align?: 'start' | 'center' | 'end';
  /** 展示箭头 */
  arrow?: (h: HyperScriptFunction) => JSX.Element;
}

/**
 * {modal}模态框参数
 */
export interface KModalParams extends KModalBase {
  /** 模态框类型 */
  modalType?: 'modal';
  /** 点击空白处关闭 */
  blankCloseDisabled?: boolean;
}
