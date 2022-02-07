import { StyledProps } from '@kiwi/kiwi-app/types/styled-props';
import { isEmpty, kebabCase, merge } from 'lodash';
import { getParsedStyledPropsStr } from './styled-props-parser';

/**
 * 伪类解析器
 * @param propName
 * @param props
 * @param themes
 * @returns
 */
export default function pseudoClassParser(propName: string, props: StyledProps): string {
  const mergedProp = merge(props[propName], props.styledProps && props.styledProps[propName]);
  if (isEmpty(mergedProp)) {
    return '';
  } else {
    return `&:${kebabCase(propName)}{${getParsedStyledPropsStr(mergedProp)}}`;
  }
}
