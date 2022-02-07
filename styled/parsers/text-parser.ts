import { TextType } from '@kiwi/kiwi-app/types/attributes';
import { TextConfig } from '@kiwi/kiwi-app/types/themes';
import { assign, clone } from 'lodash';
import themeService from '../themes/themes-service';

/**
 * 文字解析器
 * @param value
 * @param _themes
 * @returns
 */
export default function textParser(value?: TextType | [TextType, TextConfig?]): TextConfig {
  const themes = themeService.themes;
  if (typeof value === 'string') {
    return themes.textTypes[value];
  } else if (value instanceof Array) {
    return assign(clone(themes.textTypes[value[0]]), value[1] || {});
  } else {
    return {};
  }
}
