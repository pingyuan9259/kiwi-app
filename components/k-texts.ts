import styled, { colorParser, styleMapParser } from '@kiwi/kiwi-app/styled';

/**
 * 一级标题组件
 */
export const H1 = styled('h1')`
  ${(props) => {
    const text = props.themes.textTypes.header1;
    return styleMapParser({
      fontSize: text.fontSize,
      lineHeight: text.lineHeight,
      fontWeight: `${text.bold ? '500' : ''}`,
      color: colorParser(text.color),
      textAlign: `${props.align || 'left'}`,
      fontFamily: text.fontFamily || 'inherit',
    });
  }}
`;

/**
 * 二级标题组件
 */
export const H2 = styled('h2')`
  ${(props) => {
    const text = props.themes.textTypes.header2;
    return styleMapParser({
      fontSize: text.fontSize,
      lineHeight: text.lineHeight,
      fontWeight: `${text.bold ? '500' : ''}`,
      color: colorParser(text.color),
      textAlign: `${props.align || 'left'}`,
      fontFamily: text.fontFamily || 'inherit',
    });
  }}
`;

/**
 * 三级标题组件
 */
export const H3 = styled('h3')`
  ${(props) => {
    const text = props.themes.textTypes.header3;
    return styleMapParser({
      fontSize: text.fontSize,
      lineHeight: text.lineHeight,
      fontWeight: `${text.bold ? '500' : ''}`,
      color: colorParser(text.color),
      textAlign: `${props.align || 'left'}`,
      fontFamily: text.fontFamily || 'inherit',
    });
  }}
`;

/**
 * 四级标题组件
 */
export const H4 = styled('h4')`
  ${(props) => {
    const text = props.themes.textTypes.header4;
    return styleMapParser({
      fontSize: text.fontSize,
      lineHeight: text.lineHeight,
      fontWeight: `${text.bold ? '500' : ''}`,
      color: colorParser(text.color),
      textAlign: `${props.align || 'left'}`,
      fontFamily: text.fontFamily || 'inherit',
    });
  }}
`;

/**
 * 五级标题组件
 */
export const H5 = styled('h5')`
  ${(props) => {
    const text = props.themes.textTypes.header5;
    return styleMapParser({
      fontSize: text.fontSize,
      lineHeight: text.lineHeight,
      fontWeight: `${text.bold ? '500' : ''}`,
      color: colorParser(text.color),
      textAlign: `${props.align || 'left'}`,
      fontFamily: text.fontFamily || 'inherit',
    });
  }}
`;

/**
 * 段落组件
 */
export const P = styled('span')`
  display: block;
  ${(props) => {
    const text = props.themes.textTypes.paragraph;
    return styleMapParser({
      fontSize: text.fontSize,
      lineHeight: text.lineHeight,
      fontWeight: `${text.bold ? '500' : ''}`,
      color: colorParser(text.color),
      textAlign: `${props.align || 'left'}`,
      fontFamily: text.fontFamily || 'inherit',
    });
  }}
`;

/**
 * 注释组件
 */
export const Comment = styled('span')`
  display: block;
  ${(props) => {
    const text = props.themes.textTypes.comment;
    return styleMapParser({
      fontSize: text.fontSize,
      lineHeight: text.lineHeight,
      fontWeight: `${text.bold ? '500' : ''}`,
      color: colorParser(text.color),
      textAlign: `${props.align || 'left'}`,
      fontFamily: text.fontFamily || 'inherit',
    });
  }}
`;

/**
 * 标签组件
 */
export const Label = styled('span')`
  ${(props) => {
    const text = props.themes.textTypes.label;
    return styleMapParser({
      fontSize: text.fontSize,
      lineHeight: text.lineHeight,
      fontWeight: `${text.bold ? '500' : ''}`,
      color: colorParser(text.color),
      textAlign: `${props.align || 'left'}`,
      fontFamily: text.fontFamily || 'inherit',
    });
  }}
`;

/**
 * 格式化段落组件
 */
export const Pre = styled('pre')`
 ${(props) => {
    const text = props.themes.textTypes.paragraph;
    return styleMapParser({
      fontSize: text.fontSize,
      lineHeight: text.lineHeight,
      fontWeight: `${text.bold ? '500' : ''}`,
      color: colorParser(text.color),
      textAlign: `${props.align || 'left'}`,
      fontFamily: text.fontFamily || 'inherit',
    });
  }}
`;
