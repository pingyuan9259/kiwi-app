import Kiwi from '@kiwi/kiwi-app/core/kiwi-class';
import propsParser from '@kiwi/kiwi-app/core/supports/props-parser';
import themesService from '@kiwi/kiwi-app/styled/themes/themes-service';
import { ListItemType } from '@kiwi/kiwi-app/types/attributes';
import { ListItemConfig } from '@kiwi/kiwi-app/types/common';
import IconType from '@kiwi/kiwi-app/types/components/k-icons';
import { MenuConfiguration } from '@kiwi/kiwi-app/types/components/k-menu';
import { clone, find, indexOf, map, remove } from 'lodash';
import { Component } from 'vue-property-decorator';
import KAbsoluteBox from '../k-absolute-box';
import KBox from '../k-box';
import * as KIcon from '../k-icons';
import KListItem from '../k-list-item';
import KMenuProps from './props';

/**
 * 菜单组件
 *
 */
@Component({
  props: propsParser(KMenuProps)
})
export default class KMenu extends Kiwi<KMenuProps> {
  /**
   * 当前菜单项
   */
  private curMenu: ListItemConfig = null;

  /**
   * 当前展开的子菜单数组
   */
  private curOpenSubMenuArr: string[] = [];

  /**
   * 当前激活菜单项的值
   */
  private get curActiveValue(): string {
    const { configuration, defaultValue } = this.props;
    if (defaultValue !== undefined) {
      return defaultValue;
    } else if (this.curMenu) {
      return this.curMenu.value;
    } else {
      return configuration[0] ? configuration[0].value : '';
    }
  }

  /**
   * 获取子菜单高度
   */
  private getSubMenuHeight(menuConfig: MenuConfiguration[number], id: string): string {
    if (
      this.getSubMenuOpenStatus(menuConfig) ||
      find(menuConfig.subMenu, (i) => i.value === this.curActiveValue)
    ) {
      !this.getSubMenuOpenStatus(menuConfig) && this.curOpenSubMenuArr.push(menuConfig.value);
      const target = document.getElementById(id);
      const height = target && target.clientHeight;
      return height ? `${height}px` : 'auto';
    } else {
      return '0';
    }
  }

  /**
   * 子菜单是否打开
   */
  private getSubMenuOpenStatus(menuConfig: MenuConfiguration[number]) {
    return indexOf(this.curOpenSubMenuArr, menuConfig.value) > -1;
  }

  /**
   * 点击菜单事件
   */
  private handleClickMenu(menuConfig: MenuConfiguration[number]) {
    const { handleSelect } = this.props;
    if (menuConfig.subMenu) {
      const curOpenSubMenuArr = clone(this.curOpenSubMenuArr);
      if (this.getSubMenuOpenStatus(menuConfig)) {
        remove(curOpenSubMenuArr, (i) => i === menuConfig.value);
      } else {
        curOpenSubMenuArr.push(menuConfig.value);
      }
      this.curOpenSubMenuArr = curOpenSubMenuArr;
    } else {
      this.curMenu = menuConfig;
      handleSelect && handleSelect(menuConfig);
    }
  }

  /**
   * 列表项图标工厂
   */
  private itemIconRender(h, icon: IconType) {
    if (icon) {
      const Icon = KIcon[icon];
      return <Icon marginRight="5px" />;
    } else {
      return null;
    }
  }

  /**
   * 菜单工厂
   */
  private menuRender(h, configuration: MenuConfiguration, type: ListItemType) {
    return map(configuration, (item) => {
      const active = !item.subMenu && this.curActiveValue === item.value;
      if (active) {
        const $item = document.getElementById(`k_menu_${item.value}`) as any;
        $item && $item.scrollIntoViewIfNeeded();
      }
      return (
        <KBox>
          {/* 菜单项 */}
          <KListItem
            id={`k_menu_${item.value}`}
            relative
            type={type}
            active={active}
            disabled={item.disabled}
            onClick={() => this.handleClickMenu(item)}
          >
            {this.itemIconRender(h, item.icon)}
            {item.name}
            {item.subMenu && (
              <KAbsoluteBox place="right" right={themesService.themes.widthTypes.margin2}>
                <KBox transition transform={{ rotate: this.getSubMenuOpenStatus(item) ? 180 : 0 }}>
                  <KIcon.ChevronDown />
                </KBox>
              </KAbsoluteBox>
            )}
          </KListItem>

          {/* 子菜单 */}
          {item.subMenu && item.subMenu.length && (
            <KBox
              overflow="hidden"
              height={this.getSubMenuHeight(item, `k_sub_menu_${item.value}`)}
              transition={{ duration: 200, timingFunction: 'ease-in-out' }}
            >
              <KBox id={`k_sub_menu_${item.value}`}>
                {this.menuRender(h, item.subMenu, 'subMenu')}
              </KBox>
            </KBox>
          )}
        </KBox>
      );
    });
  }

  protected render(h) {
    const { configuration } = this.props;
    return (
      <KBox class="k_menu" width="100%" overflow="scroll-y" styledProps={this.customStyledProps}>
        {this.menuRender(h, configuration, 'menu')}
      </KBox>
    );
  }
}
