import { FunctionComponent } from '@kiwi/kiwi-app/types';
import {
  ArraySubFormConfig,
  CollectionSubFormConfig,
  ObjectSubFormConfig
} from '@kiwi/kiwi-app/types/components/k-forms/item';
import { forIn, isEmpty } from 'lodash';
import KForms from '..';
import { FormItemProps } from '../props';
import formInstanceService from '../services/form-instance-service';
import { getFullPath } from '../utils/get-full-path';

/**
 * 子表单表单子组件
 */
const SubForm: FunctionComponent<FormItemProps> = (context) => {
  const { formItemConfig, formItemInfo } = context.props;
  const { formData, formDataIndex, formUid, itemKey } = formItemInfo;
  const formInstanceInfo = formInstanceService.instanceInfoMap[formUid];
  const { context: formContext, path, formType } = formInstanceInfo;

  switch (formItemConfig.formType) {
    default:
    case 'object': {
      const config = formItemConfig as { [K in keyof ObjectSubFormConfig]: any };
      if (isEmpty(config.configuration)) return null;
      const { name } = config;
      const fullPath = getFullPath({ path, formType, suffix: itemKey });
      return (
        <KForms
          styledProps={context.props}
          subForm
          formType="object"
          configuration={config.configuration}
          name={name}
          context={formContext}
          defaultData={formData[itemKey]}
          path={fullPath}
        />
      );
    }

    case 'collection': {
      const config = formItemConfig as { [K in keyof CollectionSubFormConfig]: any };
      if (isEmpty(config.configuration)) return null;
      const { name, maxLength, minLength, defaultLength, hidden, styledProps } = config;
      const fullPath = getFullPath({ path, formType, suffix: itemKey, index: formDataIndex });
      forIn(config.configuration, (item) => {
        item.hidden = hidden || (styledProps && styledProps.hidden);
      });
      return (
        <KForms
          styledProps={context.props}
          subForm
          formType="collection"
          configuration={config.configuration}
          name={name}
          context={formContext}
          defaultData={formData[itemKey]}
          path={fullPath}
          maxLength={maxLength}
          minLength={minLength}
          defaultLength={defaultLength}
        />
      );
    }

    case 'array': {
      const config = formItemConfig as { [K in keyof ArraySubFormConfig]: any };
      if (isEmpty(config.config)) return null;
      const { name, value, maxLength, minLength, defaultLength, hidden, styledProps } = config;
      const fullPath = getFullPath({ path, formType, suffix: itemKey, index: formDataIndex });
      config.config.hidden = hidden || (styledProps && styledProps.hidden);
      return (
        <KForms
          styledProps={context.props}
          subForm
          formType="array"
          configuration={{ [itemKey]: config.config }}
          name={name}
          context={formContext}
          defaultData={value}
          path={fullPath}
          maxLength={maxLength}
          minLength={minLength}
          defaultLength={defaultLength}
        />
      );
    }
  }
};

export default SubForm;
