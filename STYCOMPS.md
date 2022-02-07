<img src="https://aiclassadmin.test.17zuoye.net/nature-class/kiwi-logo-h.png" width="190">

Keep Inspiring With Intelligence

# Kiwi前端工程化框架——样式组件（Kiwi Styled Components）

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

## 一、简介

kiwi在样式的工程范畴提出 `语义样式组件`、 `样式范式` 、 `主题接入` 与 `主题绿色通道` 四个概念，其中：
  - `语义样式组件`： kiwi为开发者提供满足业务需求的语义化样式组件，并要求开发者使用kiwi组件编写DOM；
  - `样式范式`：kiwi要求开发者使用kiwi组件编写DOM，则每个DOM节点均提供统一的一套 [样式接入API](https://gitlab.17zuoye.net/yuan.ping/kiwi-styled-components/blob/v0.1.0/documents/styled-api.md)。 与此同时，[自建组件继承样式范式](https://gitlab.17zuoye.net/yuan.ping/kiwi-styled-components/blob/v0.1.0/documents/styled-custom-components.md) 同样可以优雅实现；
  - `主题接入`：kiwi实现了主题接入（冷接入），设计意图在于：在开发者收到设计文件之前，即可按照原型图先行介入开发，样式则作为补充缓解收敛于主题系统之中；
  - `主题绿色通道`：主题系统为所有的kiwi组件提供了应用的绿色通道，用以完成无主题的优雅开发和主题的优雅切换。

<br/>

## 二、组件

kiwi为您提供充分且必要并伴有强语义的样式组件，kiwi样式组件按照应用场景分为


### 2.1 盒模型

盒模型样式组件属于基本构件，所以主题系统不会对其进行默认设定。kiwi为您提供如下的盒模型样式组件：


- `KBox`：常规盒模型样式组件
  - 该组件支持 [样式范式](#style_patten)
  - 请参阅 [组件参数Api]()

- `KFlexBox`：弹性盒模型样式组件，详情请参阅 [组件参数Api]()，范例如下：

  >
  ``` html
  <KFlexBox>
    <KParagraph>弹性盒模型</KParagraph>
  </KFlexBox>
  ```

- `KAbsoluteBox`：绝对定位盒模型样式组件，详情请参阅 [组件参数Api]()，范例如下：

  >
  ``` html
  <KAbsoluteBox>
    <KParagraph>绝对定位盒模型</KParagraph>
  </KAbsoluteBox>
  ```

- `KFixedBox`：固定位盒模型样式组件，详情请参阅 [组件参数Api]()，范例如下：

  >
  ``` html
  <KFixedBox>
    <KParagraph>固定位盒模型</KParagraph>
  </KFixedBox>
  ```

<br/>

### 2.2 图标

- kiwi样式组件提供基本的常用图标，详情请参照 [图标示例]()，使用范例如下：

  > 图标的实现为svg，数据源来自 [阿里巴巴图标库]()
  ``` html
  <KButton>
    <IconArrowLeft marginRight="5px" />
    向左
  </KButton>
  ```

<br/>

### 2.3 文字

文字的默认表现形式（字号、字重）由主题给定，您可以通过 [编辑自定义主题]() 来对其进行修改或补充。kiwi为您提供如下的文字样式组件：

- `KHeader1`：一级标题样式组件，详情请参照 [图标示例]()，使用范例如下：

  > 默认设定与主题配置中的 textTypes.header1 相映射
  ``` html
  <KHeader1>我可能是最大的字</KHeader1>
  ```

- `KHeader2`：二级标题样式组件，详情请参照 [图标示例]()，使用范例如下：

  > 默认设定与主题配置中的 textTypes.header2 相映射
  ``` html
  <KHeader2>我是老二</KHeader2>
  ```

- `KHeader3`：三级标题样式组件，详情请参照 [图标示例]()，使用范例如下：

  > 默认设定与主题配置中的 textTypes.header3 相映射
  ``` html
  <KHeader3>上头那个是我哥</KHeader3>
  ```

- `KHeader4`：四级标题样式组件，详情请参照 [图标示例]()，使用范例如下：

  > 默认设定与主题配置中的 textTypes.header4 相映射
  ``` html
  <KHeader4>我是老四</KHeader4>
  ```

- `KHeader5`：五级标题样式组件，详情请参照 [图标示例]()，使用范例如下：

  > 默认设定与主题配置中的 textTypes.header5 相映射
  ``` html
  <KHeader5>我是最小的，但也是个标题</KHeader5>
  ```

- `KParagraph`：正文段落样式组件，详情请参照 [图标示例]()，使用范例如下：

  > 默认设定与主题配置中的 textTypes.paragraph 相映射
  ``` html
  <KParagraph>我是正文</KParagraph>
  ```

- `KComment`：注释样式组件，详情请参照 [图标示例]()，使用范例如下：

  > 默认设定与主题配置中的 textTypes.comment 相映射
  ``` html
  <KComment>我只是个注释</KComment>
  ```

- `KLabel`：标签样式组件，详情请参照 [图标示例]()，使用范例如下：

  > 默认设定与主题配置中的 textTypes.tag 相映射
  ``` html
  <KLabel>我还不如注释呢</KLabel>
  ```

<br/>

### 2.4 部件工具

部件工具的默认表现形式（编剧、圆角、颜色等等）由主题给定，您可以通过 [编辑自定义主题]() 来对其进行修改或补充。kiwi为您提供如下的部件工具样式组件：

- `KButton`：样式组件，详情请参阅 [组件参数Api]()，使用范例如下：

  > 默认设定与主题配置中的 textTypes.buttons 相映射
  ``` html
  <KButton type="highlight">确定</KButton>
  ```
  
- `KButtonLabel`：样式组件，详情请参阅 [组件参数Api]()，使用范例如下：

  > 默认设定与主题配置中的 textTypes.buttons 相映射
  ``` html
  <KButtonLabel disabled>取消</KButtonLabel>
  ```
  
- `KInput`：样式组件，详情请参阅 [组件参数Api]()，使用范例如下：

  > 默认设定与主题配置中的 textTypes.input 相映射
  ``` html
  <KInput value="喵" type="password" />
  ```
  
- `KTextArea`：样式组件，详情请参阅 [组件参数Api]()，使用范例如下：

  > 默认设定与主题配置中的 textTypes.input 相映射
  ``` html
  <KTextArea value="写点啥"></KTextArea>
  ```
  
- `KPicture`：样式组件，详情请参阅 [组件参数Api]()，使用范例如下：

  >
  ``` html
  <KPicture file="./little-picture.png" />
  ```
  
- `KVideo`：样式组件，详情请参阅 [组件参数Api]()，使用范例如下：

  >
  ``` html
  <KVideo src="./little-video.mp4" />
  ```
  
- `KSwitch`：样式组件，详情请参阅 [组件参数Api]()，使用范例如下：

  >
  ``` html
  <KSwitch active=false />
  ```
  
- `KListItem`：样式组件，详情请参阅 [组件参数Api]()，使用范例如下：

  > 默认设定与主题配置中的 textTypes.listItem 相映射
  ``` html
  <KListItem>我是一个列表项</KListItem>
  ```

<br/>

## 三、主题

kiwi的主题功能具备以下特性：
- 可以在项目入口配置属于该入口的主题，如果不配置那么则使用kiwi预置的默认主题
- 主题可以叠加，允许使用多个主题合并的融合主题
- 主题规范了样式所涉猎的泛化概念，并提供了 [样式范式](#style_patten)
- 提供组件节点使用的 [主题绿色通道]()
- 详情请参照 [主题Api](#theme_api)

<br/>

## 四、API

### 4.1 KBox<a id="api_k_box"></a>
``` ts
interface Props {
  /** 向上相对定位 */
  top?: string;
  /** 向右相对定位 */
  right?: string;
  /** 向下相对定位 */
  bottom?: string;
  /** 向左相对定位 */
  left?: string;
}
```
范例如下：
``` html
<KBox
  left="10px" 
  marginTop="20px"
  padding="margin1"
>
  ...
</KBox>
```

### 4.2 KFlexBox<a id="api_k_flex_box"></a>
``` ts
interface Props {
  /** 横向布局，默认'center' */
  horizontal?: 'center' | 'left' | 'right' | 'space-between' | 'space-around';
  /** 纵向布局，默认'center' */
  vertical?: 'center' | 'top' | 'bottom';
  /** 排列，默认'row' */
  direction?: 'row' | 'column' | 'row-revert' | 'column-revert';
  /** 子元素无缝衔接 */
  noSpace?: boolean;
  /** 是否折行 */
  wrap?: boolean;
}
```
范例如下：
``` html
<KFlexBox
  horizontal="left" 
  vertical="top"
  marginTop="10px"
  padding="margin1"
>
  ...
</KFlexBox>
```

### 4.3 KAbsoluteBox<a id="api_k_absolute_box"></a>

### 4.4 KFixedBox<a id="api_k_fixed_box"></a>


### 4.1 KBox<a id="api_k_box"></a>


### 4.1 样式范式<a id="style_patten"></a>

### 4.2 主题绿色通道<a id="theme_tunnel></a>

### 4.3 主题Api<a id="theme_api"></a>
  
