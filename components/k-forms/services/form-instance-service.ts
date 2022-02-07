import service from '@kiwi/kiwi-app/core/service';
import { FormInstanceInfo } from '@kiwi/kiwi-app/types/components/k-forms';

/**
 * 表单实例服务
 */
export default service({
  /** 表单实例信息映射表 */
  instanceInfoMap: {} as { [uid: string]: FormInstanceInfo },
  /** 表单项重置处理器映射 */
  itemResetHandlerMap: {} as {
    [rootPath: string]: {
      [uid: string]: () => void;
    };
  }
});
