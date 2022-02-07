/**
 * 样式组件模块定义
 */
 declare module 'vue-styled-components' {
  import { StyledProps } from '@kiwi/kiwi-app/types/styled-props';

  /**
   * 样式组件所支持的元素标签
   */
  export type ElementTag =
    | 'a'
    | 'article'
    | 'audio'
    | 'body'
    | 'br'
    | 'button'
    | 'canvas'
    | 'div'
    | 'form'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'head'
    | 'html'
    | 'i'
    | 'iframe'
    | 'img'
    | 'input'
    | 'label'
    | 'legend'
    | 'li'
    | 'link'
    | 'map'
    | 'meta'
    | 'noscript'
    | 'p'
    | 'picture'
    | 'pre'
    | 'progress'
    | 'q'
    | 'script'
    | 'section'
    | 'select'
    | 'source'
    | 'span'
    | 'strong'
    | 'style'
    | 'svg'
    | 'table'
    | 'tbody'
    | 'td'
    | 'textarea'
    | 'tfoot'
    | 'th'
    | 'thead'
    | 'time'
    | 'title'
    | 'tr'
    | 'ul'
    | 'video';

  /**
   * 样式组件配置函数
   */
  export type StyledComponentFunction<Props = StyledProps> = (
    str: TemplateStringsArray | string[],
    ...placeholders: ((props: Props) => string | String | { toString: () => string | String })[]
  ) => StyledComponent<Props>;

  /**
   * 样式组件类型
   */
  export type StyledComponent<Props = StyledProps> = (props: Props) => any;

  /**
   * 样式组件执行方法
   */
  export type Styled = <Props = StyledProps>(
    elementTag: ElementTag | StyledComponent,
    props?: Props | string[]
  ) => StyledComponentFunction<Props>;

  const styled: Styled;

  /**
   * 样式组件执行方法
   */
  export default styled;
}
