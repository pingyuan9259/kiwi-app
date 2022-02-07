import Kiwi from '@kiwi/kiwi-app/core/kiwi-class';
import propsParser from '@kiwi/kiwi-app/core/supports/props-parser';
import themesService from '@kiwi/kiwi-app/styled/themes/themes-service';
import { filter, find } from 'lodash';
import { Component } from 'vue-property-decorator';
import { ListItemConfig } from '../../types/common';
import KAbsoluteBox from '../k-absolute-box';
import KBox from '../k-box';
import KButton from '../k-button';
import * as KIcon from '../k-icons';
import KInput from '../k-input';
import KModal from '../k-modal';
import KSelectList from '../k-select-list';
import * as KText from '../k-texts';
import KDropdownProps from './props';

/**
 * 下拉框组件
 */
@Component({
  props: propsParser(KDropdownProps),
  watch: {
    // 设计为：defaultValue的优先级 > curSelect优先级，defaultValue发生变化则会改变curSelect的值
    'props.defaultValue': {
      handler(this: KDropdown) {
        const { defaultValue, list } = this.props;
        this.curSelect = find(list, (i) => i.value === defaultValue);
      }
    }
  }
})
export default class KDropdown<Val = any> extends Kiwi<KDropdownProps<Val>> {
  private curSelect: ListItemConfig = null;
  private curModal: KModal = null;
  private listForSearch: ListItemConfig<Val>[] = [];

  private handleClickLabel(event: MouseEvent, curValue: Val, couldDispose?: 'couldDispose') {
    const { list, content, direction, handleSelect } = this.props;
    if (this.curModal) {
      couldDispose && this.curModal.dispose();
    } else {
      if (themesService.themes.deviceType === 'mobile') {
        const _direction = direction || 'top';
        this.modal({
          content: (h, modal) => {
            this.curModal = modal;
            this.$forceUpdate();
            return (
              <KAbsoluteBox
                place={_direction}
                width={_direction === 'top' || _direction === 'bottom' ? '100%' : ''}
                height={_direction === 'left' || _direction === 'right' ? '100%' : ''}
                minWidth="190px"
                maxHeight={_direction === 'top' || _direction === 'bottom' ? '38%' : ''}
                backgroundColor="background"
                paddingTop="margin2"
                paddingBottom="margin2"
                overflow="scroll-y"
                borderBottom={themesService.themes.card.border}
                shadow={themesService.themes.card.shadow}
              >
                {list && (
                  <KSelectList
                    type="menu"
                    list={this.listForSearch.length ? this.listForSearch : list}
                    defaultValue={curValue}
                    handleSelect={(items) => {
                      this.curSelect = items[0];
                      handleSelect && handleSelect(this.curSelect);
                      modal.dispose();
                    }}
                  />
                )}
                {content &&
                  content(h, (value) => {
                    const curSelect = find(list, (i) => i.value === value);
                    this.curSelect = curSelect;
                    this.curModal.dispose();
                    this.$forceUpdate();
                  })}
              </KAbsoluteBox>
            );
          },
          onDispose: () => {
            this.curModal = null;
            this.$forceUpdate();
          }
        });
      } else {
        this.pop({
          direction: direction || 'bottom',
          align: 'start',
          target: event.currentTarget,
          content: (h, modal) => {
            this.curModal = modal;
            this.$forceUpdate();
            if (list) {
              return (
                <KSelectList
                  minWidth={this.props.contentWidth}
                  maxHeight="240px"
                  list={this.listForSearch.length ? this.listForSearch : list}
                  defaultValue={curValue}
                  handleSelect={(items) => {
                    this.curSelect = items[0];
                    handleSelect && handleSelect(this.curSelect);
                    modal.dispose();
                  }}
                />
              );
            }
            if (content) {
              return content(h, (value) => {
                handleSelect && handleSelect(value as any);
                this.curModal.dispose();
              });
            }
          },
          onDispose: () => {
            this.curModal = null;
            this.$forceUpdate();
          }
        });
      }
    }
  }

  private dropdownRender(h) {
    const { list, defaultValue, enableInput, align, search, placeholder, disabled, handleSelect } =
      this.props;
    const curValue = (this.curSelect && this.curSelect.value) || defaultValue;
    const curItem = find(list, (i) => i.value === curValue);
    const curName = curItem ? curItem.name : '';
    if (search) {
      return (
        <KBox
          inlineBlock
          width="100%"
          height="100%"
          opacity={disabled ? '0.6' : '1'}
          clickThrough={disabled}
          onClick={(event) => this.handleClickLabel(event, curValue)}
        >
          <KInput
            value={curName}
            placeholder={placeholder}
            align={align}
            paddingRight="30px"
            width="100%"
            height="100%"
            readonly={!enableInput}
            handleInput={(name) => {
              if (enableInput) {
                handleSelect && handleSelect({ name, value: name });
              }
              if (curName !== name) {
                this.listForSearch = filter(list, (i) => i.name.indexOf(name) > -1);
              } else {
                this.listForSearch = [];
              }
            }}
            handleBlur={(event) => {
              const target = event.currentTarget as HTMLInputElement;
              if (target.value === '' && this.curSelect) {
                this.curSelect = null;
                handleSelect && handleSelect({} as any);
              }
            }}
          />
          <KAbsoluteBox right="margin2">
            <KIcon.ArrowFillDown transition transform={{ rotate: this.curModal ? 180 : 0 }} />
          </KAbsoluteBox>
        </KBox>
      );
    } else {
      return (
        <KButton
          width="100%"
          height="100%"
          type="link"
          disabled={disabled}
          onClick={(event) => this.handleClickLabel(event, curValue, 'couldDispose')}
        >
          <KText.P transition color={this.curModal ? 'highlight' : ''}>
            {curName || placeholder}
            <KIcon.ArrowFillDown
              marginLeft="margin2"
              transition
              transform={{ rotate: this.curModal ? 180 : 0 }}
            />
          </KText.P>
        </KButton>
      );
    }
  }

  protected render(h) {
    return (
      <KBox class="k_dropdown" styledProps={this.customStyledProps}>
        {this.dropdownRender(h)}
      </KBox>
    );
  }
}
