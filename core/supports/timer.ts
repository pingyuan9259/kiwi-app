/**
 * 计时器工具类
 */
export default class Timer {
  /**
   * 等待时间后执行
   *
   * @param {number} waitTime 等待时间（单位毫秒）
   * @memberof Timer
   */
  public wait(waitTime: number): Promise<void> {
    return new Promise((resolve) => {
      const timerId = window.setTimeout(() => {
        window.clearTimeout(timerId);
        resolve();
      }, waitTime);
    });
  }

  /**
   * 跳过当前执行
   *
   * @memberof Timer
   */
  public async skip(): Promise<void> {
    await this.wait(0);
  }

  /**
   * 反向截流函数
   *
   * @param {Function} callback 回调方法
   * @param {number} waitTime 等待时间（单位毫秒），默认200毫秒
   * @memberof Timer
   */
  public async reverseThrottle(callback: Function, waitTime: number = 200): Promise<void> {
    try {
      await this.throttleTaskCountDown(waitTime);
      // 如果还有新任务进来则阻断流程
      if (this.throttleTaskCount > 1) {
        // 更新任务数
        this.throttleTaskCount--;
        throw new Error('reverseThrottle: cancel');
      }
      // 执行截流回调
      callback();
      // 计数器减1
      this.throttleTaskCount--;
    } catch (err) {
      err.message && console.warn(err.message);
    }
  }

  /**
   * 反向截流计数
   */
  private throttleTaskCount: number = 0;

  /**
   * 反向截流函数的任务计数器
   */
  private throttleTaskCountDown(waitTime: number): Promise<void> {
    return new Promise(async (resolve) => {
      // 更新任务数
      this.throttleTaskCount++;
      await this.wait(waitTime);
      resolve();
    });
  }
}

/**
 * 计时器工厂函数
 *
 */
export function timerFn() {
  return new Timer();
}
