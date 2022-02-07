/// <reference path="./styled.d.ts" />

import Vue, { RenderContext, VNode } from 'vue';
import VueRouter from 'vue-router';
import { CreateElement, PluginObject } from 'vue/types/umd';
import { StyledProps } from './styled-props';
import { ThemesConfig } from './themes';

declare global {
  namespace JSX {
    interface Element extends VNode { }
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      [elem: string]: any;
    }
    interface ElementAttributesProperty {
      props: any;
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    /** 组件实例标识号 */
    _uid: number;
    /** 组件参数 */
    props: any;
    /** 当前组件用户自定义样式范式属性 */
    customStyledProps: StyledProps;
  }
}

/**
 * render函数
 */
declare const h: (a, b, c, d) => any;

/**
 * 函数组件
 */
export type FunctionComponent<Props = {}> = (context: Partial<RenderContext<Props>> & {
  [K in keyof Props]: Props[K]
}) => JSX.Element;

/**
 * h函数
 */
export type HyperScriptFunction = CreateElement;

/**
 * KiwiApp初始化参数
 */
export interface KiwiAppInitParams {
  /** 组件渲染 */
  render: (h: HyperScriptFunction) => JSX.Element;
  /** 容器元素id */
  elementId?: string;
  /** 路由 */
  router?: VueRouter;
  /** Kiwi扩展对象 */
  extends?: Record<string, any>;
  /** Kiwi插件列表 */
  plugins?: PluginObject<any>[];
  /** 自定义主题（数组则向前叠加合并，默认使用kiwi-styled-components中提供的缺省主题） */
  themes?: Partial<ThemesConfig>[];
}
