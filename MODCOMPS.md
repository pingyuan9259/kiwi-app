<img src="https://aiclassadmin.test.17zuoye.net/nature-class/kiwi-logo-h.png" width="190">

Keep Inspiring With Intelligence

# Kiwi前端工程化框架——模块化组件（Kiwi Modular Components）

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

## 简介

kiwi在模块化的工程范畴提出 `模块化组件` 的概念，kiwi模块化组件的设计目标为消除非业务开发成本，实现可量化、可复用、可堆叠、可插拔等特性。kiwi模块化组件同时助力kiwi在上下文的工程化范畴实现了贯穿全局的作用域灵活分配。

kiwi模块化组件按照其应用场景分为：`数据交互`、`容器布局`和`部件工具`三类组件集。
> 当您使用kiwi-cli生成项目之后会自动携带kiwi-modular-components的依赖，如果您还没有安装kiwi-cli，那么请查看 [kiwi-cli文档](https://gitlab.17zuoye.net/yuan.ping/kiwi-cli/tree/v0.1.0/README.md)

## 一、数据交互

### 1.1 数据展示——KTables

1.1.1 组件引入

您可以通过Typescript引擎所提供的Import Helper来帮助您引入KTables组件：


### 1.2 数据录入——KForms

1.1.1 组件引入

您可以通过Typescript引擎所提供的Import Helper来帮助您引入KForms组件：

``` jsx
import Kiwi from '@kiwi/kiwi-app/kiwi-class';
import KForms from '@kiwi/kiwi-modular-components/data/k-forms';
import { CreateElement } from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Test extends Kiwi {
  protected render(h: CreateElement) {
    return (
      <KForms />
    );
  }
}
```

## 二、容器布局

### 2.1 卡片容器——KCard

### 2.2 模态框容器——KModal

## 三、部件工具

### 3.1 下拉框——KDropdown

### 3.2 菜单——KMenu

### 3.3 选择列表——KSelectList

### 3.4 标签——KTag
