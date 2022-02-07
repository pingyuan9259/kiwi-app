<img src="https://aiclassadmin.test.17zuoye.net/nature-class/kiwi-logo-h.png" width="190">

Keep Inspiring With Intelligence

# Kiwi前端工程化框架——Kiwi应用（Kiwi App）

> 此时此刻，为 `面向常态化业务开发` 所提供的快速成型解决方案已经展现在您的面前，而 `优雅` 将由kiwi所带来的以下优质体验完美诠释：
> - `渐进式`的系统入侵机制
> - `同源`的前端开发体验
> - 高度的`语义化`
> - 漂亮的`穷举`、`量化`与`抽象`
> - 视图设计、模块化、网络请求等各范畴内的`全方位节藕`
> - 近乎让您忽视其存在的`模块化组件`
> - 精妙的`类型守卫与类型推演`让您拥有代码世界中的驾驶辅助
> - 极低的`心智负担`将带动您的灵感
> - 无处不在的`自动化`将提升您的热情
> - 一切都如此顺应`直觉`，而您已不再是编写代码，而是在把玩一只潘多拉魔盒

<br/>

## 一、Kiwi内核（Kiwi Core）

kiwi设计目标为 `面向常态化业务开发`，所以目前将Vue2作为视图实现内核以降低开发者的认知成本与接入成本。另外，渐进式入侵的设计指标推动实现了内核解藕，旨在未来可实现内核按需独立升级为react、vue更新版本或其他。

### 1、挂载一个DOM节点

我们通过使用Kiwi提供的启动方法——KiwiApp来将kiwi应用挂载到默认的DOM节点或是指定的DOM节点，示例如下：

``` ts
import kiwiApp from '@/kiwi/kiwi-app';
import Container from './container';

kiwiApp({
  // 假设您已经有了一个Kiwi入口组件叫Container
  Container,
  // 这将使KiwiApp将id为root的DOM元素为挂载节点
  // 如果您不填此项，那么将默认挂载id为'app_container'的DOM元素
  // 如果'app_container'不存在，KiwiApp将会为您自动创建
  elementId: 'root', 
});
```

### 2、创建一个Kiwi组件

Kiwi目前使用 `类组件` 的方式完成组件编写，Kiwi会为您提供同名组件基类 `Kiwi`。同样，kiwi也支持组件参数传递，示例如下：

``` tsx
import { Kiwi, propsParser} from '@kiwi/kiwi-app';
import { KBox, KText } from '@kiwi/kiwi-app/components';
import { CreateElement } from 'vue';
import { Component } from 'vue-property-decorator';

/**
 * {页头}示范组件参数类
 */
class HeaderProps extends StyledProps {
  /** 页头文案 */
  readonly headerText: string = 'Kiwi App';
}

/**
 * {页头}示范组件
 *
 */
@Component({
  props: propsParser(HeaderProps),
})
export default class Header extends Kiwi<HeaderProps> {
  protected render(h: CreateElement) {
    const { headerText } = this.props;
    return (
      <KBox class="header">
        <KText.H3>{headerText}</KText.H3>
      </KBox>
    );
  }
}
```

> kiwi的组件生命周期、数据监听等控制类方法建议写在@Component(ComponentOption)装饰器的ComponentOption中，这里参照自动生成的模版所给出的范例即可

> 请有想法的程序员朋友不要因为 `类组件` 而劝退，我们秉承着 `面向常态化开发` 和 `团队范式优先` 原则，在围绕`函数组件`的生态圈提供优雅闭环的范式化解决方案之前，暂时不会推荐使用函数组件编写kiwi应用。但是，`kiwi已经具备编写函数组件的实现条件`

> 更多内容，请您查阅 [kiwi-cli文档——开始开发](https://gitlab.17zuoye.net/yuan.ping/kiwi-cli/tree/v0.1.0/README.md#start_develop)

<br/>

## 二、命令行工具（Kiwi Cli）

> 请查阅 [kiwi-cli文档](https://gitlab.17zuoye.net/yuan.ping/kiwi-cli/tree/v0.1.0/README.md)

<br/>

## 三、模块化组件（Kiwi Modular Components）

> 请查阅 [Kiwi模块化组件文档](https://gitlab.17zuoye.net/yuan.ping/kiwi-app/tree/v0.2/MODCOMPS.md)

<br/>

## 四、样式组件（Kiwi Styled Components）

> 请查阅 [Kiwi样式组件文档](https://gitlab.17zuoye.net/yuan.ping/kiwi-app/tree/v0.2/STYCOMPS.md)
