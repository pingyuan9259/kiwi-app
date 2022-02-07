import { FormItemInfo } from '@kiwi/kiwi-app/types/components/k-forms';
import { FormValueLike } from '@kiwi/kiwi-app/types/components/k-forms/item';
import formInstanceService from '../services/form-instance-service';
import updateValue from './update-value';

/**
 * 获取表单项默认值
 * @param formItemConfig
 * @param formItemInfo
 * @returns
 */
export default function getDefaultValue(
  formItemConfig: FormValueLike,
  formItemInfo: FormItemInfo
): any {
  const { value: initialValue } = formItemConfig;
  const { formUid, formData, itemKey } = formItemInfo;
  const formInstanceInfo = formInstanceService.instanceInfoMap[formUid];

  // 通过key获取当前配置项的值
  let value = formData[itemKey];

  // 如果当前为子表单，并且表单类型是数组的话，则不存在key的概念
  if (formInstanceInfo.formType === 'array') {
    value = formData;
  }

  // 如果当前配置项存在默认值，并且回溯的值为undefined的时候，则使用默认值，并更新
  if (value === undefined && initialValue !== undefined) {
    value = initialValue;
    updateValue(value, formItemConfig, formItemInfo);
  }

  return value;
}
