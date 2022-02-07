import { assign, clone, find, map, replace } from 'lodash';
import _Styled, { ElementTag, StyledComponentFunction } from 'vue-styled-components';
import { StyledProps } from '../types/styled-props';
import { ThemesConfig } from '../types/themes';
import animationParser from './parsers/animation-parser';
import { borderParser, borderRadiusParser } from './parsers/border-parser';
import colorParser from './parsers/color-parser';
import marginParser from './parsers/margin-parser';
import positionParser from './parsers/position-parser';
import shadowParser from './parsers/shadow-parser';
import styleMapParser from './parsers/style-map-parser';
import { getParsedStyledPropsStr, styledPropsParser } from './parsers/styled-props-parser';
import textParser from './parsers/text-parser';
import transformParser from './parsers/transform-parser';
import transitionParser from './parsers/transition-parser';
import widthParser from './parsers/width-parser';
import { styledProps } from './props';
import themesService from './themes/themes-service';

export { placedPositionProps, positionProps, styledProps } from './props';
export { darkThemes } from './themes/dark-themes';
export { defaultThemes } from './themes/default-themes';
export {
  getParsedStyledPropsStr,
  styledPropsParser,
  borderParser,
  borderRadiusParser,
  animationParser,
  shadowParser,
  transitionParser,
  transformParser,
  positionParser,
  textParser,
  colorParser,
  widthParser,
  styleMapParser,
  marginParser,
  themesService,
};

/**
 * kiwi样式组件
 * @param elementTag
 * @param propsDef
 * @returns
 */
export default function styled<Props>(
  elementTag: ElementTag,
  propsDef?: (new () => Props) | Props
): StyledComponentFunction<Props & StyledProps> {
  return (
    str: TemplateStringsArray,
    ...placeholders: ((props: Props) => string | String | { toString: () => string | String })[]
  ) => {
    // 注入解析后的样式范式
    placeholders.push((props) => {
      return getParsedStyledPropsStr(props);
    });

    // 模版字符串解析器拦截
    const _placeholders = map(placeholders, placeholder => {
      return (props: Props & StyledProps & { theme: ThemesConfig }) => {
        // 为props添加上主题
        props.themes = themesService.themes;

        // 缩放适配页面展示
        if (props.themes.deviceType !== 'pc') {
          const _placeholder = placeholder(props);
          if (typeof _placeholder === 'string') {
            // 替换样式组件参数中的px为rem，释放拦截
            return pxToEm(_placeholder, themesService.fittingZoom);
          } else {
            // 释放拦截
            return _placeholder;
          }
        }

        // 释放拦截
        return placeholder(props);
      };
    });

    return _Styled(elementTag, assign(clone(styledProps), getPropsDef(propsDef)))(str, ..._placeholders);
  }
}

/**
 * ps转em
 */
function pxToEm(str: string, zoom: number) {
  // 单倍适配比例基准（配合16px根字体大小，多次测试得出）
  const fittingRatio = 14.4925;

  return replace(
    str,
    /[+-]?((\d+\.?\d*)|(\.\d+))+px/gm,
    (matched) =>
      `${(parseInt(matched) / (Number(zoom) * fittingRatio)).toFixed(
        3
      )}rem`
  );
}

/**
 * 检查是否为构造器
 */
function getPropsDef<Props>(propsDef: any): Props {
  try {
    return new propsDef();
  } catch (err) {
    return propsDef;
  }
}
