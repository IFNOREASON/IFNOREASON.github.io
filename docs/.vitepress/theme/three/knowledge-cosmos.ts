/* =====================================================
   Knowledge Cosmos · 知识宇宙 3D 场景
   -----------------------------------------------------
   概念映射（在知识中探索）：
   - 螺旋粒子星云   = 浩瀚的知识海洋（内圈紫 → 外圈金）
   - 中央知识图谱   = 学科知识网络（紫/金/青/玫红 = 分类）
   - 相机穿行公转   = 持续探索未知
   - 鼠标视差/滚轮  = 主动探索的交互手感
   three.js 自托管：docs/public/js/vendor/three.module.min.js
   ===================================================== */

export interface CosmosHandle {
  dispose: () => void
}

export async function initKnowledgeCosmos(container: HTMLElement): Promise<CosmosHandle> {
  // 运行时动态加载自托管 three.js（构建期不解析，部署子路径由 BASE_URL 注入）
  const THREE: any = await import(
    /* @vite-ignore */ `${import.meta.env.BASE_URL}js/vendor/three.module.min.js`
  )

  // ---------- 渲染器（透明背景，透出页面星空） ----------
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setClearColor(0x000000, 0)
  container.appendChild(renderer.domElement)

  // ---------- 场景与相机 ----------
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 200)
  camera.position.set(15, 3, 15)

  // 发光圆点纹理（canvas 径向渐变，替代贴图文件）
  function makeGlowTexture() {
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const ctx = c.getContext('2d')!
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.35, 'rgba(255,255,255,0.6)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
    return new THREE.CanvasTexture(c)
  }
  const glowTex = makeGlowTexture()

  // 主题色（深空紫金）
  const C = {
    purple: new THREE.Color(0x8b5cf6),
    gold:   new THREE.Color(0xfbbf24),
    cyan:   new THREE.Color(0x22d3ee),
    rose:   new THREE.Color(0xf472b6),
  }

  // ---------- 1) 知识星云：螺旋粒子盘 ----------
  const NEBULA_COUNT = 2600
  const np = new Float32Array(NEBULA_COUNT * 3)
  const nc = new Float32Array(NEBULA_COUNT * 3)
  const tmpC = new THREE.Color()
  for (let i = 0; i < NEBULA_COUNT; i++) {
    const r = 3 + Math.pow(Math.random(), 1.4) * 12          // 内密外疏
    const theta = Math.random() * Math.PI * 5 + r * 0.35     // 螺旋臂
    const spread = (1 - r / 15) * 1.15
    np[i * 3]     = Math.cos(theta) * r + (Math.random() - 0.5) * spread
    np[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.55    // 压扁成盘
    np[i * 3 + 2] = Math.sin(theta) * r + (Math.random() - 0.5) * spread
    const t = r / 15
    tmpC.copy(C.purple).lerp(C.gold, t)                       // 紫→金渐变
    if (Math.random() < 0.12) tmpC.copy(Math.random() < 0.5 ? C.cyan : C.rose)
    const dim = 0.45 + Math.random() * 0.55
    nc[i * 3] = tmpC.r * dim; nc[i * 3 + 1] = tmpC.g * dim; nc[i * 3 + 2] = tmpC.b * dim
  }
  const nebulaGeo = new THREE.BufferGeometry()
  nebulaGeo.setAttribute('position', new THREE.BufferAttribute(np, 3))
  nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nc, 3))
  const nebulaMat = new THREE.PointsMaterial({
    size: 0.16, map: glowTex, transparent: true, opacity: 0.9,
    depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
  })
  const nebula = new THREE.Points(nebulaGeo, nebulaMat)

  // ---------- 2) 背景星壳（慢转，纵深感） ----------
  const STAR_COUNT = 1600
  const sp = new Float32Array(STAR_COUNT * 3)
  const sc = new Float32Array(STAR_COUNT * 3)
  for (let i = 0; i < STAR_COUNT; i++) {
    const rr = 26 + Math.random() * 16
    const th = Math.random() * Math.PI * 2
    const ph = Math.acos(2 * Math.random() - 1)
    sp[i * 3]     = rr * Math.sin(ph) * Math.cos(th)
    sp[i * 3 + 1] = rr * Math.sin(ph) * Math.sin(th) * 0.6
    sp[i * 3 + 2] = rr * Math.cos(ph)
    const v = 0.22 + Math.random() * 0.5
    sc[i * 3] = v; sc[i * 3 + 1] = v; sc[i * 3 + 2] = v * 1.08
  }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3))
  starGeo.setAttribute('color', new THREE.BufferAttribute(sc, 3))
  const starMat = new THREE.PointsMaterial({
    size: 0.09, map: glowTex, transparent: true, opacity: 0.85,
    depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
  })
  const stars = new THREE.Points(starGeo, starMat)

  // ---------- 3) 中央知识图谱（节点 + 连线） ----------
  const NODE_COUNT = 86
  const gnp = new Float32Array(NODE_COUNT * 3)
  const gnc = new Float32Array(NODE_COUNT * 3)
  const nodeColors: any[] = []
  for (let i = 0; i < NODE_COUNT; i++) {
    const rr = Math.cbrt(Math.random()) * 4.6
    const th = Math.random() * Math.PI * 2
    const ph = Math.acos(2 * Math.random() - 1)
    gnp[i * 3]     = rr * Math.sin(ph) * Math.cos(th)
    gnp[i * 3 + 1] = rr * Math.sin(ph) * Math.sin(th) * 0.8
    gnp[i * 3 + 2] = rr * Math.cos(ph)
    const pick = Math.random()
    const c = pick < 0.4 ? C.purple : pick < 0.7 ? C.gold : pick < 0.9 ? C.cyan : C.rose
    nodeColors.push(c)
    gnc[i * 3] = c.r; gnc[i * 3 + 1] = c.g; gnc[i * 3 + 2] = c.b
  }
  // 距离阈值连线（知识关联）
  const LINK_DIST = 2.1
  const linkPos: number[] = []
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const dx = gnp[i * 3] - gnp[j * 3]
      const dy = gnp[i * 3 + 1] - gnp[j * 3 + 1]
      const dz = gnp[i * 3 + 2] - gnp[j * 3 + 2]
      if (dx * dx + dy * dy + dz * dz < LINK_DIST * LINK_DIST && Math.random() < 0.35) {
        linkPos.push(gnp[i * 3], gnp[i * 3 + 1], gnp[i * 3 + 2], gnp[j * 3], gnp[j * 3 + 1], gnp[j * 3 + 2])
      }
    }
  }
  const nodeGeo = new THREE.BufferGeometry()
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(gnp, 3))
  nodeGeo.setAttribute('color', new THREE.BufferAttribute(gnc, 3))
  const nodeMat = new THREE.PointsMaterial({
    size: 0.34, map: glowTex, transparent: true, opacity: 1,
    depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
  })
  const nodes = new THREE.Points(nodeGeo, nodeMat)
  const linkGeo = new THREE.BufferGeometry()
  linkGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linkPos), 3))
  const linkMat = new THREE.LineBasicMaterial({
    color: 0x8b5cf6, transparent: true, opacity: 0.2,
    blending: THREE.AdditiveBlending, depthWrite: false,
  })
  const links = new THREE.LineSegments(linkGeo, linkMat)

  const graphGroup = new THREE.Group()
  graphGroup.add(nodes, links)
  graphGroup.position.y = 0.4
  scene.add(nebula, stars, graphGroup)

  // ---------- 交互状态 ----------
  const pointer = { x: 0, y: 0 }
  const target = { x: 0, y: 0 }
  let depth = 15
  let targetDepth = 15
  let cameraAngle = Math.random() * Math.PI * 2
  let visible = true
  let inHero = true // hero 是否在视口（决定滚轮是否生效）

  const onPointerMove = (e: MouseEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1
  }
  const onWheel = (e: WheelEvent) => {
    if (inHero) targetDepth = Math.min(30, Math.max(7, targetDepth + e.deltaY * 0.012))
  }
  const onScroll = () => {
    const rect = container.getBoundingClientRect()
    inHero = rect.bottom > 0 && rect.top < window.innerHeight
  }
  const onResize = () => {
    const w = container.clientWidth, h = container.clientHeight
    if (w === 0 || h === 0) return
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }
  const onVisibility = () => { visible = document.visibilityState === 'visible' }

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('wheel', onWheel, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVisibility)
  onResize(); onScroll()

  // ---------- 动画循环 ----------
  const clock = new THREE.Clock()
  let raf = 0
  const tick = () => {
    raf = requestAnimationFrame(tick)
    if (!visible) return
    const dt = Math.min(clock.getDelta(), 0.05)
    const t = clock.elapsedTime

    // 星云缓转 + 背景星反向缓转
    nebula.rotation.y += dt * 0.03
    nebula.rotation.z = Math.sin(t * 0.05) * 0.06
    stars.rotation.y -= dt * 0.006

    // 知识图谱自转 + 微摆动
    graphGroup.rotation.y += dt * 0.1
    graphGroup.rotation.x = Math.sin(t * 0.12) * 0.12
    graphGroup.rotation.z = Math.cos(t * 0.09) * 0.05
    linkMat.opacity = 0.16 + Math.sin(t * 0.6) * 0.05

    // 相机：公转 + 呼吸 + 滚轮深度（lerp 平滑）
    depth += (targetDepth - depth) * Math.min(dt * 2, 1)
    cameraAngle += dt * 0.045
    const radius = depth + Math.sin(t * 0.22) * 0.8
    target.x += (pointer.x - target.x) * Math.min(dt * 2.2, 1)
    target.y += (pointer.y - target.y) * Math.min(dt * 2.2, 1)

    camera.position.set(
      Math.cos(cameraAngle) * radius + target.x * 2.2,
      2.2 + Math.sin(t * 0.16) * 1.2 - target.y * 1.8,
      Math.sin(cameraAngle) * radius,
    )
    camera.lookAt(target.x * 1.4, -target.y * 0.8 + 0.2, 0)

    renderer.render(scene, camera)
  }
  tick()

  // ---------- 清理 ----------
  return {
    dispose() {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      nebulaGeo.dispose(); nebulaMat.dispose()
      starGeo.dispose(); starMat.dispose()
      nodeGeo.dispose(); nodeMat.dispose()
      linkGeo.dispose(); linkMat.dispose()
      glowTex.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement)
    },
  }
}
