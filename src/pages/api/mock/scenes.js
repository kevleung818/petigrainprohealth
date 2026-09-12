// Lightweight mock scenes API
import { SCENE_LIBRARY } from '../../../data/siteData'
import { requireMockData } from '../../../lib/mockGuard'

export default function handler(req, res) {
  if (!requireMockData(req, res)) return;
  const { q } = req.query
  let scenes = SCENE_LIBRARY || []
  if (q) {
    const lower = q.toLowerCase()
    scenes = scenes.filter(s => (s.title || '').toLowerCase().includes(lower) || (s.description || '').toLowerCase().includes(lower))
  }
  res.status(200).json({ scenes })
}
