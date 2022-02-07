import { styledPropsParser, styleMapParser } from '@kiwi/kiwi-app/styled';
import themesService from '@kiwi/kiwi-app/styled/themes/themes-service';
import { FormType } from '@kiwi/kiwi-app/types/components/k-forms';
import { cloneDeep, isEmpty } from 'lodash';

/**
 * 获取表单主题样式
 * @param subForm
 * @param formType
 */
export default function getFormStyle(subForm: boolean, formType: FormType): string {
  const { subFormBoxStyle } = themesService.themes.form;
  let curBoxStyle = undefined;
  switch (formType) {
    default:
    case 'object':
      curBoxStyle = subForm ? cloneDeep(subFormBoxStyle) : {};
      break;

    case 'collection':
      curBoxStyle = cloneDeep(subFormBoxStyle) || {};
      if (isEmpty(curBoxStyle.padding)) curBoxStyle.padding = ['', '', '', ''];
      curBoxStyle.padding = curBoxStyle['collectionPadding'];
      break;

    case 'array':
      curBoxStyle = cloneDeep(subFormBoxStyle) || {};
      break;
  }
  return styleMapParser(styledPropsParser(curBoxStyle));
}
