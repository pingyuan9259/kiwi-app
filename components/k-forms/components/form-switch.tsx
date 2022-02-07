import { KSwitch } from '@kiwi/kiwi-app/components';
import { FunctionComponent } from '@kiwi/kiwi-app/types';
import { FormSwitchConfig } from '@kiwi/kiwi-app/types/components/k-forms/item';
import { FormItemProps } from '../props';
import updateValue from '../utils/update-value';

/**
 * 开关表单子组件
 */
const FormSwitch: FunctionComponent<FormItemProps<FormSwitchConfig>> = (context) => {
  const { defaultValue, formItemConfig, formItemInfo } = context.props;
  const { switchType, valueConfig, placeholder } = formItemConfig;

  return (
    <KSwitch
      styledProps={context.props}
      type={switchType || 'checkBox'}
      valueConfig={valueConfig}
      defaultValue={defaultValue}
      placeholder={placeholder}
      handleSwitch={(value) => updateValue(value, formItemConfig, formItemInfo)}
    />
  );
};

export default FormSwitch;
