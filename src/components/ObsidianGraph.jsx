import { useEffect, useRef } from 'react'
import rawGraph from '../data/vault-graph.json'

// Force-directed physics constants, calibrés pour ~1500 nœuds
const REPULSION   = 420    // faible → nuage dense, plus de points visibles
const SPRING_K    = 0.07
const SPRING_REST = 16     // repos très court → clusters serrés
const SPRING_K_SYN  = 0.014
const SPRING_REST_SYN = 30
const CENTER_G    = 0.006  // gravité plus forte → nuage compact centré
const GROUP_G     = 0.010
const DAMPING     = 0.80
const MAX_V       = 2.5
const PRE_SETTLE  = 100    // plus de settle pour convergence densifiée
const K_NEAREST   = 5      // +1 voisin synthétique → meilleure cohésion

// Palette light mode : tons profonds sur fond crème
const COLORS_LIGHT = [
  '#7a4520', '#1e4d7a', '#265c3a', '#4a2d6e', '#7a2828',
  '#1a5a5a', '#5a4a10', '#2a3a5a', '#5a2a1a', '#1e3a4a',
]
// Palette dark mode : tons clairs désaturés sur fond sombre
const COLORS_DARK = [
  '#c8956a', '#7aafd4', '#8ec4a0', '#a892c8', '#c48a8a',
  '#68b4b4', '#c4a85e', '#8898b8', '#c4a080', '#88a4b4',
]

function isDark() { return document.documentElement.dataset.theme === 'dark' }

const topNodes = rawGraph.nodes
const topEdges = rawGraph.edges

// Map group name → color index (stable across rerenders)
const groupIndex = (() => {
  const map = new Map()
  for (const n of topNodes) {
    if (!map.has(n.group)) map.set(n.group, map.size)
  }
  return map
})()

function nodeColor(n, dark) {
  const idx = groupIndex.get(n.group) ?? 0
  return (dark ? COLORS_DARK : COLORS_LIGHT)[idx % COLORS_LIGHT.length]
}

function buildNodes(W, H) {
  const cx = W / 2, cy = H / 2

  // Assigner un angle de secteur par groupe → pré-clustering par dossier
  const groups = [...new Set(topNodes.map(n => n.group))]
  const groupAngle = new Map(groups.map((g, i) => [g, (i / groups.length) * Math.PI * 2]))

  const R  = Math.min(W, H) * 0.28   // rayon initial compact
  const jitter = R * 0.35             // bruit autour du secteur

  return topNodes.map((n) => {
    const base  = groupAngle.get(n.group) ?? 0
    const angle = base + (Math.random() - 0.5) * (Math.PI * 0.8)
    const r     = R * (0.2 + Math.random() * 0.8)
    const hubTier = n.weight > 0.6 ? 'hub' : n.weight > 0.3 ? 'mid' : 'leaf'
    return {
      id:    n.id,
      label: n.label,
      group: n.group,
      x: cx + Math.cos(angle) * r + (Math.random() - 0.5) * jitter,
      y: cy + Math.sin(angle) * r + (Math.random() - 0.5) * jitter,
      vx: 0, vy: 0,
      r: hubTier === 'hub' ? 4.5 : hubTier === 'mid' ? 2.2 : 1.2,
      tier: hubTier,
      phase: Math.random() * Math.PI * 2,
    }
  })
}

