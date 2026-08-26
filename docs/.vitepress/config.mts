import { defineConfig } from 'vitepress'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

/* =====================================================
   文档分类集中管理
   -----------------------------------------------------
   docs/ 下的一级目录即一个分类分组，组内所有 .md 文件
   自动生成侧边栏。新增文档 = 新建 .md 文件（推荐带
   title 属性），侧边栏与导航自动更新，无需改配置。
   ===================================================== */

const docsRoot = fileURLToPath(new URL('..', import.meta.url))

// 目录名 -> 侧边栏分组显示名（未映射的目录直接用目录名）
const GROUP_LABELS = {
  guide: '使用指南',
  frontend: '前端开发',
  backend: '后端开发',
  tools: '开发工具',
}

/** 读取 md 文件的 title frontmatter，没有则回退为文件名 */
function getTitle(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const m = content.match(/^title:\s*(.+)$/m)
    return m ? m[1].trim() : null
  } catch {
    return null
  }
}

/** 扫描 docs 下所有分类目录，生成侧边栏 */
function buildSidebar() {
  const groups = []

  for (const dir of readdirSync(docsRoot)) {
    if (dir.startsWith('.') || dir === 'public') continue
    const dirPath = join(docsRoot, dir)
    if (!statSync(dirPath).isDirectory()) continue

    const files = readdirSync(dirPath)
      .filter((f) => f.endsWith('.md'))
      .sort((a, b) => {
        // index.md 始终排第一，其余按文件名排序
        if (a === 'index.md') return -1
        if (b === 'index.md') return 1
        return a.localeCompare(b)
      })

    if (files.length === 0) continue

    groups.push({
      text: GROUP_LABELS[dir] || dir,
      collapsed: false,
      items: files.map((f) => {
        const name = f.replace(/\.md$/, '')
        return {
          text: getTitle(join(dirPath, f)) || name,
          link: `/${dir}/${name}`,
        }
      }),
    })
  }

  return groups
}

const sidebar = buildSidebar()

// GitHub Pages 部署路径：CI 通过 BASE_PATH 注入（如 /repo/），本地默认 /
// 由 .github/workflows/deploy.yml 自动按仓库名计算
const base = process.env.BASE_PATH || '/'

// 顶部导航：文档分类 + 功能模块入口
const nav = [
  { text: '首页', link: '/' },
  ...sidebar.map((g) => ({ text: g.text, link: g.items[0].link })),
  { text: '学习门户', link: '/portal.html' },
  { text: '管理后台', link: '/admin.html' },
]

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: '射手座学习导航',
  description: 'Sagittarius Learning Nav · 探索未知的编程星辰大海',

  head: [
    ['link', { rel: 'icon', href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>♐</text></svg>" }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }],
  ],

  themeConfig: {
    logo: '♐',
    siteTitle: 'Sagittarius Nav',
    nav,
    sidebar,
    outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新', formatOptions: { dateStyle: 'medium', timeStyle: 'short' } },
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除查询',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },
  },

  markdown: {
    lineNumbers: true,
  },

  vite: {
    // 让功能页面的 markdown 编辑体验接近现有站点
    server: { fs: { allow: ['..'] } },
  },
})
