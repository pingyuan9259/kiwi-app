import { KText } from '@kiwi/kiwi-app/components';
import { FunctionComponent } from '@kiwi/kiwi-app/types';
import { FormStringConfig } from '@kiwi/kiwi-app/types/components/k-forms/item';
import { FormItemProps } from '../props';

/**
 * 静态文字表单子组件
 */
const FormTextArea: FunctionComponent<FormItemProps<FormStringConfig>> = (context) => {
  const { defaultValue } = context.props;

  return (
    <KText.P padding="margin2 0" styledProps={context.props}>
      {defaultValue || '-'}
    </KText.P>
  );
};

export default FormTextArea;
