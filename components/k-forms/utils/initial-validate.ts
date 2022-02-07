import { FormItemInfo } from '@kiwi/kiwi-app/types/components/k-forms';
import { FormValueLike } from '@kiwi/kiwi-app/types/components/k-forms/item';
import { InvalidItem } from '@kiwi/kiwi-app/types/components/k-forms/rule';
import formInstanceService from '../services/form-instance-service';
import syncServiceValidateData from './sync-service-validate-data';
import valueValidate from './value-validate';

/**
 * 初始化校验
 * @description 表单刚加载的时候要提供是否为空的基本校验
 * @param defaultValue
 * @param formItemConfig
 * @param formItemInfo
 */
export default function initialValidate(
  defaultValue: any,
  formItemConfig: FormValueLike,
  formItemInfo: FormItemInfo
): void {
  const { rules, hidden, disabled, styledProps } = formItemConfig;
  const { formUid, formDataIndex, itemKey } = formItemInfo;
  const formInstanceInfo = formInstanceService.instanceInfoMap[formUid];

  // 这里强制初始化一下校验对象
  if (!formInstanceInfo.validateDataList[formDataIndex]) {
    formInstanceInfo.validateDataList[formDataIndex] = {};
  }

  let invalid: InvalidItem | null = null;

  if (rules && rules.required && !(hidden || disabled || (styledProps && styledProps.hidden))) {
    invalid = valueValidate(defaultValue, formItemConfig, formItemInfo);
    if (invalid) {
      invalid.initial = true;
    }
  }

  formInstanceInfo.validateDataList[formDataIndex][itemKey] = invalid;
  syncServiceValidateData(formDataIndex, formInstanceInfo);
}
