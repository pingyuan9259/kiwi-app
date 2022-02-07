import { styledProps } from '@kiwi/kiwi-app/styled';
import { StyledProps } from '@kiwi/kiwi-app/types/styled-props';
import { identity, indexOf, keys, merge, pickBy } from 'lodash';
import Vue from 'vue';

/**
 * Kiwi组件基类（纯净版）
 * @description 防止生态内子类出现循环依赖，特此生成一个纯净版基类
 */
export default class KiwiPure<Props = {}> extends Vue {
  constructor() {
    super();
    this.props = this.$props as Props;
  }

  /**
   * 组件参数声明
   * @description 用于承接组件的TsxProps的类型定义
   * @memberof KiwiPure
   */
  public readonly props!: Props & StyledProps;

  /**
   * 当前组件用户自定义样式范式属性
   * @memberof KiwiPure
   */
  public get customStyledProps(): StyledProps {
    const curStyledProps = pickBy(
      this.props,
      (value, key) => indexOf(keys(styledProps), key) > -1 && !!identity(value),
    );
    const curStyledPropsOverload = pickBy(
      this.props && this.props.styledProps,
      (value, key) => indexOf(keys(styledProps), key) > -1 && !!identity(value),
    );
    return merge(curStyledProps, curStyledPropsOverload);
  }
}
