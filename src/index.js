import VirtualList from './main.js'
// install方法必须有
export default {
    install: function (Vue) {
        Vue.component('VirtualList', VirtualList);
    },
}
