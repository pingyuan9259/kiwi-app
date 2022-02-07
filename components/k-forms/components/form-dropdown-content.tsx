import { KDropdown } from '@kiwi/kiwi-app/components';
import { FunctionComponent } from '@kiwi/kiwi-app/types';
import { FormDropdownContentConfig } from '@kiwi/kiwi-app/types/components/k-forms/item';
import { FormItemProps } from '../props';
import updateValue from '../utils/update-value';

/**
 * 下拉内容表单子组件
 */
const FormDropdownContent: FunctionComponent<FormItemProps<FormDropdownContentConfig>> = (
  context
) => {
  const { formItemConfig, formItemInfo } = context.props;
  const { content, placeholder } = formItemConfig;

  return (
    <KDropdown
      styledProps={context.props}
      content={content}
      placeholder={placeholder}
      width="200px"
      handleSelect={(value) => updateValue(value, formItemConfig, formItemInfo)}
    />
  );
};

export default FormDropdownContent;
