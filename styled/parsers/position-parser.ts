import {
  Place,
  PositionAttr,
  PositionAttrConfig,
  WidthType
} from '@kiwi/kiwi-app/types/attributes';
import { find, mapValues } from 'lodash';
import { styleMapParser, widthParser } from '..';

/**
 * 定位值解析器
 * @param themes
 * @param place
 * @param direction
 * @param positionAttrs
 */
export default function positionParser(
  place: Place = 'center',
  positionAttrs: { [key in PositionAttr]: WidthType }
): string {
  const positionAttrConfigs: { [key in PositionAttr]: PositionAttrConfig } = {
    top: {
      value: positionAttrs.top,
      start: ['top', 'top-left', 'top-right'],
      center: ['center', 'left', 'right'],
      axis: 'y',
      disabled: !!positionAttrs.bottom
    },
    left: {
      value: positionAttrs.left,
      start: ['left', 'top-left', 'bottom-left'],
      center: ['center', 'top', 'bottom'],
      axis: 'x',
      disabled: !!positionAttrs.right
    },
    bottom: {
      value: positionAttrs.bottom,
      start: ['bottom', 'bottom-left', 'bottom-right']
    },
    right: {
      value: positionAttrs.right,
      start: ['right', 'top-right', 'bottom-right']
    }
  };
  const translate = { x: '0', y: '0' };
  const _positionAttrs = mapValues(positionAttrConfigs, (config) => {
    if (config.value) {
      return widthParser(config.value);
    } else if (config.disabled) {
      return '';
    } else {
      if (config.center) {
        const center = find(config.center, (i) => i === place);
        if (center) {
          translate[config.axis] = '-50%';
          return '50%';
        }
      }
      const start = find(config.start, (i) => i === place);
      if (start) {
        return '0';
      }
    }
  });
  const needTranslate = translate.x || translate.y;
  _positionAttrs['transform'] = needTranslate ? `translate(${translate.x}, ${translate.y})` : '';
  return styleMapParser(_positionAttrs);
}
