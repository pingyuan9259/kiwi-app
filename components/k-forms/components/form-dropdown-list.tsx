import { KDropdown } from '@kiwi/kiwi-app/components';
import { FunctionComponent } from '@kiwi/kiwi-app/types';
import { FormDropdownListConfig } from '@kiwi/kiwi-app/types/components/k-forms/item';
import { FormItemProps } from '../../k-forms/props';
import updateValue from '../../k-forms/utils/update-value';

/**
 * 下拉列表表单子组件
 */
const FormDropdownList: FunctionComponent<FormItemProps<FormDropdownListConfig>> = (context) => {
  const { defaultValue, formItemConfig, formItemInfo } = context.props;
  const { list, search, enableInput, contentWidth, placeholder, name } = formItemConfig;

  return (
    <KDropdown
      styledProps={context.props}
      list={list}
      defaultValue={defaultValue}
      placeholder={placeholder || `请输入${name || ''}`}
      contentWidth={contentWidth}
      search={search}
      enableInput={enableInput}
      handleSelect={(item) => {
        updateValue(item.value, formItemConfig, formItemInfo);
      }}
    />
  );
};

export default FormDropdownList;
