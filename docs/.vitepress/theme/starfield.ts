/* 星空背景生成（与 docs/public/js/common.js 的 initStarfield 同源） */

export function initStarfield(container: HTMLElement | null): void {
  if (!container) return
  const count = 150
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div')
    star.className = 'star'
    const size = Math.random() * 2 + 0.5
    star.style.width = star.style.height = size + 'px'
    star.style.left = Math.random() * 100 + '%'
    star.style.top = Math.random() * 100 + '%'
    star.style.setProperty('--dur', Math.random() * 3 + 2 + 's')
    star.style.setProperty('--delay', Math.random() * 5 + 's')
    star.style.setProperty('--max-op', (Math.random() * 0.6 + 0.3).toFixed(2))
    container.appendChild(star)
  }

  // 流星
  for (let i = 0; i < 3; i++) {
    const ss = document.createElement('div')
    ss.className = 'shooting-star'
    ss.style.left = Math.random() * 60 + 10 + '%'
    ss.style.top = Math.random() * 30 + '%'
    ss.style.setProperty('--delay', Math.random() * 6 + i * 3 + 's')
    container.appendChild(ss)
  }
}
