import { FormItemContainerProps } from '@kiwi/kiwi-app/components/k-forms/props';
import formInstanceService from '@kiwi/kiwi-app/components/k-forms/services/form-instance-service';
import { FunctionComponent } from '@kiwi/kiwi-app/types';
import KAbsoluteBox from '../../k-absolute-box';
import * as KText from '../../k-texts';

/**
 * 表单项标签组件
 */
const FormLabel: FunctionComponent<FormItemContainerProps> = ({ props }) => {
  const { formItemConfig, formItemInfo } = props;
  const { name, rules } = formItemConfig;

  if (!name) return null;

  const formInstance = formInstanceService.instanceInfoMap[formItemInfo.formUid];
  const { labelLayout, labelWidth, labelColon, labelMarginBottom, labelColor, labelFontSize } =
    formInstance.themeConfig;

  switch (labelLayout) {
    case 'horizontal':
      return (
        <KAbsoluteBox top="margin2" left="0">
          <KText.P align="right" width={labelWidth} paddingRight={labelColon ? '' : '5px'}>
            <KText.P
              inlineBlock
              color="danger"
              marginRight="3px"
              hidden={!(rules && rules.required)}
            >
              *
            </KText.P>
            {`${name}${labelColon ? '：' : ''}`}
          </KText.P>
        </KAbsoluteBox>
      );

    case 'vertical':
      return (
        <KText.P marginBottom={labelMarginBottom} color={labelColor} fontSize={labelFontSize}>
          <KText.P inlineBlock color="danger" marginRight="3px" hidden={!(rules && rules.required)}>
            *
          </KText.P>
          {`${name}${labelColon ? '：' : ''}`}
        </KText.P>
      );
  }
};

export default FormLabel;
