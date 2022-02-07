import { StyledProps } from '@kiwi/kiwi-app/types/styled-props';

/**
 * 过渡解析器
 * @param props
 * @returns
 */
export default function transitionParser(props: StyledProps): string {
  const { transition } = props;
  if (transition) {
    if (typeof transition === 'boolean') {
      return 'all 0.2s linear';
    } else {
      const duration = (transition.duration || 200) / 1000;
      if (transition.timingFunction) {
        switch (transition.timingFunction) {
          case 'linear':
          case 'ease':
          case 'ease-in':
          case 'ease-out':
          case 'ease-in-out':
            return `all ${duration}s ${transition.timingFunction}`;

          case 'ease-in-back':
            return `all ${duration}s cubic-bezier(.15,.07,.49,-0.67)`;

          case 'ease-out-back':
            return `all ${duration}s cubic-bezier(.24,1.62,.76,.95)`;
        }
      } else {
        return `all ${duration}s ease`;
      }
    }
  } else {
    return '';
  }
}
