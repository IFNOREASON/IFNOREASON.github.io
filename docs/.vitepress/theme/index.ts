import DefaultTheme from 'vitepress/theme'
import { defineComponent, h, onMounted } from 'vue'
import { initStarfield } from './starfield'
import './style.css'

// 全局布局：在顶部注入星空背景层（与功能页面视觉一致），
// 并在挂载后生成星星（SPA 路由切换时布局不会重建，星星保持）
const SagittariusLayout = defineComponent({
  name: 'SagittariusLayout',
  setup() {
    onMounted(() => {
      initStarfield(document.getElementById('starfield'))
    })
    return () =>
      h(DefaultTheme.Layout, null, {
        'layout-top': () => h('div', { class: 'starfield', id: 'starfield' }),
      })
  },
})

export default {
  extends: DefaultTheme,
  Layout: SagittariusLayout,
}
