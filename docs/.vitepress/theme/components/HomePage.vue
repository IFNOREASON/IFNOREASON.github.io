<script setup lang="ts">
// 访客首页 · 1:1 复刻原 index.html（射手座深空紫金主题）
import { onMounted, onUnmounted, ref } from 'vue'
import { initStarfield } from '../starfield'
import { initKnowledgeCosmos, type CosmosHandle } from '../three/knowledge-cosmos'

const cosmosBg = ref<HTMLElement | null>(null)
let cosmos: CosmosHandle | null = null

// TODO: 假登录（暂未接入后端）——仅本地检查 token，不调用接口
function fakeGetMe() {
  if (!localStorage.getItem('token')) return null
  return { username: 'admin', role: 'admin' }
}

onMounted(() => {
  initStarfield(document.getElementById('starfield'))

  // 3D 知识宇宙：透明背景叠加在 hero 区，失败不阻塞页面
  if (cosmosBg.value) {
    initKnowledgeCosmos(cosmosBg.value)
      .then((h) => { cosmos = h })
      .catch((e) => console.warn('[cosmos] 3D 场景初始化失败:', e))
  }

  const user = fakeGetMe()
  if (user) {
    const heroActions = document.querySelector('.hero-actions')
    if (heroActions) {
      heroActions.innerHTML = `
        <a href="/portal.html" class="btn btn-gold"><i class="fas fa-compass"></i> 进入学习门户</a>
        ${user.role === 'admin' ? `<a href="/admin.html" class="btn btn-ghost"><i class="fas fa-gear"></i> 管理后台</a>` : ''}
      `
    }
    const navRight = document.querySelector('.nav-right')
    if (navRight) {
      navRight.innerHTML = `
        <span style="color:var(--text-muted);font-size:.85rem;"><i class="fas fa-user-astronaut"></i> ${user.username}</span>
        <a href="/portal.html" class="btn btn-primary btn-sm">门户</a>
      `
    }
  }
})

onUnmounted(() => {
  cosmos?.dispose()
  cosmos = null
})
</script>

<template>
  <div class="guest-page">
    <!-- 星空背景 -->
    <div class="starfield" id="starfield"></div>

    <!-- 浮动星座符号 -->
    <div class="archer-symbol top-left">♐</div>
    <div class="archer-symbol bottom-right">♐</div>

    <!-- 星座轮盘 -->
    <svg class="zodiac-wheel" viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="95" stroke="#FBBF24" stroke-width="0.5" />
      <circle cx="100" cy="100" r="75" stroke="#8B5CF6" stroke-width="0.3" />
      <circle cx="100" cy="100" r="55" stroke="#FBBF24" stroke-width="0.3" />
      <circle cx="100" cy="100" r="35" stroke="#8B5CF6" stroke-width="0.3" />
      <line x1="100" y1="5" x2="100" y2="195" stroke="#FBBF24" stroke-width="0.3" />
      <line x1="5" y1="100" x2="195" y2="100" stroke="#FBBF24" stroke-width="0.3" />
      <line x1="30" y1="30" x2="170" y2="170" stroke="#8B5CF6" stroke-width="0.3" />
      <line x1="170" y1="30" x2="30" y2="170" stroke="#8B5CF6" stroke-width="0.3" />
      <text x="100" y="15" text-anchor="middle" fill="#FBBF24" font-size="8" font-family="serif">♐</text>
      <text x="100" y="195" text-anchor="middle" fill="#FBBF24" font-size="8" font-family="serif">♊</text>
      <text x="8" y="103" text-anchor="middle" fill="#FBBF24" font-size="8" font-family="serif">♓</text>
      <text x="192" y="103" text-anchor="middle" fill="#FBBF24" font-size="8" font-family="serif">♑</text>
    </svg>

    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="logo" onclick="location.href='/'">
        <span class="icon">♐</span>
        <span>Sagittarius Nav</span>
      </div>
      <div class="nav-right">
        <a href="/guide/index.html" class="btn btn-ghost btn-sm"><i class="fas fa-book"></i> 文档中心</a>
        <a href="/login.html" class="btn btn-ghost btn-sm">登录</a>
        <a href="/register.html" class="btn btn-gold btn-sm">开启探索</a>
      </div>
    </nav>

    <!-- 英雄区 -->
    <section class="guest-hero">
      <!-- 3D 知识宇宙背景（three.js 渲染，透明叠加） -->
      <div class="cosmos-bg" ref="cosmosBg" aria-hidden="true"></div>
      <div class="hero-badge">♐ SAGITTARIUS · 射手座 · 11.22 - 12.21</div>
      <h1 class="hero-title">探索未知的<br>编程星辰大海</h1>
      <p class="hero-subtitle">自由、冒险、求知若渴 — 射手座的灵魂指引你穿越代码的宇宙。<br>注册登录后，解锁全部学习资源与导航星图。</p>
      <div class="hero-actions">
        <a href="/register.html" class="btn btn-gold"><i class="fas fa-arrow-up-right-from-square"></i> 立即注册</a>
        <a href="/login.html" class="btn btn-ghost"><i class="fas fa-arrow-right-to-bracket"></i> 已有账号，登录</a>
      </div>
      <div class="hero-stats">
        <div class="stat">
          <div class="stat-num">6+</div>
          <div class="stat-label">资源分类</div>
        </div>
        <div class="stat">
          <div class="stat-num">12+</div>
          <div class="stat-label">学习文档</div>
        </div>
        <div class="stat">
          <div class="stat-num">∞</div>
          <div class="stat-label">探索可能</div>
        </div>
      </div>
    </section>

    <!-- 特性区 -->
    <section class="guest-features">
      <h2 class="section-title">为何选择射手导航</h2>
      <p class="section-desc">射手座的精神 — 永不停止探索，永远追求更远的星辰</p>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="icon"><i class="fas fa-compass"></i></div>
          <h3>精准导航</h3>
          <p>精心分类的编程资源，像弓箭手般精准指引你的学习方向，不再在海量信息中迷失。</p>
        </div>
        <div class="feature-card">
          <div class="icon"><i class="fas fa-fire-flame-curved"></i></div>
          <h3>热情驱动</h3>
          <p>火象星座的热忱融入每一篇文档，让学习不再枯燥，让知识燃烧成成长的火焰。</p>
        </div>
        <div class="feature-card">
          <div class="icon"><i class="fas fa-star"></i></div>
          <h3>星辰大海</h3>
          <p>从编程语言到项目实战，从开发工具到技术社区，覆盖开发者成长的完整星空。</p>
        </div>
        <div class="feature-card">
          <div class="icon"><i class="fas fa-shield-halved"></i></div>
          <h3>专属领地</h3>
          <p>注册用户专属内容，你的学习空间不被打扰。私密、专注、属于你自己的探索旅程。</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="guest-cta">
      <h2 class="cta-title">星辰已就位，弓弦已拉满</h2>
      <p class="cta-desc">注册账号，搭弓射箭，开启你的编程探索之旅</p>
      <a href="/register.html" class="btn btn-gold" style="font-size:1.1rem;padding:0.9rem 2.5rem;">
        <i class="fas fa-bullseye"></i> 瞄准目标，出发
      </a>
    </section>
  </div>
</template>

<style scoped>
/* 首页专属样式（沿用原 style.css 同名类，字体图标等依赖全局样式） */
.guest-page {
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
