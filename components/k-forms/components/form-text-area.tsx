import { FunctionComponent } from '@kiwi/kiwi-app/types';
import { FormTextAreaConfig } from '@kiwi/kiwi-app/types/components/k-forms/item';
import KTextArea from '../../k-textarea';
import { FormItemProps } from '../props';
import updateValue from '../utils/update-value';

/**
 * 文本输入框表单子组件
 */
const FormTextArea: FunctionComponent<FormItemProps<FormTextAreaConfig>> = (context) => {
  const { defaultValue, formItemConfig, formItemInfo } = context.props;
  const { placeholder, name, maxLength, resize, leftWidget, rightWidget, validateOnInput } =
    formItemConfig;

  return (
    <KTextArea
      styledProps={context.props}
      placeholder={placeholder || `请输入${name || ''}`}
      value={defaultValue}
      maxLength={maxLength}
      resize={resize}
      leftWidget={leftWidget}
      rightWidget={rightWidget}
      handleInput={(value) =>
        updateValue(value, formItemConfig, formItemInfo, { hideInvalidText: !validateOnInput })
      }
      handleChange={(event) =>
        !validateOnInput &&
        updateValue((event.target as HTMLTextAreaElement).value, formItemConfig, formItemInfo)
      }
    />
  );
};

export default FormTextArea;
