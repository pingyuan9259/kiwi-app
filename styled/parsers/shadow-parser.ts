import { UnionColor } from '@kiwi/kiwi-app/types/attributes';
import themesService from '../themes/themes-service';
import colorParser from './color-parser';

/**
 * 获取阴影样式
 * @param themes
 * @param shadow
 * @param shadowDirection
 * @returns
 */
export default function shadowParser(params: {
  shadow: boolean;
  shadowColor?: UnionColor;
  shadowWidth?: string;
  shadowOpacity?: number;
  shadowDirection?: 'all' | 'top' | 'right' | 'bottom' | 'left';
}): string {
  const { themes } = themesService;
  const { shadow, shadowColor, shadowWidth, shadowOpacity, shadowDirection } = params;
  if (shadow) {
    const width = parseInt(shadowWidth || '0') * 2 || parseInt(themes.widthTypes.shadowWidth1) * 2;
    const color = colorParser(shadowColor || themes.colorTypes.shadow);
    const opacity =
      ['E0', 'C0', 'A0', '90', '80', '70', '60', '50', '40', '30'][shadowOpacity * 10 || 4] || '80';
    return {
      all: `1px 1px ${width}px ${color}${8}0`,
      top: `0 -${width}px ${width}px -${width}px ${color}${opacity}`,
      right: `${width}px 0 ${width}px -${width}px ${color}${opacity}`,
      bottom: `0 ${width}px ${width}px -${width}px ${color}${opacity}`,
      left: `-${width}px 0 ${width}px -${width}px ${color}${opacity}`
    }[shadowDirection || 'all'];
  } else {
    return '';
  }
}
