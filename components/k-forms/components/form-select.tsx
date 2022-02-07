import { FunctionComponent } from '@kiwi/kiwi-app/types';
import { FormSelectConfig } from '@kiwi/kiwi-app/types/components/k-forms/item';
import { map } from 'lodash';
import KSelectList from '../../k-select-list';
import { FormItemProps } from '../props';
import updateValue from '../utils/update-value';

/**
 * 选择列表表单子组件
 */
const FormSelect: FunctionComponent<FormItemProps<FormSelectConfig>> = (context) => {
  const { defaultValue, formItemConfig, formItemInfo } = context.props;
  const { listType, multiple, list } = formItemConfig;

  return (
    <KSelectList
      styledProps={context.props}
      type={listType || 'select'}
      list={list}
      defaultValue={defaultValue}
      multiple={multiple}
      width="200px"
      handleSelect={(items) => {
        const value = multiple ? map(items, (i) => i.value) : items[0].value;
        updateValue(value, formItemConfig, formItemInfo);
      }}
    />
  );
};

export default FormSelect;
