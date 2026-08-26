/* ===== 通用工具函数 ===== */

const API = {
  baseURL: '/api',

  getToken() {
    return localStorage.getItem('token') || '';
  },

  setToken(token) {
    if (token) {
      localStorage.setItem('token', token);
      document.cookie = `token=${token}; path=/; max-age=604800`;
    } else {
      localStorage.removeItem('token');
      document.cookie = 'token=; path=/; max-age=0';
    }
  },

  async request(path, options = {}) {
    const token = this.getToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${this.baseURL}${path}`, {
      ...options,
      headers: { ...headers, ...options.headers },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '请求失败');
    return data;
  },

  get(path) { return this.request(path, { method: 'GET' }); },
  post(path, body) { return this.request(path, { method: 'POST', body: JSON.stringify(body) }); },
  put(path, body) { return this.request(path, { method: 'PUT', body: JSON.stringify(body) }); },
  del(path) { return this.request(path, { method: 'DELETE' }); },

  async getMe() {
    if (!this.getToken()) return null;
    try {
      const data = await this.get('/auth/me');
      return data.user;
    } catch {
      this.setToken(null);
      return null;
    }
  },
};

/* Toast 通知 */
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
  toast.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* 星空背景生成 */
function initStarfield(container = document.querySelector('.starfield')) {
  if (!container) return;
  const count = 150;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2 + 0.5;
    star.style.width = star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.setProperty('--dur', (Math.random() * 3 + 2) + 's');
    star.style.setProperty('--delay', Math.random() * 5 + 's');
    star.style.setProperty('--max-op', (Math.random() * 0.6 + 0.3).toFixed(2));
    container.appendChild(star);
  }

  // 流星
  for (let i = 0; i < 3; i++) {
    const ss = document.createElement('div');
    ss.className = 'shooting-star';
    ss.style.left = Math.random() * 60 + 10 + '%';
    ss.style.top = Math.random() * 30 + '%';
    ss.style.setProperty('--delay', (Math.random() * 6 + i * 3) + 's');
    container.appendChild(ss);
  }
}

/* 跳转 */
function redirect(path) {
  window.location.href = path;
}

/* HTML 转义 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

/* 格式化日期 */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/* 获取 URL 参数 */
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
