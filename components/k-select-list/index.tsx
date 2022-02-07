import Kiwi from '@kiwi/kiwi-app/core/kiwi-class';
import propsParser from '@kiwi/kiwi-app/core/supports/props-parser';
import themesService from '@kiwi/kiwi-app/styled/themes/themes-service';
import { ListItemConfig } from '@kiwi/kiwi-app/types/common';
import IconType from '@kiwi/kiwi-app/types/components/k-icons';
import { cloneDeep, filter, find, findIndex, indexOf, isArray, isEmpty, map } from 'lodash';
import { Component } from 'vue-property-decorator';
import { KIcon } from '..';
import KAbsoluteBox from '../k-absolute-box';
import KBox from '../k-box';
import KCard from '../k-card';
import KListItem from '../k-list-item';
import * as KText from '../k-texts';
import KSelectListProps from './props';

/**
 * 选择列表组件
 */
@Component({
  props: propsParser(KSelectListProps),
  watch: {
    'props.defaultValue'(this: KSelectList) {
      this.init();
    }
  },
  created(this: KSelectList) {
    this.init();
  }
})
export default class KSelectList<Val = any> extends Kiwi<KSelectListProps<Val>> {
  /**
   * 当前激活项
   */
  private curSelects: ListItemConfig[] = [];

  /**
   * 初始化
   */
  private init() {
    const { defaultValue, list, multiple } = this.props;
    if (defaultValue) {
      if (multiple) {
        if (isArray(defaultValue)) {
          this.curSelects = filter(list, (i) => {
            return find(defaultValue, (j) => i.value === j) !== undefined;
          });
        }
      } else {
        const matchSelect = find(list, (i) => i.value === defaultValue);
        if (matchSelect) {
          this.curSelects = [matchSelect];
        }
      }
    }
  }

  /**
   * 更新当前激活项
   */
  private updateCurSelects(item?: ListItemConfig) {
    const { multiple } = this.$props;
    let curSelects = cloneDeep(this.curSelects);
    if (multiple) {
      const matchIndex = findIndex(curSelects, (i) => i.value === item.value);
      if (matchIndex === -1) {
        curSelects.unshift(item);
      } else {
        curSelects.splice(matchIndex, 1);
      }
    } else {
      curSelects = [item];
    }
    this.curSelects = curSelects;
  }

  /**
   * 列表项图标工厂
   */
  private itemIconRender(h, icon: IconType) {
    const { type } = this.props;
    if (icon && indexOf(['checkBox', 'radio'], type) === -1) {
      const Icon = KIcon[icon];
      return <Icon marginRight="5px" />;
    } else {
      return null;
    }
  }

  /**
   * 状态图标工厂
   */
  private statusIconRender(h, active: boolean) {
    const listType = this.props.type || 'select';
    const listItemsThemes = themesService.themes.listItems[listType];
    const icon = active ? listItemsThemes.active.icon : listItemsThemes.icon;
    if (icon) {
      const Icon = KIcon[icon];
      switch (listType) {
        case 'radio':
        case 'checkBox':
          return <Icon marginRight="5px" />;

        case 'select':
          return (
            <KAbsoluteBox right="margin1">
              <Icon />
            </KAbsoluteBox>
          );

        default:
          return null;
      }
    } else {
      return null;
    }
  }

  /**
   * 列表工厂
   */
  private listBodyRender(h) {
    const { list, defaultValue, type, context, multiple, activeScrollIntoView, handleSelect } =
      this.props;
    const _context = context || this.$vnode.context;
    const _type = type || 'select';
    const inlineBlock = indexOf(['tab'], type) > -1;
    const inline = indexOf(['checkBox', 'radio'], type) > -1;
    let curSelects = cloneDeep(this.curSelects);
    return (
      <KBox maxHeight={this.props.maxHeight}>
        {isEmpty(list) && (
          <KBox padding="margin1">
            <KText.Comment align="center">暂无数据</KText.Comment>
          </KBox>
        )}
        {!isEmpty(list) &&
          map(list, (item, index) => {
            let active = false;
            if (curSelects.length) {
              const matchSelect = find(curSelects, (i) => i.value === item.value);
              active = (matchSelect && matchSelect.value) === item.value;
            } else {
              active = defaultValue === item.value;
            }
            if (active && activeScrollIntoView) {
              const $item = document.getElementById(`k_list_item_${item.value}`) as any;
              if ($item) {
                if ($item.scrollIntoViewIfNeeded) {
                  $item.scrollIntoViewIfNeeded();
                } else if ($item.scrollIntoView) {
                  $item.scrollIntoView();
                }
              }
            }
            return (
              <KListItem
                id={`k_list_item_${item.value}`}
                type={_type}
                inlineBlock={inlineBlock || inline}
                firstChild={{
                  marginLeft: (inlineBlock || inline) && '0',
                  paddingLeft: (inlineBlock || inline) && '0'
                }}
                lastChild={{
                  marginRight: (inlineBlock || inline) && '0',
                  paddingRight: (inlineBlock || inline) && '0'
                }}
                active={active}
                disabled={item.disabled}
                clickThrough={!multiple && active}
                onClick={() => {
                  this.updateCurSelects(item);
                  handleSelect && handleSelect.call(_context, this.curSelects);
                }}
              >
                {this.statusIconRender(h, active)}
                {this.itemIconRender(h, item.icon)}
                {item.name}
              </KListItem>
            );
          })}
      </KBox>
    );
  }

  /**
   * 列表类型工厂
   */
  private listRender(h) {
    switch (this.props.type) {
      default:
      case 'select':
        return (
          <KCard height="100%" padding="5px 0">
            {this.listBodyRender(h)}
          </KCard>
        );

      case 'menu':
      case 'subMenu':
      case 'tab':
      case 'checkBox':
      case 'radio':
        return this.listBodyRender(h);
    }
  }

  protected render(h) {
    const { disabled } = this.props;
    return (
      <KBox
        class="k_list"
        clickThrough={disabled}
        opacity={disabled ? '0.6' : '1'}
        styledProps={this.customStyledProps}
      >
        {this.listRender(h)}
      </KBox>
    );
  }
}
