import { styledProps } from '@kiwi/kiwi-app/styled';
import { mapValues, merge } from 'lodash';

type PropsClass = new () => { [key: string]: any };
type Props = { [key: string]: { default?: any } };

/**
 * 组件参数解析器
 * @param PropsClass
 * @returns
 */
export default function propsParser(PropsClass: PropsClass): Props {
  const propsObject = new PropsClass();
  const props: Props = mapValues(propsObject, (i) => {
    if (i === undefined || i === null) {
      return undefined;
    } else {
      return { default: i };
    }
  });
  // 合并样式范式
  return merge(props, styledProps);
}
