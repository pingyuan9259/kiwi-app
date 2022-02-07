import { forIn } from 'lodash';

/**
 * 主题模版解析器
 * @param theme
 * @param source
 * @returns
 */
export default function themeTemplateParser<T extends object>(
  themeConfig: T,
  props: Record<string, string>
): T {
  let json = JSON.stringify(themeConfig);
  if (json) {
    forIn(props, (value, key) => {
      const regExp = new RegExp('\\$props.' + key, 'g');
      json = json.replace(regExp, value);
    });
    return JSON.parse(json);
  } else {
    return themeConfig;
  }
}
