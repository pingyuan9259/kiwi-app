import { StyledProps } from '@kiwi/kiwi-app/types/styled-props';

/**
 * 变形解析器
 * @param props
 * @returns
 */
export default function transformParser(props: StyledProps): string {
  const { transform } = props;
  if (transform) {
    let string: string = '';
    transform.translate && (string += `translate(${transform.translate.split(' ').join(',')}) `);
    transform.scale && (string += `scale(${transform.scale}) `);
    transform.rotate && (string += `rotate(${transform.rotate}deg) `);
    transform.flip === 'horizontal' && (string += `rotateY(180deg) `);
    transform.flip === 'vertical' && (string += `rotateX(180deg) `);
    return string.trim();
  } else {
    return '';
  }
}
