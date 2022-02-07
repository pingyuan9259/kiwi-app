import { FunctionComponent } from '@kiwi/kiwi-app/types';
import { FormComponentConfig } from '@kiwi/kiwi-app/types/components/k-forms/item';
import { isFunction } from 'lodash';
import KBox from '../../k-box';
import { FormItemProps } from '../props';
import updateValue from '../utils/update-value';

/**
 * 自定义组件表单子组件
 */
const FormComponent: FunctionComponent<FormItemProps<FormComponentConfig>> = (context) => {
  const { formItemConfig, formItemInfo } = context.props;
  const { component } = formItemConfig;

  if (!isFunction(component)) {
    return null;
  }

  return (
    <KBox width="100%" styledProps={context.props}>
      {
        // @ts-ignore
        (() => component(h, (value) => updateValue(value, formItemConfig, formItemInfo)))()
      }
    </KBox>
  );
};

export default FormComponent;
