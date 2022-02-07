import { identity, indexOf, join, kebabCase, map, pickBy } from 'lodash';

/**
 * {样式映射}解析器
 * @param styleMap
 * @param importantArr
 * @returns {string}
 */
export default function styleMapParser(
  styleMap: Record<string, string | String>,
  importantArr?: string[]
): string {
  const _styleMap = pickBy(styleMap, (i) => !!identity(i));
  return join(
    map(
      _styleMap,
      (value, key) =>
        ` ${kebabCase(key)}: ${value}${indexOf(importantArr, key) > -1 ? ' !important' : ''};`
    ),
    ''
  );
}
