import { KIcon } from '@kiwi/kiwi-app/components';
import Kiwi from '@kiwi/kiwi-app/core/kiwi-class';
import propsParser from '@kiwi/kiwi-app/core/supports/props-parser';
import themesService from '@kiwi/kiwi-app/styled/themes/themes-service';
import { TablePagination } from '@kiwi/kiwi-app/types/components/k-tables';
import { TablePaginationInfo } from '@kiwi/kiwi-app/types/components/k-tables/pagination';
import { map } from 'lodash';
import { Component } from 'vue-property-decorator';
import KButton from '../k-button';
import KFlexBox from '../k-flex-box';
import * as KText from '../k-texts';
import { getPaginationButtonsShowStatus, getPaginationDesc } from './utils';

/**
 * 表格分页}子组件参数
 */
class KiwiTablePaginationProps {
  /** 分页配置 */
  readonly pagination: TablePagination<any> = undefined;
  /** 当前分页信息 */
  readonly paginationInfo: TablePaginationInfo<any> = undefined;
  /** 切换分页事件 */
  readonly handlePageChange: (page: number) => void = undefined;
}

/**
 * 表格分页}子组件
 *
 */
@Component({
  props: propsParser(KiwiTablePaginationProps)
})
export default class KTablesPagination extends Kiwi<KiwiTablePaginationProps> {
  /**
   * 分页按钮工厂
   */
  private paginationButtonRender(
    h,
    params: {
      text: number | string | JSX.Element;
      targetPage: number;
      active?: boolean;
      disabled?: boolean;
    }
  ) {
    const { text, targetPage, active, disabled } = params;
    const paginationTheme = themesService.themes.table.pagination;
    switch (paginationTheme.button) {
      case 'Button':
        return (
          <KButton
            size="small"
            colorType={active ? paginationTheme.activeButtonType : paginationTheme.buttonType}
            disabled={disabled}
            clickThrough={active}
            padding="6px 9px"
            marginLeft="8px"
            onClick={() => this.props.handlePageChange(targetPage)}
          >
            {text}
          </KButton>
        );

      case 'ButtonLabel':
        return (
          <KButton
            type="link"
            colorType={active ? paginationTheme.activeButtonType : paginationTheme.buttonType}
            disabled={disabled}
            clickThrough={active}
            padding="6px 12px"
            onClick={() => this.props.handlePageChange(targetPage)}
          >
            {text}
          </KButton>
        );
    }
  }

  /**
   * 页码省略号工厂
   */
  private ellipsisRender(h) {
    switch (themesService.themes.table.pagination.button) {
      case 'Button':
        return (
          <KText.P marginLeft="15px" marginRight="6px">
            ...
          </KText.P>
        );

      case 'ButtonLabel':
        return <KText.P margin="0 10px">...</KText.P>;
    }
  }

  protected render(h) {
    const { pagination, paginationInfo } = this.props;

    return (
      <KFlexBox
        class="k_tables_pagination"
        horizontal="right"
        marginTop="10px"
        styledProps={this.props}
      >
        {/* 左侧控件 */}
        {pagination.leftWidget &&
          pagination.leftWidget({
            curPage: paginationInfo.curPage,
            size: paginationInfo.size,
            total: paginationInfo.total,
            jump: (page: number) => this.props.handlePageChange(page)
          })}

        {/* 分页描述 */}
        {pagination.description && (
          <KText.Comment marginRight="10px">
            {pagination.description === true
              ? getPaginationDesc(paginationInfo)
              : pagination.description}
          </KText.Comment>
        )}

        {/* 上一页 */}
        {this.paginationButtonRender(h, {
          text: <KIcon.ChevronLeft margin="0 -2px" />,
          targetPage: paginationInfo.curPage - 1,
          disabled: paginationInfo.curPage === 0
        })}

        {/* 页码省略号 */}
        {paginationInfo.pageCount > 6 && paginationInfo.curPage > 2 && this.ellipsisRender(h)}

        {/* 页码组 */}
        {map(
          new Array(paginationInfo.pageCount),
          (item, index) =>
            getPaginationButtonsShowStatus(paginationInfo, index) &&
            this.paginationButtonRender(h, {
              text: index + 1,
              targetPage: index,
              active: index === paginationInfo.curPage
            })
        )}

        {/* 页码省略号 */}
        {paginationInfo.pageCount > 6 &&
          paginationInfo.curPage < paginationInfo.pageCount - 3 &&
          this.ellipsisRender(h)}

        {/* 下一页 */}
        {this.paginationButtonRender(h, {
          text: <KIcon.ChevronRight margin="0 -2px" />,
          targetPage: paginationInfo.curPage + 1,
          disabled: paginationInfo.curPage === paginationInfo.pageCount - 1
        })}

        {/* 右侧控件 */}
        {pagination.rightWidget &&
          pagination.rightWidget({
            curPage: paginationInfo.curPage,
            size: paginationInfo.size,
            total: paginationInfo.total,
            jump: (page: number) => this.props.handlePageChange(page)
          })}
      </KFlexBox>
    );
  }
}
