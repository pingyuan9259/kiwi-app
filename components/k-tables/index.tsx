import Kiwi from '@kiwi/kiwi-app/core/kiwi-class';
import propsParser from '@kiwi/kiwi-app/core/supports/props-parser';
import { styledPropsParser } from '@kiwi/kiwi-app/styled';
import themesService from '@kiwi/kiwi-app/styled/themes/themes-service';
import { HyperScriptFunction } from '@kiwi/kiwi-app/types';
import IconType from '@kiwi/kiwi-app/types/components/k-icons';
import { TableBoxInfo } from '@kiwi/kiwi-app/types/components/k-tables';
import { TableColumn } from '@kiwi/kiwi-app/types/components/k-tables/columns';
import { TablePaginationInfo } from '@kiwi/kiwi-app/types/components/k-tables/pagination';
import { chunk, isEmpty, map, pick } from 'lodash';
import { Component } from 'vue-property-decorator';
import KAbsoluteBox from '../k-absolute-box';
import KBox from '../k-box';
import KButton from '../k-button';
import KFlexBox from '../k-flex-box';
import * as KIcon from '../k-icons';
import KInput from '../k-input';
import KModal from '../k-modal';
import KPicture from '../k-picture';
import * as KText from '../k-texts';
import KTablesPagination from './pagination';
import KTablesProps from './props';
import { TableBody, TableDataCell, TableHeadCell, TableRow } from './style';
import {
  getColumnHiddenStatus,
  getElementHeight,
  getPaginationInfo,
  getTableBoxInfo,
  tablePropParser
} from './utils';

/**
 * 表格组件
 *
 */
@Component({
  props: propsParser(KTablesProps),
  watch: {
    data(this: KTables) {
      this.init();
    }
  },
  mounted(this: KTables) {
    if (this.props.data.length) {
      this.init();
    }
    this.initContainer();
  }
})
export default class KTables<Data = any, Ctx = any> extends Kiwi<KTablesProps<Data, Ctx>> {
  /**
   * 表格渲染数据
   */
  private get dataForRender(): Data[] {
    const { pagination, data } = this.props;
    if (pagination && pagination.type === 'local') {
      return chunk(data, pagination.size)[this.paginationInfo.curPage] || [];
    } else {
      return data || [];
    }
  }

  /**
   * 当前分页信息
   */
  private paginationInfo: TablePaginationInfo<Data> = getPaginationInfo();

  /**
   * 当前鼠标悬浮高亮行
   */
  private curHoverIndex = -1;

  /**
   * 表格容器高度
   */
  private containerHeight = '';

  /**
   * 表格加载中
   */
  private tableLoading = true;

  /**
   * 表格固定列信息
   */
  private tableBoxInfo: TableBoxInfo = getTableBoxInfo();

  /**
   * 当前表格提示
   */
  private currentTipsModal: KModal = null;

  /**
   * 初始化
   */
  async init() {
    const { pagination, data } = this.props;
    // 获取表格盒模型信息
    await this.timer.skip();
    this.tableBoxInfo = getTableBoxInfo(this._uid, this.dataForRender.length);

    // 获取当前分页信息
    if (pagination.type === 'remote' && pagination.total !== this.paginationInfo.total) {
      this.paginationInfo = getPaginationInfo(pagination, data.length);
    }

    // 结束loading
    this.tableLoading = false;
  }

  /**
   * 表格容器初始化
   */
  initContainer() {
    // 获取表格容器高度
    this.containerHeight = getElementHeight(this.$el.parentElement);
  }

  /**
   * 手动触发当前表格渲染
   */
  forceUpdate() {
    this.$forceUpdate();
  }

  /**
   * 处理点击分页按钮
   */
  async handlePageChange(page: number) {
    const { handleChange } = this.props.pagination;
    this.tableLoading = true;
    this.paginationInfo.curPage = page;
    handleChange && handleChange(this.paginationInfo);
    await this.timer.wait(200);
    this.tableLoading = false;
  }

  /**
   * 展示单元格提示
   */
  showColumnTips(
    event: MouseEvent,
    tips: (h: HyperScriptFunction) => JSX.Element,
    type: 'mouseover' | 'mouseleave'
  ): void {
    if (themesService.themes.deviceType === 'pc' && tips) {
      if (type === 'mouseover') {
        this.pop({
          target: event.currentTarget,
          arrow: (h) => <KIcon.ArrowFillUp color="default" verticalAlign="-6px" opacity="0.8" />,
          content: (h, modal) => {
            this.currentTipsModal = modal;
            return (
              <KBox
                backgroundColor="default"
                opacity="0.8"
                padding="margin2"
                borderRadius="borderRadius1"
              >
                {tips(h)}
              </KBox>
            );
          }
        });
      } else {
        this.currentTipsModal && this.currentTipsModal.dispose();
      }
    }
  }

