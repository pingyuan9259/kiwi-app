import { WidthType } from '@kiwi/kiwi-app/types/attributes';
import { ThemesConfig } from '@kiwi/kiwi-app/types/themes';
import { forEach } from 'lodash';
import themesService from '../themes/themes-service';

/**
 * 宽度解析器
 * @param value
 * @param _themes
 * @returns
 */
export default function widthParser(value: WidthType, _themes?: ThemesConfig): string {
  const themes = _themes || themesService.themes;
  if (value && typeof value === 'string') {
    switch (value) {
      case 'margin1':
        return themes.widthTypes.margin1;
      case 'margin2':
        return themes.widthTypes.margin2;
      case 'margin3':
        return themes.widthTypes.margin3;
      case 'margin4':
        return themes.widthTypes.margin4;
      case 'borderRadius1':
        return themes.widthTypes.borderRadius1;
      case 'borderRadius2':
        return themes.widthTypes.borderRadius2;
      case 'borderRadius3':
        return themes.widthTypes.borderRadius3;
      case 'shadowWidth1':
        return themes.widthTypes.shadowWidth1;
      case 'shadowWidth2':
        return themes.widthTypes.shadowWidth2;
      case 'none':
        return '0';
      default: {
        const stringArray = value.split(' ');
        if (stringArray.length > 1) {
          let res = '';
          forEach(stringArray, (string) => {
            res += `${widthParser(string)} `;
          });
          return res;
        } else {
          return value;
        }
      }
    }
  } else {
    return '';
  }
}
