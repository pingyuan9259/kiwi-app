import KiwiPure from '@kiwi/kiwi-app/core/kiwi-class-pure';
import { timerFn } from '@kiwi/kiwi-app/core/supports/timer';
import { styleMapParser, transformParser } from '@kiwi/kiwi-app/styled';
import themesService from '@kiwi/kiwi-app/styled/themes/themes-service';
import { PositionAttr } from '@kiwi/kiwi-app/types/attributes';
import { KModalColorType, KModalUnionParams } from '@kiwi/kiwi-app/types/components/k-modal';
import { StyledProps } from '@kiwi/kiwi-app/types/styled-props';
import { keys } from 'lodash';
import { Component } from 'vue-property-decorator';
import KAbsoluteBox from '../k-absolute-box';
import KBox from '../k-box';
import KButton from '../k-button';
import KCard from '../k-card';
import KFixedBox from '../k-fixed-box';
import KFlexBox from '../k-flex-box';
import * as KIcon from '../k-icons';
import * as KText from '../k-texts';
import modalService from './service';

/**
 * 模态框组件
 */
@Component
export default class KModal extends KiwiPure {
  private timer = timerFn();
  private params: KModalUnionParams = null;
  public dispose: (success?: boolean) => void = null;

  private getPopPosition(
    target: EventTarget,
    direction: PositionAttr,
    align: 'start' | 'center' | 'end' = 'center'
  ): StyledProps {
    const targetRect = (target as HTMLElement).getBoundingClientRect();
    const { widthTypes, fittingRatio } = themesService.themes;
    const margin2Val = parseInt(widthTypes.margin2) * fittingRatio;
    let alignOffsetX = 0;
    let alignOffsetY = 0;
    let alignTranslate = '0';
    let arrowAlignOffsetX = 0;
    let arrowAlignOffsetY = 0;
    switch (align) {
      case 'start':
        arrowAlignOffsetX = targetRect.width / 2;
        arrowAlignOffsetY = targetRect.height / 2;
        break;
      case 'center':
        alignOffsetX = targetRect.width / 2;
        alignOffsetY = targetRect.height / 2;
        alignTranslate = '-50%';
        break;
      case 'end':
        alignOffsetX = targetRect.width;
        alignOffsetY = targetRect.height;
        alignTranslate = '-100%';
        arrowAlignOffsetX = -(targetRect.width / 2);
        arrowAlignOffsetY = -(targetRect.height / 2);
        break;
    }
    switch (direction) {
      case 'top':
        return {
          top: `${targetRect.top - margin2Val}px`,
          left: `${targetRect.left + alignOffsetX}px`,
          transform: { translate: `${alignTranslate} -100%` },
          arrow: {
            top: `${targetRect.top - margin2Val - 4}px`,
            left: `${targetRect.left + alignOffsetX + arrowAlignOffsetX}px`,
            transform: { rotate: 180 }
          }
        };
      case 'right':
        return {
          top: `${targetRect.top + alignOffsetY}px`,
          left: `${targetRect.right + margin2Val}px`,
          transform: { translate: `0 ${alignTranslate}` },
          arrow: {
            top: `${targetRect.top + alignOffsetY + arrowAlignOffsetY}px`,
            left: `${targetRect.right + margin2Val - 3}px`,
            transform: { rotate: -90 }
          }
        };
      case 'bottom':
        return {
          top: `${targetRect.bottom + margin2Val}px`,
          left: `${targetRect.left + alignOffsetX}px`,
          transform: { translate: `${alignTranslate} 0` },
          arrow: {
            top: `${targetRect.bottom + margin2Val - 4}px`,
            left: `${targetRect.left + alignOffsetX + arrowAlignOffsetX}px`,
            transform: { rotate: 0 }
          }
        };
      case 'left':
        return {
          top: `${targetRect.top + alignOffsetY}px`,
          left: `${targetRect.left - margin2Val}px`,
          transform: { translate: `-100% ${alignTranslate}` },
          arrow: {
            top: `${targetRect.top + alignOffsetY + arrowAlignOffsetY}px`,
            left: `${targetRect.left - margin2Val - 4}px`,
            transform: { rotate: 90 }
          }
        };
    }
  }

