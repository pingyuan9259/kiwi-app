import service from '@kiwi/kiwi-app/core/service';
import { timerFn } from '@kiwi/kiwi-app/core/supports/timer';
import {
  KConfirmParams,
  KModalParams,
  KModalType,
  KModalUnionParams,
  KPopParams,
  KToastParams
} from '@kiwi/kiwi-app/types/components/k-modal';
import { assign, find, forIn } from 'lodash';
import KModal from '.';

/**
 * 模态框服务
 */
const modalService = service({
  /**
   * 模态框映射表
   * @memberof ModalService
   */
  modalInstance: {} as Record<string, ModalRecord>,

  /**
   * 是否存在全局点击监听器
   */
  hasGlobalClickListener: false,

  /**
   * 添加全局点击监听器
   * @memberof ModalService
   */
  addGlobalClickListener() {
    if (this.hasGlobalClickListener) {
      return;
    }
    document.body.addEventListener('click', (event: MouseEvent) => {
      forIn(this.modal, (item) => {
        if (item.params.modalType === 'pop') {
          const eventTarget = event.target as HTMLElement;
          const target = item.params.target as HTMLElement;
          const modalElements = item.instance.$el.childNodes;
          if (target.contains(eventTarget) || find(modalElements, (i) => i.contains(eventTarget))) {
            return;
          }
          this.modalDestroyer(item.params.id);
        }
      });
    });
    this.hasGlobalClickListener = true;
  },

  /**
   * 模态框生成器
   * @param type
   * @param params
   * @param callback
   * @memberof ModalService
   */
  async modalGenerator(params: KModalParams, callback?: (success: boolean) => void): Promise<void> {
    // 创建dom容器
    const $modal = document.createElement('div');
    $modal.id = 'modal_dom_set';
    document.body.appendChild($modal);

    // 创建Vue实例
    const instance = new KModal();
    instance.$set(instance.$data, 'params', params);
    instance.$set(instance.$data, 'dispose', callback);
    instance.$mount('#modal_dom_set');

    // 注册实例记录
    this.modal[params.id] = { instance: instance, params };

    // 模态框展示动画
    const $el = instance.$el as HTMLDivElement;
    $el.style.opacity = '0';
    await timerFn().skip();
    $el.style.opacity = '1';
  },

  /**
   * 模态框销毁器
   * @param type
   * @param id
   * @memberof ModalService
   */
  async modalDestroyer(id: string): Promise<void> {
    // 获取模态框实例
    const instance = this.modal[id].instance;
    const $el = instance.$el as HTMLDivElement;

    // 模态框消失动效
    $el.style.opacity = '0';
    await timerFn().wait(200);

    // 弹框关闭事件
    const onDispose = this.modal[id].params.onDispose;
    onDispose && onDispose.call(this.modal[id].params.context);

    // 销毁模态框实例
    instance.$destroy();
    instance.$el.remove();
    delete this.modal[id];
  },

  /**
   * 展示模态框
   * @param modalType
   * @param arg
   * @returns
   * @author yuan.ping
   */
  showModal(modalType: KModalType, arg: string | KModalUnionParams): Promise<void> {
    const params = modalParamsParser.apply(this, [modalType, arg]);
    return new Promise(async (resolve, reject) => {
      await modalService.modalGenerator(params, (success?: boolean) => {
        modalService.modalDestroyer(params.id);
        success === false ? reject() : resolve();
      });
    });
  },

  /**
   * {吐司}模态框
   * @param arg
   * @memberof Kiwi
   */
  toast(arg: string | KToastParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await modalService.showModal.apply(this, ['toast', arg]);
        resolve();
      } catch (err) {
        console.log(err);
        reject();
      }
    });
  },

  /**
   * {警告}模态框
   * @param arg
   * @memberof Kiwi
   */
  alert(arg: string | KConfirmParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await modalService.showModal.apply(this, ['alert', arg]);
        resolve();
      } catch (err) {
        console.log(err);
        reject();
      }
    });
  },

  /**
   * {确认}模态框
   * @param arg
   * @memberof Kiwi
   */
  confirm(arg: string | KConfirmParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await modalService.showModal.apply(this, ['confirm', arg]);
        resolve();
      } catch (err) {
        console.log(err);
        reject();
      }
    });
  },

  /**
   * {气泡}模态框
   * @param arg
   * @memberof Kiwi
   */
  pop(params: KPopParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await modalService.showModal.apply(this, ['pop', params]);
        resolve();
      } catch (err) {
        reject();
      }
    });
  },

  /**
   * 模态框
   * @param arg
   * @memberof Kiwi
   */
  modal(params: KModalParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await modalService.showModal.apply(this, ['modal', params]);
        resolve();
      } catch (err) {
        console.log(err);
        reject();
      }
    });
  }
});

export default modalService;

/**
 * 模态框参数解析器
 * @param modalType
 * @param arg
 * @returns
 */
function modalParamsParser(
  this: any,
  modalType: any,
  arg: string | KModalUnionParams
): KModalUnionParams {
  let params: KModalUnionParams;
  if (typeof arg === 'string') {
    params = {
      modalType,
      content: arg,
      id: String(new Date().getTime()),
      context: this
    };
  } else {
    params = assign(arg, {
      modalType,
      id: String(new Date().getTime()),
      context: arg.context || this
    });
  }
  return params;
}

/**
 * 模态框记录
 */
interface ModalRecord {
  instance: KModal;
  params: KModalUnionParams;
}
