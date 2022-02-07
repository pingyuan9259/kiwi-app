import { Layer } from '@kiwi/kiwi-app/types/attributes';
import { StyledProps } from '@kiwi/kiwi-app/types/styled-props';
import { identity, isEmpty, merge, pickBy } from 'lodash';
import themesService from '../themes/themes-service';
import animationParser from './animation-parser';
import { borderParser, borderRadiusParser } from './border-parser';
import colorParser from './color-parser';
import marginParser from './margin-parser';
import pseudoClassParser from './pseudo-class-parser';
import shadowParser from './shadow-parser';
import styleMapParser from './style-map-parser';
import textParser from './text-parser';
import transformParser from './transform-parser';
import transitionParser from './transition-parser';

/**
 * 样式范式属性解析器
 * @param props
 * @returns
 */
export function styledPropsParser(props: StyledProps): { [K in keyof StyledProps]: string } {
  if (isEmpty(props)) return {};

  const textConfig = textParser(props.text);
  const marginConfig = marginParser(props);
  const borderRadiusConfig = borderRadiusParser(props.borderRadius);
  const borderConfig = borderParser(props, colorParser(props.borderColor));
  const shadow = shadowParser({
    shadow: props.shadow,
    shadowColor: props.shadowColor,
    shadowWidth: props.shadowWidth,
    shadowDirection: props.shadowDirection
  });

  const styleMap = {
    marginTop: marginConfig.marginTop,
    marginRight: marginConfig.marginRight,
    marginBottom: marginConfig.marginBottom,
    marginLeft: marginConfig.marginLeft,
    paddingTop: marginConfig.paddingTop,
    paddingRight: marginConfig.paddingRight,
    paddingBottom: marginConfig.paddingBottom,
    paddingLeft: marginConfig.paddingLeft,
    float: props.float,
    fontSize: props.fontSize || textConfig.fontSize,
    fontFamily: props.fontFamily || textConfig.fontFamily,
    fontWeight: props.bold || textConfig.bold ? '500' : '',
    color: colorParser(props.color || textConfig.color),
    lineHeight: props.lineHeight,
    textAlign: props.align,
    verticalAlign: props.verticalAlign,
    whiteSpace: { true: 'normal', false: 'nowrap' }[String(props.wrap)],
    wordBreak: props.wordBreak && 'break-word',
    backgroundColor: colorParser(props.backgroundColor),
    opacity: props.opacity,
    width: props.width,
    height: props.height,
    minWidth: props.minWidth,
    minHeight: props.minHeight,
    maxWidth: props.maxWidth,
    maxHeight: props.maxHeight,
    borderRadius: borderRadiusConfig.all,
    borderTopLeftRadius: borderRadiusConfig.topLeft,
    borderTopRightRadius: borderRadiusConfig.topRight,
    borderBottomRightRadius: borderRadiusConfig.bottomRight,
    borderBottomLeftRadius: borderRadiusConfig.bottomLeft,
    borderTop: borderConfig.borderTop,
    borderRight: borderConfig.borderRight,
    borderBottom: borderConfig.borderBottom,
    borderLeft: borderConfig.borderLeft,
    boxShadow: shadow,
    position: props.relative && 'relative',
    zIndex: String(themesService.themes.zIndex[props.zIndex as Layer] || props.zIndex || ''),
    cursor: props.cursor,
    display:
      (props.hidden && 'none') || (props.inlineBlock && 'inline-block') || (props.block && 'block'),
    overflow: { hidden: 'hidden', scroll: 'auto' }[props.overflow],
    overflowX: props.overflow === 'scroll-x' && 'auto',
    overflowY: props.overflow === 'scroll-y' && 'auto',
    boxSizing: props.boxSizing || 'border-box',
    pointerEvents: props.clickThrough ? 'none' : '',
    transition: transitionParser(props),
    transform: transformParser(props)
  };
  // @ts-ignore
  return pickBy(styleMap, (i) => !!identity(i));
}

/**
 * 获取解析后的样式范式字符串
 * @param props
 * @returns
 */
export function getParsedStyledPropsStr(props: StyledProps): string {
  if (isEmpty(props)) {
    return '';
  }

  // 文字溢出省略号
  const ellipsisStyleMap = {
    display: 'inline-block',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap'
  };

  // 生成样式表
  const styleMap = styledPropsParser(props);

  // 合并样式重载
  const styleMapOverload = props.styledProps
    ? merge(
        pickBy(styledPropsParser(props.styledProps), (i) => !!identity(i)) as any,
        props.styledProps.ellipsis ? ellipsisStyleMap : null
      )
    : null;

  return [
    styleMapParser(styleMap),
    styleMapParser(props.ellipsis ? ellipsisStyleMap : null),
    styleMapParser(styleMapOverload),
    pseudoClassParser('hover', props),
    pseudoClassParser('firstChild', props),
    pseudoClassParser('lastChild', props),
    animationParser(props)
  ].join('');
}
