import { FormItemInfo } from '@kiwi/kiwi-app/types/components/k-forms';
import { FormValueLike } from '@kiwi/kiwi-app/types/components/k-forms/item';
import formInstanceService from '../services/form-instance-service';
import syncServiceData from './sync-service-data';
import syncServiceValidateData from './sync-service-validate-data';
import valueValidate from './value-validate';

/**
 * 表单项数据更新
 * @param value
 * @param formItemConfig
 * @param formItemInfo
 */
export default function updateValue(
  value: any,
  formItemConfig: FormValueLike,
  formItemInfo: FormItemInfo,
  options?: UpdateValueOptions
): void {
  const { formUid, formDataIndex, itemKey } = formItemInfo;
  const formInstanceInfo = formInstanceService.instanceInfoMap[formUid];
  const { formType, dataList, validateDataList } = formInstanceInfo;

  {
    if (formType === 'array') {
      dataList[formDataIndex] = value;
    } else {
      dataList[formDataIndex][itemKey] = value;
    }
    syncServiceData(formDataIndex, formInstanceInfo);
  }

  {
    const invalid = valueValidate(value, formItemConfig, formItemInfo);
    if (invalid && options && options.hideInvalidText) {
      invalid.initial = true;
    }
    if (formType === 'array') {
      validateDataList[formDataIndex] = invalid;
    } else {
      validateDataList[formDataIndex] || (validateDataList[formDataIndex] = {});
      validateDataList[formDataIndex][itemKey] = invalid;
    }
    syncServiceValidateData(formDataIndex, formInstanceInfo);
  }
}

interface UpdateValueOptions {
  hideInvalidText: boolean;
}
