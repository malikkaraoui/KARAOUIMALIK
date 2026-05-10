#!/usr/bin/env node
/**
 * Génère src/data/vault-graph.json depuis le vault Obsidian local.
 * Usage : node scripts/gen-vault-graph.js [TOP_N]
 * - ID = chemin relatif (préserve les doublons de basename)
 * - label = basename sans .md
 * - résolution wikilinks : basename → premier match de chemin
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, relative, extname, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const VAULT   = process.env.VAULT_PATH || '/Users/malik/Vault/Malik'
const OUT     = join(__dirname, '../src/data/vault-graph.json')
const TOP_N   = parseInt(process.argv[2] || process.env.TOP_N || '2000', 10)

function walkMd(dir, results = []) {
  let entries
  try { entries = readdirSync(dir, { withFileTypes: true }) } catch { return results }
  for (const e of entries) {
    if (e.name.startsWith('.')) continue
    const full = join(dir, e.name)
    if (e.isDirectory()) walkMd(full, results)
    else if (extname(e.name) === '.md') results.push(full)
  }
  return results
}

function getGroup(filePath) {
  const rel = relative(VAULT, filePath)
  const parts = rel.split('/')
  return parts.length > 1 ? parts[0] : 'root'
}

const files = walkMd(VAULT)

// ID = chemin relatif, label = basename sans .md
const nodeMap = new Map()                     // relPath → node
const basenameIndex = new Map()               // lower basename → relPath (premier match)

for (const f of files) {
  const rel  = relative(VAULT, f)
  const lbl  = basename(f, '.md')
  const key  = lbl.toLowerCase()
  const grp  = getGroup(f)
  nodeMap.set(rel, { id: rel, label: lbl, degree: 0, group: grp })
  if (!basenameIndex.has(key)) basenameIndex.set(key, rel)
}

// Arêtes via [[wikilinks]] — résolution par basename index
const edges = []
const seen  = new Set()

for (const f of files) {
  const srcRel = relative(VAULT, f)
  const content = readFileSync(f, 'utf8')
  const links = [...content.matchAll(/\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]/g)]
  for (const [, raw] of links) {
    const lbl     = raw.trim()
    const tgtRel  = basenameIndex.get(lbl.toLowerCase())
    if (!tgtRel || tgtRel === srcRel) continue
    const key = [srcRel, tgtRel].sort().join('→')
    if (seen.has(key)) continue
    seen.add(key)
    edges.push({ source: srcRel, target: tgtRel })
    nodeMap.get(srcRel).degree++
    nodeMap.get(tgtRel).degree++
  }
}

// Pondération
const nodes  = [...nodeMap.values()]
const maxDeg = Math.max(...nodes.map(n => n.degree), 1)
for (const n of nodes) n.weight = n.degree / maxDeg

// Top-N par degré (les mieux connectés + un peu de nœuds périphériques)
const sorted    = [...nodes].sort((a, b) => b.degree - a.degree)
const topNodes  = sorted.slice(0, TOP_N)
const topIds    = new Set(topNodes.map(n => n.id))
const topEdges  = edges.filter(e => topIds.has(e.source) && topIds.has(e.target))

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify({ nodes: topNodes, edges: topEdges }, null, 2), 'utf8')

console.log(`✅ vault-graph.json — ${topNodes.length}/${nodes.length} nœuds · ${topEdges.length} arêtes → ${OUT}`)
