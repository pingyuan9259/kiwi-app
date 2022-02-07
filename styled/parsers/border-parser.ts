import { StyledProps } from '@kiwi/kiwi-app/types/styled-props';
import { forEach } from 'lodash';
import { BorderStyle, UnionColor, WidthType } from '../../types/attributes';
import themesService from '../themes/themes-service';
import colorParser from './color-parser';
import widthParser from './width-parser';

type SpecificSetting = [WidthType, BorderStyle, UnionColor];

interface ParsedBorderStyle {
  borderTop: string;
  borderRight: string;
  borderBottom: string;
  borderLeft: string;
}

interface ParsedBorderRadiusStyle {
  all: string;
  topLeft: string;
  topRight: string;
  bottomRight: string;
  bottomLeft: string;
}

/**
 * 边框值解析器
 * @param value
 * @param color
 * @returns
 */
export function borderValueParser(value: SpecificSetting): string;
export function borderValueParser(value: boolean | undefined, color: UnionColor): string;
export function borderValueParser(
  value: SpecificSetting | boolean | undefined,
  color: UnionColor
): string;
export function borderValueParser(
  value: SpecificSetting | boolean | undefined,
  color?: UnionColor
): string {
  switch (typeof value) {
    case 'boolean':
      return value ? `1px solid ${colorParser(color)}` : 'none';

    case 'undefined':
      return '';

    default: {
      const _borderColor = value[2] || color;
      return `${widthParser(value[0])} ${value[1]} ${colorParser(_borderColor)}`;
    }
  }
}

/**
 * 边框配置解析器
 * @param value
 * @param _theme
 * @returns
 */
export function borderParser(props: StyledProps, borderColor: UnionColor): ParsedBorderStyle {
  const theme = themesService.themes;
  const defaultBorderColor = theme.colorTypes && theme.colorTypes.border;
  const res = {} as ParsedBorderStyle;
  const mixBorderParsedValue = borderValueParser(props.border, borderColor || defaultBorderColor);
  const borderKeys = ['borderTop', 'borderRight', 'borderBottom', 'borderLeft'];
  forEach(borderKeys, (key) => {
    const value = props[key];
    res[key] = borderValueParser(value, borderColor || defaultBorderColor) || mixBorderParsedValue;
  });
  return res;
}

/**
 * 边框圆角解析器
 * @param value
 */
export function borderRadiusParser(
  value: WidthType | [WidthType, WidthType, WidthType, WidthType] = ''
): ParsedBorderRadiusStyle {
  let borderRadius: WidthType = '';
  let borderRadiusArr: WidthType[] = [];
  if (value instanceof Array) {
    borderRadiusArr = value;
  } else {
    borderRadius = value;
    borderRadiusArr = [];
  }
  return {
    all: widthParser(borderRadius),
    topLeft: widthParser(borderRadiusArr[0]),
    topRight: widthParser(borderRadiusArr[1]),
    bottomRight: widthParser(borderRadiusArr[2]),
    bottomLeft: widthParser(borderRadiusArr[3])
  };
}
