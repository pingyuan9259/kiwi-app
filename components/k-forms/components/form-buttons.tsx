import { FunctionComponent } from '@kiwi/kiwi-app/types';
import { FormHandlerParams } from '@kiwi/kiwi-app/types/components/k-forms';
import { FormButtonsConfig } from '@kiwi/kiwi-app/types/components/k-forms/item';
import IconType from '@kiwi/kiwi-app/types/components/k-icons';
import { forEach, map } from 'lodash';
import { KIcon } from '../..';
import KBox from '../../k-box';
import KButton from '../../k-button';
import { FormItemProps } from '../props';
import formInstanceService from '../services/form-instance-service';
import checkFormValidate from '../utils/check-form-validate';
import getParsedConfig from '../utils/get-parsed-config';

/**
 * 按钮组表单子组件
 */
const FormButtons: FunctionComponent<FormItemProps<FormButtonsConfig>> = (context) => {
  const { formItemConfig, formItemInfo } = context.props;
  const { configs } = formItemConfig;

  // 解析按钮组中每个按钮的配置
  forEach(configs, async (config, index) => {
    configs[index] = await getParsedConfig(config, formItemInfo);
  });

  const formHandlerParams: FormHandlerParams = {
    context: formInstanceService.instanceInfoMap[formItemInfo.formUid].context,
    data: formItemInfo.formData,
    index: formItemInfo.formDataIndex,
    key: formItemInfo.itemKey
  };

  return (
    <KBox width="100%" styledProps={context.props}>
      {map(configs, (buttonConfig) => {
        const {
          styledProps,
          name,
          hidden,
          type,
          colorType,
          size,
          display,
          disabled,
          validate,
          validatePath,
          icon
        } = buttonConfig;
        const validatePass = validate ? checkFormValidate(validatePath) : true;
        const Icon = KIcon[icon as IconType];

        return (
          <KButton
            styledProps={styledProps}
            marginRight="margin2"
            lastChild={{ marginRight: '0' }}
            type={type || 'standard'}
            colorType={colorType || 'default'}
            size={size || 'medium'}
            inlineBlock={!display || display === 'inline-block'}
            block={display === 'block'}
            hidden={hidden}
            disabled={disabled || !validatePass}
            onClick={() => {
              buttonConfig.handler(formHandlerParams);
            }}
          >
            {Icon && <Icon marginRight="5px" />}
            {name}
          </KButton>
        );
      })}
    </KBox>
  );
};

export default FormButtons;
