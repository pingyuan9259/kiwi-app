import { widthParser } from '@kiwi/kiwi-app/styled';
import { WidthType } from '@kiwi/kiwi-app/types/attributes';
import { StyledProps } from '@kiwi/kiwi-app/types/styled-props';
import { identity, pickBy } from 'lodash';

/**
 * 边距解析器
 * @param styledProps
 * @returns
 */
export default function marginParser(styledProps: StyledProps): {
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
} {
  const mixMargin = mixValueParser(styledProps.margin);
  const mixPadding = mixValueParser(styledProps.padding);
  const styleMap = {
    marginTop: widthParser(styledProps.marginTop || mixMargin.top),
    marginRight: widthParser(styledProps.marginRight || mixMargin.right),
    marginBottom: widthParser(styledProps.marginBottom || mixMargin.bottom),
    marginLeft: widthParser(styledProps.marginLeft || mixMargin.left),
    paddingTop: widthParser(styledProps.paddingTop || mixPadding.top),
    paddingRight: widthParser(styledProps.paddingRight || mixPadding.right),
    paddingBottom: widthParser(styledProps.paddingBottom || mixPadding.bottom),
    paddingLeft: widthParser(styledProps.paddingLeft || mixPadding.left)
  };
  return pickBy(styleMap, (i) => !!identity(i));
}

function mixValueParser(value: WidthType): {
  top: string;
  right: string;
  bottom: string;
  left: string;
} {
  if (value) {
    const valueList = value.split(' ');
    switch (valueList.length) {
      case 1:
        return {
          top: valueList[0],
          right: valueList[0],
          bottom: valueList[0],
          left: valueList[0]
        };

      case 2:
        return {
          top: valueList[0],
          right: valueList[1],
          bottom: valueList[0],
          left: valueList[1]
        };

      case 3:
        return {
          top: valueList[0],
          right: valueList[1],
          bottom: valueList[2],
          left: valueList[0]
        };

      case 4:
        return {
          top: valueList[0],
          right: valueList[1],
          bottom: valueList[2],
          left: valueList[3]
        };
    }
  }

  return {
    top: '',
    right: '',
    bottom: '',
    left: ''
  };
}
