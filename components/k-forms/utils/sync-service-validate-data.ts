import { FormInstanceInfo } from '@kiwi/kiwi-app/types/components/k-forms';
import { cloneDeep, get, isArray, mergeWith, set } from 'lodash';
import getFormService from '../services/form-service';
import { getFullPath } from './get-full-path';

/**
 * 同步表单服务中的表单校验数据
 * @description 这个方法将表单的本地校验数据更新到对应的表单服务中
 */
export default function syncServiceValidateData(
  index: number,
  formInstanceInfo: FormInstanceInfo
): void {
  const { validateDataList, path, formType } = formInstanceInfo;
  const validatePath = getFullPath({ path, prefix: 'validateData' });
  const formService = getFormService();
  // 深拷贝
  const _formService = cloneDeep(formService);
  // 更新当前校验数据
  if (formType === 'object') {
    const curFormServiceValidateData = get(_formService, validatePath);
    const curValidateData = validateDataList[index];
    set(
      _formService,
      validatePath,
      mergeWith(curFormServiceValidateData, curValidateData, function (oldVal, newVal) {
        if (isArray(oldVal)) {
          return newVal;
        }
      })
    );
  } else {
    set(_formService, validatePath, validateDataList);
  }
  // 触发视图更新
  formService.validateData = _formService.validateData;
}
