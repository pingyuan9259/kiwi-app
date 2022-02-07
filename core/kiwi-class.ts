import { styledProps } from '@kiwi/kiwi-app/styled';
import { HyperScriptFunction } from '@kiwi/kiwi-app/types';
import { StyledProps } from '@kiwi/kiwi-app/types/styled-props';
import { identity, indexOf, keys, merge, pickBy } from 'lodash';
import Vue from 'vue';
import modalService from '../components/k-modal/service';
import { timerFn } from './supports/timer';

/**
 * Kiwi组件基类
 *
 */
export default class Kiwi<Props = {}> extends Vue {
  constructor() {
    super();
    this.props = this.$props as Props;
  }

  /**
   * 组件参数
   * @description 用于承接组件的TsxProps的类型定义
   * @memberof Kiwi
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

  /**
   * 计时器
   * @memberof Kiwi
   */
  public timer = timerFn();

  /**
   * {吐司}模态框
   * @param arg
   * @memberof Kiwi
   */
  public toast = modalService.toast;

  /**
   * {警告}模态框
   * @param arg
   * @memberof Kiwi
   */
  public alert = modalService.alert;

  /**
   * {确认}模态框
   * @param arg
   * @memberof Kiwi
   */
  public confirm = modalService.confirm;

  /**
   * {气泡}模态框
   * @param arg
   * @memberof Kiwi
   */
  public pop = modalService.pop;

  /**
   * 模态框
   * @param arg
   * @memberof Kiwi
   */
  public modal = modalService.modal;

  /**
   * 渲染
   * @abstract
   * @memberof Kiwi
   */
  protected render?(h: HyperScriptFunction): JSX.Element;
}
