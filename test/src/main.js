import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VirtualList from '../../src/index';

const myApp = createApp(App)
myApp.use(VirtualList)

myApp.mount('#app')
