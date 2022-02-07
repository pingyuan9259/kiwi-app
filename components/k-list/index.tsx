import { KText } from '@kiwi/kiwi-app/components';
import KButton from '@kiwi/kiwi-app/components/k-button';
import Kiwi from '@kiwi/kiwi-app/core/kiwi-class';
import propsParser from '@kiwi/kiwi-app/core/supports/props-parser';
import { cloneDeep, concat, map } from 'lodash';
import { Component, Watch } from 'vue-property-decorator';
import KBox from '../k-box';
import KListProps from './props';

/**
 * 下拉框组件
 */
@Component({
  props: propsParser(KListProps)
})
export default class KList<D = {}> extends Kiwi<KListProps<D>> {
  curList: D[] = [];
  curPage: number = 0;
  loadingMore: boolean = false;
  loadComplete: boolean = true;

  created() {
    this.curList = cloneDeep(this.props.list);
  }

  @Watch('props.list') onListChange() {
    this.curList = cloneDeep(this.props.list);
  }

  async handleLoadMore(): Promise<void> {
    const { loadMoreConfig } = this.props;
    if (!loadMoreConfig) {
      return;
    }
    const { total, handler } = loadMoreConfig;
    this.loadingMore = true;
    const moreList = await handler(this.curPage + 1);
    this.loadingMore = false;
    this.curList = concat(cloneDeep(this.curList), moreList);
    this.curPage++;
    if (this.curList.length >= total) {
      this.loadComplete = true;
    }
  }

  handleScroll(event: Event): void {
    const { loadMoreConfig } = this.props;
    if (!loadMoreConfig || this.loadingMore) {
      return;
    }
    const { scrollTop, clientHeight, scrollHeight } = event.target as HTMLElement;
    if (scrollTop + clientHeight < scrollHeight) {
      return;
    }
    this.loadComplete = false;
    this.handleLoadMore();
  }

  render(h): JSX.Element {
    return (
      <KBox
        styledProps={this.customStyledProps}
        width="100%"
        height="100%"
        overflow="scroll-y"
        onScroll={this.handleScroll}
      >
        {this.listRender(h)}

        {this.loadRender(h)}
      </KBox>
    );
  }

  listRender(h): JSX.Element {
    return <KBox>{map(this.curList, this.props.itemRender)}</KBox>;
  }

  loadRender(h): JSX.Element | undefined {
    const { loading, loadMoreConfig } = this.props;
    if (this.loadingMore || loading) {
      return (
        <KText.Comment align="center" padding="margin1">
          加载中...
        </KText.Comment>
      );
    } else if (loadMoreConfig) {
      switch (loadMoreConfig.type) {
        case 'auto':
          return (
            <KText.Comment align="center" padding="margin1">
              {this.loadComplete ? '加载完成' : '加载中...'}
            </KText.Comment>
          );

        case 'manual':
          return (
            <KBox align="center" padding="margin1">
              <KButton type="tag" onClick={() => this.handleLoadMore()}>
                加载更多
              </KButton>
            </KBox>
          );
      }
    } else {
      return undefined;
    }
  }
}
