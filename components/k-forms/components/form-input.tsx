import { FunctionComponent } from '@kiwi/kiwi-app/types';
import { FormInputConfig } from '@kiwi/kiwi-app/types/components/k-forms/item';
import KInput from '../../k-input';
import { FormItemProps } from '../props';
import updateValue from '../utils/update-value';

/**
 * 输入框表单子组件
 */
const FormInput: FunctionComponent<FormItemProps<FormInputConfig>> = (context) => {
  const { defaultValue, isInvalid, formItemConfig, formItemInfo } = context.props;
  const {
    inputType,
    placeholder,
    maxLength,
    name,
    round,
    leftWidget,
    rightWidget,
    validateOnInput
  } = formItemConfig;

  return (
    <KInput
      styledProps={context.props}
      placeholder={placeholder || `请输入${name || ''}`}
      value={defaultValue}
      invalid={isInvalid}
      maxLength={maxLength}
      type={inputType || 'text'}
      round={round}
      leftWidget={leftWidget}
      rightWidget={rightWidget}
      handleInput={(value) =>
        updateValue(value, formItemConfig, formItemInfo, { hideInvalidText: !validateOnInput })
      }
      handleChange={(event) =>
        !validateOnInput &&
        updateValue((event.target as HTMLInputElement).value, formItemConfig, formItemInfo)
      }
    />
  );
};

export default FormInput;
