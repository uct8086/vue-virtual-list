<template>
  <div class="container">
    <div class="toolbar">
      <div class="tabs">
        <button
          :class="['tab-btn', { active: activeTab === 'vertical' }]"
          @click="activeTab = 'vertical'"
        >
          竖向示例
        </button>
        <button
          :class="['tab-btn', { active: activeTab === 'horizontal' }]"
          @click="activeTab = 'horizontal'"
        >
          横向示例
        </button>
      </div>
      <button @click="addItem">添加</button>
    </div>

    <VirtualList
      v-if="activeTab === 'vertical'"
      key="vertical-list"
      ref="verticalList"
      :data-key="'id'"
      :data-sources="items"
      :estimate-size="73"
      containerClass="list-dynamic"
    >
      <template #="{ source }">
        <div class="item-inner" :style="{ height: source.size + 'px' }">
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

    <VirtualList
      v-else
      key="horizontal-list"
      ref="horizontalList"
      :data-key="'id'"
      :data-sources="items"
      :estimate-size="230"
      :size-key="'size'"
      direction="horizontal"
      containerClass="list-horizontal"
      wrapClass="wrapper"
      itemClass="list-item-horizontal"
      :item-style="getHorizontalItemStyle"
    >
      <template #="{ source }">
        <div class="item-inner-horizontal">
          <div class="index">#{{ source.index }}</div>
          <div>{{ source.name }}</div>
          <div class="size">宽度基准: {{ source.size }}px</div>
        </div>
      </template>
    </VirtualList>
  </div>
</template>
<script>
import { ref } from 'vue';
export default {
  setup() {
    const activeTab = ref('vertical');
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
    const TOTAL_COUNT = 300;
    let count = TOTAL_COUNT;
    while (count--) {
      const index = TOTAL_COUNT - count;
      items.value.push({
        index,
        name: `\n${Math.random()}`,
        id: genUniqueId(index),
        desc: getSentences(),
        size: sizes[Math.floor(Math.random() * 5)],
      });
    }

    const addItem = () => {
      const currentItems = [...items.value];
      currentItems.push({
        index: Math.random() * 1000 + 1,
        name: 'Brad' + Math.random() * 1000 + 1,
        id: Date.now(),
        desc: 'html5',
        size: 150,
      });
      console.log(currentItems);
      items.value = currentItems;
    };

    const getHorizontalItemStyle = (index, item) => ({
      width: `${item.size}px`,
    });

    return {
      activeTab,
      addItem,
      getHorizontalItemStyle,
      items,
    };
  },
};
</script>
<style lang="less">
.container {
  border: 1px solid #eee;
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
}
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}
.tabs {
  display: flex;
  gap: 8px;
}
.tab-btn {
  border: 1px solid #cfd7e6;
  background: #f7faff;
  color: #334155;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
.tab-btn.active {
  background: #2563eb;
  color: #fff;
  border-color: #2563eb;
}
.list-dynamic {
  width: 100%;
  height: 500px;
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
  .wrapper {
    display: flex;
    flex-direction: row;
  }
  .list-item-horizontal {
    flex: 0 0 auto;
    border-right: 2px solid rgb(255, 255, 255);
    background: rgba(83, 132, 255, 0.06) none repeat scroll 0% 0%;
  }
}
.item-inner-horizontal {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2em 0;
  box-sizing: border-box;
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
