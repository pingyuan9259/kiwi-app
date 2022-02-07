import { forEach, forIn, get, isArray, isObject } from 'lodash';
import { getFormService } from '../..';

/**
 * 检查表单校验是否通过
 * @param path
 */
export default function checkFormValidate(path?: string): boolean {
  const formService = getFormService();
  const invalidList = [];
  function checker(obj) {
    forIn(obj, (value) => {
      if (isArray(value)) {
        forEach(value, (item) => {
          checker(item);
        });
      } else if (isObject(value)) {
        if (value['validateType']) {
          invalidList.push(value);
        } else {
          checker(value);
        }
      }
    });
  }
  const validateData = path ? get(formService.validateData, path) : formService.validateData;
  checker(validateData);
  return !invalidList.length;
}