  /**
   *  最后一次调整气泡模态框的大小
   */
  private resizePopModal(id: string) {
    const $content = document.getElementById(id);
    if ($content) {
      const { widthTypes, fittingRatio } = themesService.themes;
      const margin2Val = parseInt(widthTypes.margin2) * fittingRatio;
      const { clientWidth, clientHeight } = document.body;
      const contentReact = $content.getBoundingClientRect();
      if (contentReact.top < 0) {
        $content.style.top = `${margin2Val}px`;
      }
      if (contentReact.right > clientWidth) {
        $content.style.right = `${margin2Val}px`;
      }
      if (contentReact.bottom > clientHeight) {
        $content.style.bottom = `${margin2Val}px`;
      }
      if (contentReact.left < 0) {
        $content.style.left = `${margin2Val}px`;
      }
    }
  }

  private iconRender(h, type: KModalColorType) {
    switch (type) {
      case 'danger':
        return <KIcon.CloseCircleFill color="danger" />;
      case 'warning':
        return <KIcon.WarningCircleFill color="warning" />;
      case 'success':
        return <KIcon.CheckCircleFill color="success" />;
      default:
      case 'default':
        return <KIcon.WarningCircleFill color="highlight" />;
    }
  }

  private buttonRender(h, buttonDisplay: ['confirm', 'cancel'?]) {
    const { button, buttonPlace, buttonSize } = themesService.themes.modal.confirm;
    if (button === 'Button') {
      return (
        <KBox padding="margin1" paddingTop="0" align="center" overflow="hidden">
          <KButton
            colorType="highlight"
            size={buttonSize}
            marginLeft={buttonPlace === 'right' && 'margin2'}
            marginRight={buttonPlace !== 'right' && 'margin2'}
            float={buttonPlace === 'center' ? undefined : buttonPlace}
            onClick={() => this.dispose(true)}
          >
            确定
          </KButton>

          {buttonDisplay[1] && (
            <KButton
              size={buttonSize}
              float={buttonPlace === 'center' ? undefined : buttonPlace}
              onClick={() => this.dispose(false)}
            >
              取消
            </KButton>
          )}
        </KBox>
      );
    } else {
      return (
        <KBox padding="margin1" paddingTop="0" align="center" overflow="hidden">
          <KButton
            type="link"
            colorType="highlight"
            marginLeft={buttonPlace === 'right' && 'margin2'}
            marginRight={buttonPlace === 'left' && 'margin2'}
            float={buttonPlace === 'center' ? undefined : buttonPlace}
            onClick={() => this.dispose(true)}
          >
            确定
          </KButton>
          {buttonDisplay[1] && (
            <KButton
              type="link"
              float={buttonPlace === 'center' ? undefined : buttonPlace}
              onClick={() => this.dispose(false)}
            >
              取消
            </KButton>
          )}
        </KBox>
      );
    }
  }

  private contentRender(h, content: string | ((h, modal: KModal) => JSX.Element)) {
    if (typeof content === 'string') {
      return content;
    } else {
      return content.apply(this.params.context, [h, this]);
    }
  }

