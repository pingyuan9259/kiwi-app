import styled, { marginParser, styledPropsParser, styleMapParser } from '@kiwi/kiwi-app/styled';
import { WidthType } from '@kiwi/kiwi-app/types/attributes';
import { merge } from 'lodash';

/**
 * 卡片内容样式组件参数
 */
class ContentProps {
  computedPaddingTop: string = null;
  computedPaddingBottom: string = null;
  cardPadding: WidthType = null;
  cardPaddingTop: WidthType = null;
  cardPaddingRight: WidthType = null;
  cardPaddingBottom: WidthType = null;
  cardPaddingLeft: WidthType = null;
}

/**
 * 卡片样式组件
 * @description 用于KCard组件
 */
export const Card = styled('div')`
  position: relative;
  min-width: unset !important;
  min-height: unset !important;
  max-width: unset !important;
  max-height: unset !important;
  overflow: hidden !important;
  padding: 0 !important;
  ${(props) => {
    const styleMap = styledPropsParser(props.themes.card);
    return styleMapParser(styleMap);
  }}
`;

/**
 * 卡片内容样式组件
 * @description 用于KCard组件
 */
export const Content = styled('div', ContentProps)`
  position: relative;
  ${(props) => {
    const cardTheme = styledPropsParser(props.themes.card);
    const themeMarginConfig = marginParser({
      padding: cardTheme.padding,
      paddingTop: cardTheme.paddingTop,
      paddingRight: cardTheme.paddingRight,
      paddingBottom: cardTheme.paddingBottom,
      paddingLeft: cardTheme.paddingLeft
    });
    const customMarginConfig = marginParser({
      padding: props.cardPadding,
      paddingTop: props.cardPaddingTop,
      paddingRight: props.cardPaddingRight,
      paddingBottom: props.cardPaddingBottom,
      paddingLeft: props.cardPaddingLeft
    });
    const marginConfig = merge(themeMarginConfig, customMarginConfig);
    marginConfig.paddingTop = `${
      parseInt(props.computedPaddingTop || '0') + parseInt(marginConfig.paddingTop || '0')
    }px`;
    marginConfig.paddingBottom = `${
      parseInt(props.computedPaddingBottom || '0') + parseInt(marginConfig.paddingBottom || '0')
    }px`;
    return styleMapParser(marginConfig);
  }}
`;