function applyForces(nodes, nodeById, synEdges, W, H) {
  const cx = W / 2, cy = H / 2

  // Node-node repulsion
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j]
      const dx = b.x - a.x, dy = b.y - a.y
      const dist2 = Math.max(dx * dx + dy * dy, 1)
      const dist = Math.sqrt(dist2)
      const force = REPULSION / dist2
      const fx = (dx / dist) * force, fy = (dy / dist) * force
      a.vx -= fx; a.vy -= fy
      b.vx += fx; b.vy += fy
    }
  }

  // Real edge springs (liens wiki réels, ressort raide)
  for (const e of topEdges) {
    const a = nodeById.get(e.source), b = nodeById.get(e.target)
    if (!a || !b) continue
    const dx = b.x - a.x, dy = b.y - a.y
    const dist = Math.max(Math.hypot(dx, dy), 1)
    const force = (dist - SPRING_REST) * SPRING_K
    const fx = (dx / dist) * force, fy = (dy / dist) * force
    a.vx += fx; a.vy += fy
    b.vx -= fx; b.vy -= fy
  }

  // Synthetic proximity springs (voisins même groupe, ressort doux)
  for (const e of synEdges) {
    const a = nodeById.get(e.source), b = nodeById.get(e.target)
    if (!a || !b) continue
    const dx = b.x - a.x, dy = b.y - a.y
    const dist = Math.max(Math.hypot(dx, dy), 1)
    const force = (dist - SPRING_REST_SYN) * SPRING_K_SYN
    const fx = (dx / dist) * force, fy = (dy / dist) * force
    a.vx += fx; a.vy += fy
    b.vx -= fx; b.vy -= fy
  }

  // Group cohesion + gravity + integrate
  const gc = new Map()
  for (const n of nodes) {
    let c = gc.get(n.group)
    if (!c) { c = { x: 0, y: 0, cnt: 0 }; gc.set(n.group, c) }
    c.x += n.x; c.y += n.y; c.cnt++
  }
  for (const c of gc.values()) { c.x /= c.cnt; c.y /= c.cnt }

  for (const n of nodes) {
    const c = gc.get(n.group)
    n.vx += (cx - n.x) * CENTER_G + (c ? (c.x - n.x) * GROUP_G : 0)
    n.vy += (cy - n.y) * CENTER_G + (c ? (c.y - n.y) * GROUP_G : 0)
    n.vx *= DAMPING; n.vy *= DAMPING
    const spd = Math.hypot(n.vx, n.vy)
    if (spd > MAX_V) { n.vx = (n.vx / spd) * MAX_V; n.vy = (n.vy / spd) * MAX_V }
    n.x += n.vx; n.y += n.vy
  }
}

