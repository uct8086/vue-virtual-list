import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import PageMode from './PageMode.vue'
import VirtualList from '../../src/index';

const myApp = createApp(App)
// const myApp = createApp(PageMode)
myApp.use(VirtualList)

myApp.mount('#app')
