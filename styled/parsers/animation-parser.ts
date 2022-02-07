import { AnimationType } from '@kiwi/kiwi-app/types/attributes';
import { AnimationConfig, StyledProps } from '@kiwi/kiwi-app/types/styled-props';
import { clone, isEmpty, merge } from 'lodash';

/**
 * 动画解析器
 * @param props
 * @returns
 */
export default function animationParser(props: StyledProps): string {
  let animation = clone(props.animation || {});
  let animationOverload = clone(props.StyledProps ? props.StyledProps.animation || {} : {});
  if (typeof animation === 'string') {
    animation = { type: animation } as AnimationConfig;
  }
  if (typeof animationOverload === 'string') {
    animationOverload = { type: animationOverload } as AnimationConfig;
  }
  const mergedProp = merge(animation, animationOverload);
  if (isEmpty(mergedProp)) {
    return '';
  } else {
    return getAnimationStyle(mergedProp);
  }
}

/**
 * 获取动画样式
 */
function getAnimationStyle(animation: AnimationType | AnimationConfig): string {
  if (isEmpty(animation)) {
    return '';
  }
  if (typeof animation === 'string') {
    return getKeyFrame(2, 'infinite', animation);
  } else {
    return getKeyFrame(
      (animation.duration || 2000) / 1000,
      animation.once ? '1' : 'infinite',
      animation.type || 'rotate'
    );
  }
}

/**
 * 获取关键帧动画
 */
function getKeyFrame(duration: number, count: string, type: AnimationType) {
  switch (type) {
    case 'rotate':
      return `animation: ${duration}s ${count} kiwi-animation-${type} linear;
      @keyframes kiwi-animation-${type} {
        to { transform: rotate(360deg); } 
      }`;

    case 'breath':
      return `animation: ${duration}s ${count} kiwi-animation-${type} ease-in-out;
      @keyframes kiwi-animation-${type} {
        0% { opacity: 0.8; transform: scale(1.05); }
        55% { opacity: 1; transform: scale(1); } 
        100% { opacity: 0.8; transform: scale(1.05); }
      }`;
  }
}