  /**
   * 表格单元格工厂
   */
  tableCellFactory(data: Data, index: number, column: TableColumn<Data>, key: string, h) {
    const context = this.props.context || this.$vnode.context;
    const tips = tablePropParser(context, column.tips, data, index, data[key]);

    switch (column.type) {
      default:
      case 'string': {
        const align = tablePropParser(context, column.align, data, index, data[key]) || 'left';
        const value = tablePropParser(context, column.value || data[key], data, index, data[key]);
        return (
          <KText.P
            align={align}
            ellipsis
            onMouseover={(event) => this.showColumnTips(event, tips, 'mouseover')}
            onMouseleave={(event) => this.showColumnTips(event, tips, 'mouseleave')}
          >
            {value}
          </KText.P>
        );
      }

      case 'image': {
        const height = tablePropParser(context, column.height, data, index, data[key]) || '100%';
        const value = tablePropParser(context, data[key], data, index, data[key]);
        return (
          <KPicture
            width="100%"
            height={height}
            file={value}
            onMouseover={(event) => this.showColumnTips(event, tips, 'mouseover')}
            onMouseleave={(event) => this.showColumnTips(event, tips, 'mouseleave')}
          />
        );
      }

      case 'input': {
        return (
          <KInput
            class="table_input"
            placeholder={column.placeholder || '请输入'}
            handleInput={(value) =>
              column.onChange({
                context,
                data,
                index,
                value,
                forceUpdate: this.forceUpdate
              })
            }
            onMouseover={(event) => this.showColumnTips(event, tips, 'mouseover')}
            onMouseleave={(event) => this.showColumnTips(event, tips, 'mouseleave')}
          />
        );
      }

      case 'component': {
        const component = tablePropParser(context, column.component, data, index, data[key]);
        return (
          <KBox
            onMouseover={(event) => this.showColumnTips(event, tips, 'mouseover')}
            onMouseleave={(event) => this.showColumnTips(event, tips, 'mouseleave')}
          >
            {component(h)}
          </KBox>
        );
      }

      case 'buttons': {
        const align = tablePropParser(context, column.align, data, index, data[key]) || 'left';
        return (
          <KFlexBox class="table_buttons_group" align={align}>
            {map(column.configs, (config, configIndex) => {
              const name = tablePropParser(context, config.name, data, index);
              const disabled = tablePropParser(context, config.disabled, data, index);
              const hidden = tablePropParser(context, config.hidden, data, index);
              const type = tablePropParser(context, config.type, data, index);
              const icon = tablePropParser(context, config.icon, data, index);
              const Icon = KIcon[icon as IconType];
              return (
                !hidden && (
                  <KFlexBox>
                    {configIndex !== 0 && (
                      <KText.Comment color={themesService.themes.colorTypes.border}>
                        |
                      </KText.Comment>
                    )}
                    <KButton
                      type="link"
                      paddingTop="0"
                      paddingBottom="0"
                      paddingLeft={configIndex === 0 ? '' : '10px'}
                      paddingRight={configIndex === column.configs.length - 1 ? '' : '10px'}
                      colorType={type || 'highlight'}
                      disabled={disabled}
                      onClick={() =>
                        config.handler({
                          context,
                          data,
                          index,
                          forceUpdate: this.forceUpdate
                        })
                      }
                    >
                      {Icon && <Icon marginRight="5px" />}
                      {name}
                    </KButton>
                  </KFlexBox>
                )
              );
            })}
          </KFlexBox>
        );
      }
    }
  }