export default function ObsidianGraph() {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -9999, y: -9999, down: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const ATTRACT_R     = 180   // rayon du gros rond (hover)
    const ATTRACT_FORCE = 0.9   // force d'attraction hover
    const ATTRACT_OUTER = 0.08  // attraction faible hors du rond
    const DRAG_R        = 400   // rayon d'influence du drag
    const DRAG_TRANSFER = 0.55  // fraction du delta souris transférée aux nœuds

    let W = 0, H = 0, nodes = null, nodeById = null, adj = null, synEdges = [], raf = null
    let prevMx = -9999, prevMy = -9999
    // zoom / pan state
    let zoom = 1, panX = 0, panY = 0

    // screen coords → world coords
    function toWorld(sx, sy) {
      return { x: (sx - panX) / zoom, y: (sy - panY) / zoom }
    }

    function initCanvas(w, h) {
      W = w; H = h
      zoom = 1; panX = 0; panY = 0
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'

      nodes = buildNodes(W, H)
      nodeById = new Map(nodes.map(n => [n.id, n]))
      adj = new Map(nodes.map(n => [n.id, new Set()]))
      for (const e of topEdges) {
        if (adj.has(e.source)) adj.get(e.source).add(e.target)
        if (adj.has(e.target)) adj.get(e.target).add(e.source)
      }

      // Arêtes synthétiques : K voisins du même groupe par nœud
      synEdges = []
      const byGroup = new Map()
      for (const n of nodes) {
        if (!byGroup.has(n.group)) byGroup.set(n.group, [])
        byGroup.get(n.group).push(n)
      }
      const seenSyn = new Set()
      for (const members of byGroup.values()) {
        for (let i = 0; i < members.length; i++) {
          const a = members[i]
          const sorted = members
            .filter((_, j) => j !== i)
            .map(b => ({ b, d: (b.x - a.x) ** 2 + (b.y - a.y) ** 2 }))
            .sort((x, y) => x.d - y.d)
            .slice(0, K_NEAREST)
          for (const { b } of sorted) {
            const key = a.id < b.id ? `${a.id}→${b.id}` : `${b.id}→${a.id}`
            if (!seenSyn.has(key)) {
              seenSyn.add(key)
              synEdges.push({ source: a.id, target: b.id })
            }
          }
        }
      }

      for (let i = 0; i < PRE_SETTLE; i++) applyForces(nodes, nodeById, synEdges, W, H)
    }

    function getPos(e) {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    function onMouseMove(e) {
      const { x, y } = getPos(e)
      mouseRef.current.x = x; mouseRef.current.y = y
    }
    function onMouseDown(e) {
      const { x, y } = getPos(e)
      mouseRef.current.x = x; mouseRef.current.y = y; mouseRef.current.down = true
      prevMx = x; prevMy = y
      canvas.style.cursor = 'grabbing'
    }
    function onMouseUp()    { mouseRef.current.down = false; canvas.style.cursor = 'grab' }
    function onMouseLeave() { mouseRef.current = { x: -9999, y: -9999, down: false }; prevMx = -9999; prevMy = -9999; canvas.style.cursor = 'grab' }

    function onWheel(e) {
      if (!e.ctrlKey) return   // pinch uniquement (pas scroll normal)
      e.preventDefault()
      const { x, y } = getPos(e)
      const factor = e.deltaY < 0 ? 1.08 : 0.93
      const newZoom = Math.max(0.2, Math.min(6, zoom * factor))
      // zoom centré sur la position du pinch
      panX = x - (x - panX) * (newZoom / zoom)
      panY = y - (y - panY) * (newZoom / zoom)
      zoom = newZoom
    }

    canvas.addEventListener('mousemove',  onMouseMove)
    canvas.addEventListener('mousedown',  onMouseDown)
    canvas.addEventListener('mouseup',    onMouseUp)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('wheel',      onWheel, { passive: false })

    function draw() {
      if (!nodes) { raf = requestAnimationFrame(draw); return }

      applyForces(nodes, nodeById, synEdges, W, H)

      // Coords souris en espace écran → monde
      const sx = mouseRef.current.x, sy = mouseRef.current.y
      const mouseActive = sx > -1000
      const isDragging  = mouseRef.current.down && mouseActive
      const { x: mx, y: my } = mouseActive ? toWorld(sx, sy) : { x: -9999, y: -9999 }

      // delta drag en espace monde
      const dmx = (isDragging && prevMx > -1000) ? mx - toWorld(prevMx, prevMy).x : 0
      const dmy = (isDragging && prevMx > -1000) ? my - toWorld(prevMx, prevMy).y : 0
      if (mouseActive) { prevMx = sx; prevMy = sy }
      else             { prevMx = -9999; prevMy = -9999 }

      let hovered = null
      for (const n of nodes) {
        const cdx = mx - n.x, cdy = my - n.y
        const cdist = Math.hypot(cdx, cdy)

        if (isDragging) {
          const influence = Math.max(0, 1 - cdist / DRAG_R)
          n.vx += dmx * influence * DRAG_TRANSFER
          n.vy += dmy * influence * DRAG_TRANSFER
        } else if (mouseActive && cdist > 0.5) {
          if (cdist < ATTRACT_R) {
            const f = (1 - cdist / ATTRACT_R) * ATTRACT_FORCE
            n.vx += (cdx / cdist) * f
            n.vy += (cdy / cdist) * f
          } else {
            n.vx += (cdx / cdist) * ATTRACT_OUTER
            n.vy += (cdy / cdist) * ATTRACT_OUTER
          }
        }

        if (cdist < n.r + 8 && (!hovered || cdist < Math.hypot(hovered.x - mx, hovered.y - my))) {
          hovered = n
        }
        n.phase += 0.012
      }

      // ── Dessin ─────────────────────────────────────────────
      const dark = isDark()
      const vigR  = dark ? [13, 10, 8]   : [242, 237, 230]  // RGB vignette
      const vigA  = dark ? 0.5           : 0.55
      const edgeDefault = dark ? 'rgba(200,190,180,0.10)' : 'rgba(40,25,10,0.12)'
      const hoverRingColor = dark ? 'rgba(196,124,58,' : 'rgba(90,50,20,'
      const tooltipBg   = dark ? 'rgba(10,10,12,0.92)'  : 'rgba(245,240,232,0.95)'
      const tooltipText = dark ? '#f0ece4'               : '#1a0f08'
      const hoveredFill = dark ? '#ffffff'               : '#0a0505'

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)

      // Vignette (claire ou sombre selon thème)
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*0.85)
      vig.addColorStop(0, `rgba(${vigR[0]},${vigR[1]},${vigR[2]},0)`)
      vig.addColorStop(1, `rgba(${vigR[0]},${vigR[1]},${vigR[2]},${vigA})`)
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      ctx.save()
      ctx.translate(panX, panY)
      ctx.scale(zoom, zoom)

      // Gros rond d'attraction (espace monde)
      if (mouseActive) {
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, ATTRACT_R)
        grd.addColorStop(0,    hoverRingColor + '0.08)')
        grd.addColorStop(0.55, hoverRingColor + '0.03)')
        grd.addColorStop(1,    hoverRingColor + '0.00)')
        ctx.beginPath()
        ctx.arc(mx, my, ATTRACT_R, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(mx, my, ATTRACT_R, 0, Math.PI * 2)
        ctx.strokeStyle = hoverRingColor + '0.22)'
        ctx.lineWidth = 1 / zoom
        ctx.setLineDash([4 / zoom, 6 / zoom])
        ctx.stroke()
        ctx.setLineDash([])
      }

      const hoveredNeighbors = hovered ? adj.get(hovered.id) : null

      // Arêtes
      for (const e of topEdges) {
        const a = nodeById.get(e.source), b = nodeById.get(e.target)
        if (!a || !b) continue
        const isActive = hovered && (e.source === hovered.id || e.target === hovered.id)
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        if (isActive) {
          ctx.strokeStyle = nodeColor(a, dark) + 'bb'
          ctx.lineWidth = 1.4 / zoom
        } else {
          ctx.strokeStyle = edgeDefault
          ctx.lineWidth = 0.7 / zoom
        }
        ctx.stroke()
      }

      // Nœuds
      for (const n of nodes) {
        const col = nodeColor(n, dark)
        const isHovered = n === hovered
        const isNeighbor = hoveredNeighbors?.has(n.id)
        const pr = n.r + (n.tier === 'hub' ? Math.sin(n.phase) * 0.6 : 0)
        const nodeScale = isHovered ? 2.2 : isNeighbor ? 1.5 : 1

        if (n.tier === 'hub' || isHovered) {
          const glowR = pr * (isHovered ? 10 : 6) * nodeScale
          const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR)
          grd.addColorStop(0, col + (isHovered ? '99' : '44'))
          grd.addColorStop(1, col + '00')
          ctx.beginPath()
          ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(n.x, n.y, pr * nodeScale, 0, Math.PI * 2)
        if (isHovered)             ctx.fillStyle = hoveredFill
        else if (isNeighbor)       ctx.fillStyle = col + 'ee'
        else if (n.tier === 'hub') ctx.fillStyle = col
        else if (n.tier === 'mid') ctx.fillStyle = col + 'd8'
        else                       ctx.fillStyle = col + 'aa'
        ctx.fill()
      }

      ctx.restore()

      // Tooltip en coords écran
      if (hovered) {
        const col = nodeColor(hovered, dark)
        const tx = hovered.x * zoom + panX
        const ty = hovered.y * zoom + panY
        ctx.font = `500 11px 'DM Mono', monospace`
        const tw = ctx.measureText(hovered.label).width
        const px = 8, py = 5
        const fx = Math.min(tx + 14, W - tw - px * 2 - 4)
        const fy = Math.max(ty - 16, 18)

        ctx.fillStyle = tooltipBg
        ctx.beginPath()
        ctx.roundRect(fx - px, fy - py - 11, tw + px * 2, 22, 5)
        ctx.fill()

        ctx.strokeStyle = col + '99'
        ctx.lineWidth = 0.8
        ctx.stroke()

        ctx.fillStyle = tooltipText
        ctx.fillText(hovered.label, fx, fy)
      }

      raf = requestAnimationFrame(draw)
    }

    requestAnimationFrame(() => {
      const rect = canvas.parentElement.getBoundingClientRect()
      if (rect.width > 10 && rect.height > 10) initCanvas(rect.width, rect.height)
      draw()
    })

    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect
      if (rect.width > 10 && rect.height > 10) initCanvas(rect.width, rect.height)
    })
    ro.observe(canvas.parentElement)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('mousemove',  onMouseMove)
      canvas.removeEventListener('mousedown',  onMouseDown)
      canvas.removeEventListener('mouseup',    onMouseUp)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('wheel',      onWheel)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', cursor: 'grab' }}
    />
  )
}
