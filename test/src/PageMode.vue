<template>
  <button @click="addItem">添加一个Item</button>
  <VirtualList
    ref="virtualList"
    :data-key="'id'"
    :data-sources="items"
    :estimate-size="73"
    :page-mode="true"
    containerClass="pagemode-list-dynamic"
  >
    <template #="{ source }">
      <div class="item-inner">
        <div class="head">
          <span># {{ source.index }}</span>
          <span>{{ source.name }}</span>
        </div>
        <div class="desc">
          {{ source.desc }}
        </div>
      </div>
    </template>
  </VirtualList>
</template>
<script setup>
import { ref } from 'vue';

const genUniqueId = (prefix) => {
  return `${prefix}$${Math.random().toString(16).substr(9)}`;
};
const sentence3 = [
  'BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。',
  'IFC(Inline Formatting Contexts)直译为”内联格式化上下文”，IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)',
  'margin 重合，margin 塌陷',
  'css3',
  'html5',
  'es6',
];
const getSentences = () => {
  let index = Math.floor(Math.random() * (sentence3.length - 1));
  return sentence3[index];
};
const sizes = [60, 80, 100, 150, 180, 500];
const items = ref([]);
const TOTAL_COUNT = 3;
let count = TOTAL_COUNT;
while (count--) {
    const index = TOTAL_COUNT - count;
    items.value.push({
        index,
        name: `\n${Math.random()}`,
        id: genUniqueId(index),
        desc: getSentences(),
        size: sizes[Math.floor(Math.random() * 5)]
    });
}

const addItem = () => {
  const currentItems = [...items.value]
  currentItems.push({
        index: Math.random() * 1000 + 1,
        name: "Brad" + Math.random() * 1000 + 1,
        id: Date.now(),
        desc: "html5",
        size: 150,
    });
    console.log(currentItems);
    items.value = currentItems;
};

</script>
<style lang="less">
.pagemode-list-dynamic {
  width: 100%;
  overflow-y: auto;
  .list-item-dynamic {
    display: flex;
    align-items: center;
    padding: 1em;
    border-bottom: 1px solid;
    border-color: lightgray;
    background: rgba(83, 132, 255, 0.06) none repeat scroll 0% 0%;
    border-bottom: 2px solid rgb(255, 255, 255);
  }
}
.item-inner {
  .head {
    font-weight: 500;
    text-align: left;
  }
  span:first-child {
    margin-right: 1em;
  }
  .desc {
    padding-top: 0.5em;
    text-align: justify;
  }
}
.list-horizontal {
  width: 100%;
  height: 300px;
  overflow-x: auto;
  display: flex;
  .wrapper {
    display: flex;
    flex-direction: row;
  }
  .list-item-horizontal {
    border-right: 2px solid rgb(255, 255, 255);
    background: rgba(83, 132, 255, 0.06) none repeat scroll 0% 0%;
  }
}
.item-inner-horizontal {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2em 0;
  .index {
    width: 100%;
    text-align: center;
  }
  .size {
    text-align: right;
    color: darkgray;
    font-size: 16px;
  }
}
.wrap-list {
  display: flex;
}
</style>