  /**
   * 表格工厂函数
   */
  tableFactory(tableType: 'main' | 'fixedLeft' | 'fixedRight', h) {
    const { configuration, columnsScreen, hideHeader, hoverShading } = this.props;
    const { hover } = themesService.themes.colorTypes;
    const headStyleMap = styledPropsParser(themesService.themes.table.head);
    const headMarginLeft = parseInt(headStyleMap.marginLeft || '0');
    const headMarginRight = parseInt(headStyleMap.marginRight || '0');
    return (
      <TableBody
        style={`width: ${tableType === 'main' ? this.tableBoxInfo.tableWidth : '100%'}`}
        hoverShading={hoverShading}
        onMouseout={() => (this.curHoverIndex = -1)}
      >
        {/* 表头 */}
        {!hideHeader && (
          <TableRow class={`k_table_head_${this._uid}`}>
            {map(columnsScreen ? pick(configuration, columnsScreen) : configuration, (column) => {
              const context = this.props.context || this.$vnode.context;
              const align = tablePropParser(context, column.align) || 'left';
              const width = tablePropParser(context, column.width) || 'auto';
              return (
                <TableHeadCell
                  width={width}
                  height={this.tableBoxInfo.headHeight}
                  hidden={getColumnHiddenStatus(tableType, column)}
                >
                  <KFlexBox
                    width={width}
                    horizontal={align}
                    vertical="center"
                    height={`calc(100% - ${headMarginLeft + headMarginRight}px)`}
                    transition={{ duration: 100 }}
                  >
                    {column.name}
                  </KFlexBox>
                </TableHeadCell>
              );
            })}
          </TableRow>
        )}

        {/* 表体 */}
        {map(this.dataForRender, (row, rowIndex) => {
          if (isEmpty(row)) {
            return null;
          }
          return (
            <TableRow
              class={`k_table_row_${this._uid}`}
              onMouseover={() => {
                hoverShading && (this.curHoverIndex = rowIndex);
              }}
            >
              {map(
                columnsScreen ? pick(configuration, columnsScreen) : configuration,
                (column, key) => {
                  const context = this.props.context || this.$vnode.context;
                  const align = tablePropParser(context, column.align) || 'left';
                  const width = tablePropParser(context, column.width) || 'auto';
                  return (
                    <TableDataCell
                      height={this.tableBoxInfo.rowHeights[rowIndex]}
                      align={align}
                      width={width}
                      hidden={getColumnHiddenStatus(tableType, column)}
                    >
                      <KFlexBox
                        horizontal={align}
                        vertical="center"
                        width={width}
                        height={`calc(100% - ${headMarginLeft + headMarginRight}px)`}
                        backgroundColor={
                          (this.curHoverIndex === rowIndex && hover) || 'transparent'
                        }
                      >
                        {this.tableCellFactory(row, rowIndex, column, key, h)}
                      </KFlexBox>
                    </TableDataCell>
                  );
                }
              )}
            </TableRow>
          );
        })}
      </TableBody>
    );
  }

  render(h) {
    const { pagination, data } = this.props;
    const { margin1 } = themesService.themes.widthTypes;
    const cellStyleMap = styledPropsParser(themesService.themes.table.cell);
    const cellMarginLeft = parseInt(cellStyleMap.marginLeft || '0');
    const cellMarginRight = parseInt(cellStyleMap.marginRight || '0');
    return (
      <KBox
        class="k_tables"
        width={`calc(100% + ${cellMarginLeft + cellMarginRight}px)`}
        height={data.length ? 'auto' : this.containerHeight}
        marginLeft={`-${cellMarginLeft}px`}
        marginRight={`-${cellMarginRight}px`}
        styledProps={this.customStyledProps}
      >
        {/* 表格 */}
        <KBox width="100%" opacity={this.tableLoading ? '0.4' : '1'}>
          {/* 主表格 */}
          <KBox
            id={`k_table_main_${this._uid}`}
            overflow="scroll-x"
            marginLeft={this.tableBoxInfo.fixedOffsetLeft}
            marginRight={this.tableBoxInfo.fixedOffsetRight}
          >
            {this.tableFactory('main', h)}
          </KBox>

          {/* 左侧固定列表格 */}
          <KAbsoluteBox
            id={`k_table_fixed_left_${this._uid}`}
            place="top-left"
            shadow
            shadowDirection="right"
          >
            {this.tableFactory('fixedLeft', h)}
          </KAbsoluteBox>

          {/* 右侧固定列表格 */}
          <KAbsoluteBox
            id={`k_table_fixed_right_${this._uid}`}
            place="top-right"
            shadow
            shadowDirection="left"
          >
            {this.tableFactory('fixedRight', h)}
          </KAbsoluteBox>
        </KBox>

        {/* 表格数据为空时 */}
        {!data.length && (
          <KAbsoluteBox place="center" offsetY={30}>
            <KText.P>暂无数据</KText.P>
          </KAbsoluteBox>
        )}

        {/* 分页 */}
        {this.paginationInfo.show && (
          <KTablesPagination
            marginTop="margin1"
            pagination={pagination}
            paginationInfo={this.paginationInfo}
            handlePageChange={this.handlePageChange}
          />
        )}
      </KBox>
    );
  }
}
