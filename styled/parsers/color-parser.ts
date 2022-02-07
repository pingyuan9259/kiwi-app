import { UnionColor } from '@kiwi/kiwi-app/types/attributes';
import { ThemesConfig } from '@kiwi/kiwi-app/types/themes';
import { isArray, isEmpty } from 'lodash';
import themesService from '../themes/themes-service';

/**
 * 获取颜色
 * @param value
 * @param _themes
 * @returns
 */
export default function colorParser(value: UnionColor, _themes?: ThemesConfig): string {
  const themes = _themes || themesService.themes;
  function parser(value): string {
    if (value.indexOf('#') > -1) {
      return value as string;
    } else {
      const { colors, colorTypes } = themes;
      return colors[colorTypes[value as string] || value] || '';
    }
  }
  if (isEmpty(value)) {
    return '';
  }
  if (isArray(value)) {
    const opacity = Math.round(value[1] * 255);
    const opacityStr = opacity.toString(16);
    const colorStr = parser(value[0]);
    if (colorStr.indexOf('#') > -1) {
      if (colorStr.length === 4) {
        const _colorStr = `${colorStr}${colorStr.replace('#', '')}`;
        return `${_colorStr}${opacityStr}`;
      } else {
        return `${colorStr}${opacityStr}`;
      }
    } else {
      return colorStr;
    }
  } else {
    return parser(value);
  }
}
