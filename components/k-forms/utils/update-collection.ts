import { FormInstanceInfo } from '@kiwi/kiwi-app/types/components/k-forms';
import { cloneDeep } from 'lodash';
import syncServiceData from '../utils/sync-service-data';
import syncServiceValidateData from '../utils/sync-service-validate-data';

/**
 * 集合子表单结构更新
 * @description 这个方法用于配合表单集合数量的增减
 * @param index
 * @param type
 * @param formInstanceInfo
 */
export default async function updateCollection(
  index: number,
  type: 'add' | 'remove',
  formInstanceInfo: FormInstanceInfo
) {
  const dataList = cloneDeep(formInstanceInfo.dataList || []);
  const validateDataList = cloneDeep(formInstanceInfo.validateDataList || []);
  switch (type) {
    case 'add':
      dataList.splice(index, 0, formInstanceInfo.formType === 'array' ? null : ({} as any));
      validateDataList.splice(index, 0, formInstanceInfo.formType === 'array' ? null : {});
      formInstanceInfo.dataList = dataList;
      formInstanceInfo.validateDataList = validateDataList;
      syncServiceData(index, formInstanceInfo);
      break;

    case 'remove':
      dataList.splice(index, 1);
      validateDataList.splice(index, 1);
      formInstanceInfo.dataList = dataList;
      formInstanceInfo.validateDataList = validateDataList;
      syncServiceData(index, formInstanceInfo);
      syncServiceValidateData(index, formInstanceInfo);
      break;
  }
}
