# VirtualList 虚拟列表 vue3 版本

当列表的数据量很大时，使用虚拟列表呈现内容。

## 组件注册

```js
import VirtualList from 'vue-virtual-list-v3';

app.use(VirtualList);
```

## 在线示例

[1、点我查看完整在线示例](https://stackblitz.com/edit/vue-virtual-list-v3?file=package.json,src%2Fmain.js,src%2FApp.vue)

[2、pageMode live  demo](https://stackblitz.com/edit/vue-virtual-list-v3-ubt81j?file=src%2FApp.vue)

## 基本用法
<br/>

```html
<div class="container">
     <VirtualList class="list-dynamic scroll-touch"
          :data-key="'id'"
          :data-sources="items"
          :estimate-size="80"
          :item-class="'list-item-dynamic'"
          ref="virtualList"
        >
        <template #={source}>
            <div class="item-inner">
                <div class="head">
                    <span># {{ source.index }}</span>
                    <span>{{ source.name }}</span>
                </div>
                <div class="desc">{{ source.desc }}</div>
            </div>
        </template>
      </VirtualList>
</div>
```
items 数据示例：

```json
[
  {
    "index":1,
    "name":"0.8952834111006784",
    "id":"1$d9ec7a",
    "desc":"html5",
    "size":150
  }
]
```

响应式数据配置示例：

```javascript
let items = ref([]); 
const addItem = () => {
    items.value.push({
        index: Math.random() * 1000 + 1,
        name: "Brad" + Math.random() * 1000 + 1,
        id: Date.now(),
        desc: "html5",
        size: 150,
    });
};

```

## 更新日志

1.5.5 版本修复dataSources变化时，列表不更新的问题

1.5.4 版本修复非pageMode模式下数据不更新问题

1.5.2 版本新增pageMode模式

1.5.0 版本新增 `container-class` 属性，用户可以自主设置高度/宽度

## 虚拟列表属性和方法

### 必须的属性

| **<span style="width:150px;display:inline-block;">属性</span>** | **类型**  | **描述**                                                               |
|------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data-key`       | String\|Function | 从`data-sources`中的每个数据对象获取唯一键。或者使用每个数据源调用函数并返回其唯一键。其值在数据源中必须是唯一的，用于标识每一项的尺寸。 |
| `data-sources`   | Array[Object]    | 为列表生成的源数组，每个数组数据必须是一个对象，并且具有唯一的key get或generate for`data key`属性。 |

### 其他属性

  <p></p>
  <table>
    <tr>
      <th><span style="width:150px;display:inline-block;">属性</span></th>
      <th>类型</th>
      <th><span style="width:50px;display:inline-block;">默认值</span></th>
      <th>描述</th>
    </tr>
    <tr>
      <td><code>keeps</code></td>
      <td>Number</td>
      <td>30</td>
      <td>您期望虚拟列表在真实 dom 中保持渲染的项目数量。 </td>
    </tr>
    <tr>
      <td><code>extra-props</code></td>
      <td>Object</td>
      <td>{}</td>
      <td>分配给组件一些不在<code>data-sources</code>中的属性. 注意: <code>index</code> 和 <code>source</code> 都被内部占用了.</td>
    </tr>
    <tr>
      <td><code>estimate-size</code></td>
      <td>Number</td>
      <td>50</td>
      <td>每个<code>Item</code>的估计大小，如果它更接近平均大小，滚动条长度看起来更准确。建议指定自己计算的平均值。</td>
    </tr>
    <tr>
      <td><code>start</code></td>
      <td>Number</td>
      <td>0</td>
      <td>设置滚动位置保持开始索引。</td>
    </tr>
    <tr>
      <td><code>offset</code></td>
      <td>Number</td>
      <td>0</td>
      <td>设置滚动位置保持偏移。 </td>
    </tr>
    <tr>
      <td><code>scroll</code></td>
      <td>Event</td>
      <td></td>
      <td>滚动时触发, 参数 <code>(event, range)</code>。</td>
    </tr>
    <tr>
      <td><code>totop</code></td>
      <td>Event</td>
      <td></td>
      <td>当滚动到顶部或者左边时触发, 无参数。</td>
    </tr>
    <tr>
      <td><code>tobottom</code></td>
      <td>Event</td>
      <td></td>
      <td>当滚动到底部或者右边时触发，无参数。</td>
    </tr>
    <tr>
      <td><code>resized</code></td>
      <td>Event</td>
      <td></td>
      <td>当大小改变时触发 (mounted), 参数 <code>(id, size)</code>。</td>
    </tr>
    <tr>
      <td><code>direction</code></td>
      <td>String</td>
      <td>vertical</td>
      <td>滚动的方向, 可选值为 <code>vertical</code> 和 <code>horizontal</code>。</td>
    </tr>
    <tr>
      <td><code>top-threshold</code></td>
      <td>Number</td>
      <td>0</td>
      <td>发出<code>totop</code> 事件的阈值, 注意多个调用。</td>
    </tr>
    <tr>
      <td><code>bottom-threshold</code></td>
      <td>Number</td>
      <td>0</td>
      <td>发出<code>tobottom</code> 事件的阈值, 注意多个调用。</td>
    </tr>
    <tr>
      <td><code>container-class</code></td>
      <td>String</td>
      <td></td>
      <td>容器的类名，一般需要添加高度/或者宽度来让内容滚动，1.5.0版本新增</td>
    </tr>
    <tr>
      <td><code>root-tag</code></td>
      <td>String</td>
      <td>div</td>
      <td>根节点的名称。</td>
    </tr>
    <tr>
      <td><code>wrap-tag</code></td>
      <td>String</td>
      <td>div</td>
      <td>列表包裹元素名称<code>(role=group)</code>。</td>
    </tr>
    <tr>
      <td><code>wrap-class</code></td>
      <td>String</td>
      <td></td>
      <td>列表包裹元素类名。</td>
    </tr>
    <tr>
      <td><code>wrap-style</code></td>
      <td>Object</td>
      <td>{}</td>
      <td>列表包裹元素内联样式。</td>
    </tr>
    <tr>
      <td><code>item-tag</code></td>
      <td>String</td>
      <td>div</td>
      <td>项目包裹元素名称。</td>
    </tr>
    <tr>
      <td><code>item-class</code></td>
      <td>String</td>
      <td></td>
      <td>项目包裹元素类名。</td>
    </tr>
    <tr>
      <td><code>item-class-add</code></td>
      <td>Function</td>
      <td></td>
      <td>一个函数，您可以将额外的类（字符串）返回给项包装器元素， 参数 <code>(index)</code>。</td>
    </tr>
    <tr>
      <td><code>item-style</code></td>
      <td>Object</td>
      <td>{}</td>
      <td>项目包裹元素内联样式。</td>
    </tr>
    <tr>
      <td><code>item-scoped-slots</code></td>
      <td>Object</td>
      <td>{}</td>
      <td>Item组件的 slot。</td>
    </tr>
  </table>

### 公共方法

  <p></p>
  <table>
    <tr>
      <th><span style="width:150px;display:inline-block;">方法</span></th>
      <th>描述</th>
    </tr>
    <tr>
      <td><code>reset()</code></td>
      <td>将所有状态重置回初始状态。</td>
    </tr>
    <tr>
      <td><code>scrollToBottom()</code></td>
      <td>手动将滚动位置设置为底部。</td>
    </tr>
    <tr>
      <td><code>scrollToIndex(index)</code></td>
      <td>手动将滚动位置设置为指定索引。 </td>
    </tr>
    <tr>
      <td><code>scrollToOffset(offset)</code></td>
      <td>手动将滚动位置设置为指定的偏移量。</td>
    </tr>
    <tr>
      <td><code>getSize(id)</code></td>
      <td>按id（从<code>data-key</code>）获取指定的项目大小。如果已渲染列表中没有该项，则返回<code>undefined</code>。</td>
    </tr>
    <tr>
      <td><code>getSizes()</code></td>
      <td>获取存储（渲染）项的总数。</td>
    </tr>
    <tr>
      <td><code>getOffset()</code></td>
      <td>获取当前滚动偏移量。 </td>
    </tr>
    <tr>
      <td><code>getClientSize()</code></td>
      <td>获取包装器元素客户端视口大小（宽度或高度）。</td>
    </tr>
    <tr>
      <td><code>getScrollSize()</code></td>
      <td>获取所有滚动大小（滚动高度或滚动宽度）。 </td>
    </tr>
  </table>

  ## Props type

### Required props

| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prop&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | **Type**  | **Description**                                                               |
|------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data-key`       | String\|Function | The unique key get from `data-sources` in each data object. Or a function called with each `data-source` and return their unique key. Its value **must be unique** in `data-sources`, it is used for identifying item size. |
| `data-sources`   | Array[Object]    | The source array built for list, each array data must be an object and has an unique key get or generate for `data-key` property.                                                                                           |
### Optional props

  <table>
    <tr>
      <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prop&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><code>keeps</code></td>
      <td>Number</td>
      <td>30</td>
      <td>How many items you are expecting the virtual list to keep rendering in the real dom.</td>
    </tr>
    <tr>
      <td><code>extra-props</code></td>
      <td>Object</td>
      <td>{}</td>
      <td>Extra props assign to item component that are not in <code>data-sources</code>. Notice: <code>index</code> and <code>source</code> are both occupied inner.</td>
    </tr>
    <tr>
      <td><code>estimate-size</code></td>
      <td>Number</td>
      <td>50</td>
      <td>The estimate size of each item, if it is closer to the average size, the scrollbar length looks more accurately. It is <strong>recommended</strong> to assign the average that calculate by yourself.</td>
    </tr>
    <tr>
      <td><code>start</code></td>
      <td>Number</td>
      <td>0</td>
      <td>Setting scroll position stay start index.</td>
    </tr>
    <tr>
      <td><code>offset</code></td>
      <td>Number</td>
      <td>0</td>
      <td>Setting scroll position stay offset.</td>
    </tr>
    <tr>
      <td><code>scroll</code></td>
      <td>Event</td>
      <td></td>
      <td>Emited when scrolling, param <code>(event, range)</code>.</td>
    </tr>
    <tr>
      <td><code>totop</code></td>
      <td>Event</td>
      <td></td>
      <td>Emited when scrolled to top or left, no param.</td>
    </tr>
    <tr>
      <td><code>tobottom</code></td>
      <td>Event</td>
      <td></td>
      <td>Emited when scrolled to bottom or right, no param.</td>
    </tr>
    <tr>
      <td><code>resized</code></td>
      <td>Event</td>
      <td></td>
      <td>Emited when item resized (mounted), param <code>(id, size)</code>.</td>
    </tr>
    <tr>
      <td><code>direction</code></td>
      <td>String</td>
      <td>vertical</td>
      <td>Scroll direction, available values are <code>vertical</code> and <code>horizontal</code></td>
    </tr>
    <tr>
      <td><code>page-mode</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td>Let virtual list using global document to scroll through the list.</td>
    </tr>
    <tr>
      <td><code>top-threshold</code></td>
      <td>Number</td>
      <td>0</td>
      <td>The threshold to emit <code>totop</code> event, attention to multiple calls.</td>
    </tr>
    <tr>
      <td><code>bottom-threshold</code></td>
      <td>Number</td>
      <td>0</td>
      <td>The threshold to emit <code>tobottom</code> event, attention to multiple calls.</td>
    </tr>
    <tr>
      <td><code>root-tag</code></td>
      <td>String</td>
      <td>div</td>
      <td>Root element tag name.</td>
    </tr>
    <tr>
      <td><code>wrap-tag</code></td>
      <td>String</td>
      <td>div</td>
      <td>List wrapper element <code>(role=group)</code> tag name.</td>
    </tr>
    <tr>
      <td><code>wrap-class</code></td>
      <td>String</td>
      <td></td>
      <td>List wrapper element class name.</td>
    </tr>
    <tr>
      <td><code>wrap-style</code></td>
      <td>Object</td>
      <td>{}</td>
      <td>List wrapper element inline style.</td>
    </tr>
    <tr>
      <td><code>item-tag</code></td>
      <td>String</td>
      <td>div</td>
      <td>Item wrapper element <code>(role=item)</code> tag name.</td>
    </tr>
    <tr>
      <td><code>item-class</code></td>
      <td>String</td>
      <td></td>
      <td>Item wrapper element class name.</td>
    </tr>
    <tr>
      <td><code>item-class-add</code></td>
      <td>Function</td>
      <td></td>
      <td>A function that you can return extra class (String) to item wrapper element, param <code>(index)</code>.</td>
    </tr>
    <tr>
      <td><code>item-style</code></td>
      <td>Object</td>
      <td>{}</td>
      <td>Item wrapper element inline style.</td>
    </tr>
    <tr>
      <td><code>item-scoped-slots</code></td>
      <td>Object</td>
      <td>{}</td>
      <td>The <code>$scopedSlots</code> for item component.</td>
    </tr>
    <tr>
      <td><code>header-tag</code></td>
      <td>String</td>
      <td>div</td>
      <td>For using header slot, header slot wrapper element <code>(role=header)</code> tag name.</td>
    </tr>
    <tr>
      <td><code>header-class</code></td>
      <td>String</td>
      <td></td>
      <td>For using header slot, header slot wrapper element class name.</td>
    </tr>
    <tr>
      <td><code>header-style</code></td>
      <td>Object</td>
      <td>{}</td>
      <td>For using header slot, header slot wrapper element inline style.</td>
    </tr>
    <tr>
      <td><code>footer-tag</code></td>
      <td>String</td>
      <td>div</td>
      <td>For using footer slot, footer slot wrapper element <code>(role=footer)</code> tag name.</td>
    </tr>
    <tr>
      <td><code>footer-class</code></td>
      <td>String</td>
      <td></td>
      <td>For using footer slot, footer slot wrapper element class name.</td>
    </tr>
    <tr>
      <td><code>footer-style</code></td>
      <td>Object</td>
      <td>{}</td>
      <td>For using using footer slot, footer slot wrapper element inline style.</td>
    </tr>
  </table>

### Public methods

<details>
  <summary><strong>Usefull public methods</strong></summary>
  <p></p>
  <p>You can call these methods via <code><a href="https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements">ref</a></code>:</p>
  <table>
    <tr>
      <th>Method</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><code>reset()</code></td>
      <td>Reset all state back to initial.</td>
    </tr>
    <tr>
      <td><code>scrollToBottom()</code></td>
      <td>Manual set scroll position to bottom.</td>
    </tr>
    <tr>
      <td><code>scrollToIndex(index)</code></td>
      <td>Manual set scroll position to a designated index.</td>
    </tr>
    <tr>
      <td><code>scrollToOffset(offset)</code></td>
      <td>Manual set scroll position to a designated offset.</td>
    </tr>
    <tr>
      <td><code>getSize(id)</code></td>
      <td>Get the designated item size by id (from <code>data-key</code> value).</td>
    </tr>
    <tr>
      <td><code>getSizes()</code></td>
      <td>Get the total number of stored (rendered) items.</td>
    </tr>
    <tr>
      <td><code>getOffset()</code></td>
      <td>Get current scroll offset.</td>
    </tr>
    <tr>
      <td><code>getClientSize()</code></td>
      <td>Get wrapper element client viewport size (width or height).</td>
    </tr>
    <tr>
      <td><code>getScrollSize()</code></td>
      <td>Get all scroll size (scrollHeight or scrollWidth).</td>
    </tr>
    <tr>
      <td><code>updatePageModeFront()</code></td>
      <td>When using page mode and virtual list root element offsetTop or offsetLeft change, you need call this method manually.</td>
    </tr>
  </table>
</details>
