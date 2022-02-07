/**
 * 变更比对函数
 * @param object
 * @param newObject
 * @returns
 */
export function difference(object = {}, newObject = {}): boolean {
  return JSON.stringify(object) !== JSON.stringify(newObject);
}