  private modalContentRender(h) {
    switch (this.params.modalType) {
      case 'toast': {
        this.timer.wait(2000).then(() => this.dispose(true));
        const { content, type } = this.params;
        const { position, width, padding, align } = themesService.themes.modal.toast;
        return (
          <KAbsoluteBox
            maxWidth="80%"
            top={position && position[0]}
            right={position && position[1]}
            bottom={position && position[2]}
            left={position && position[3]}
          >
            <KCard
              paddingTop={padding && padding[0]}
              paddingRight={padding && padding[1]}
              paddingBottom={padding && padding[2]}
              paddingLeft={padding && padding[3]}
            >
              <KFlexBox>
                {this.iconRender(h, type)}
                <KText.P inlineBlock align={align} width={width} ellipsis marginLeft="margin3">
                  {this.contentRender(h, content)}
                </KText.P>
              </KFlexBox>
            </KCard>
          </KAbsoluteBox>
        );
      }

      case 'alert': {
        const { title, content, type } = this.params;
        const { position, width, padding, align } = themesService.themes.modal.confirm;
        return (
          <KAbsoluteBox
            top={position && position[0]}
            right={position && position[1]}
            bottom={position && position[2]}
            left={position && position[3]}
            width={width}
            maxWidth="90%"
            style="pointer-events: auto"
          >
            <KCard
              header={
                <KBox padding="margin1" paddingBottom="0">
                  {typeof title === 'string' && <KText.H3 align={align}>{title}</KText.H3>}
                  {typeof title !== 'string' && title}
                </KBox>
              }
              footer={this.buttonRender(h, ['confirm'])}
              paddingTop={padding && padding[0]}
              paddingRight={padding && padding[1]}
              paddingBottom={padding && padding[2]}
              paddingLeft={padding && padding[3]}
              width="360px"
            >
              <KBox>
                {type && (
                  <KAbsoluteBox place="top-left" top="2px">
                    {this.iconRender(h, type)}
                  </KAbsoluteBox>
                )}
                <KText.P marginLeft={type && '30px'} lineHeight="24px" breakWord align={align}>
                  {this.contentRender(h, content)}
                </KText.P>
              </KBox>
            </KCard>
          </KAbsoluteBox>
        );
      }

      case 'confirm': {
        const { id, title, content, type, blankCloseDisabled } = this.params;
        const { position, width, padding, align } = themesService.themes.modal.confirm;
        return (
          <KBox
            class="modal_transparent_mask"
            width="100%"
            height="100%"
            style="pointer-events: auto"
            onClick={(event) => {
              if (
                blankCloseDisabled ||
                event.target['className'].indexOf('modal_transparent_mask') === -1
              ) {
                return;
              }
              modalService.modalDestroyer(id);
            }}
          >
            <KAbsoluteBox
              top={position && position[0]}
              right={position && position[1]}
              bottom={position && position[2]}
              left={position && position[3]}
              width={width}
              maxWidth="90%"
            >
              <KCard
                header={
                  <KBox padding="margin1" paddingBottom="0">
                    {typeof title === 'string' && <KText.H3 align={align}>{title}</KText.H3>}
                    {typeof title !== 'string' && title}
                  </KBox>
                }
                footer={this.buttonRender(h, ['confirm', 'cancel'])}
                paddingTop={padding && padding[0]}
                paddingRight={padding && padding[1]}
                paddingBottom={padding && padding[2]}
                paddingLeft={padding && padding[3]}
                width="360px"
              >
                <KBox>
                  {type && (
                    <KAbsoluteBox place="top-left" top="2px">
                      {this.iconRender(h, type)}
                    </KAbsoluteBox>
                  )}
                  <KText.P marginLeft={type && '30px'} lineHeight="24px" breakWord align={align}>
                    {this.contentRender(h, content)}
                  </KText.P>
                </KBox>
              </KCard>
            </KAbsoluteBox>
          </KBox>
        );
      }

      case 'pop': {
        const direction = this.params.direction || 'bottom';
        const { target, align, content, arrow: arrowElement } = this.params;
        const { top, right, bottom, left, transform, arrow } = this.getPopPosition(
          target,
          direction,
          align
        );
        const id = `k_modal_pop_${new Date().getTime()}`;
        modalService.addGlobalClickListener();
        this.timer.skip().then(() => this.resizePopModal(id));
        return (
          <KBox width="100%" height="100%">
            {arrowElement && (
              <KAbsoluteBox
                zIndex="widget"
                style={styleMapParser({
                  top: arrow.top,
                  right: arrow.right,
                  bottom: arrow.bottom,
                  left: arrow.left,
                  transform: transformParser({ transform: arrow.transform })
                })}
              >
                {arrowElement(h)}
              </KAbsoluteBox>
            )}
            <KAbsoluteBox
              id={id}
              style={styleMapParser({
                top,
                right,
                bottom,
                left,
                transform: transformParser({ transform }),
                pointerEvents: 'auto'
              })}
            >
              {this.contentRender(h, content)}
            </KAbsoluteBox>
          </KBox>
        );
      }

      case 'modal': {
        const { content, id, blankCloseDisabled } = this.params;
        return (
          <KBox
            class="modal_transparent_mask"
            width="100%"
            height="100%"
            style="pointer-events: auto"
            overflow="scroll-y"
            onClick={(event) => {
              if (
                blankCloseDisabled ||
                event.target['className'].indexOf('modal_transparent_mask') === -1
              ) {
                return;
              }
              modalService.modalDestroyer(id);
            }}
          >
            {this.contentRender(h, content)}
          </KBox>
        );
      }
    }
  }

  protected render(h) {
    return (
      <KFixedBox
        class="k_modal"
        id={`k_modal_${this._uid}`}
        width="100vw"
        height="100vh"
        clickThrough
        transition
        zIndex="panel"
      >
        {/* 遮罩 */}
        {this.params.modalType !== 'toast' &&
          this.params.modalType !== 'pop' &&
          keys(modalService.modalInstance).length < 3 && (
            <KAbsoluteBox
              width="100vw"
              height="100vh"
              backgroundColor="default"
              opacity="0.4"
              style="pointer-events: auto"
            />
          )}
        {/* 模态框 */}
        {this.modalContentRender(h)}
      </KFixedBox>
    );
  }
}
