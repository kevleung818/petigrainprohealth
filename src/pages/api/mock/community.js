// Mock community posts API
import { TRENDING_FEED } from '../../../data/siteData'
import { requireMockData } from '../../../lib/mockGuard'

export default function handler(req, res) {
  if (!requireMockData(req, res)) return;
  const posts = (TRENDING_FEED || []).map((p, i) => ({ id: p.id || i, ...p }))
  res.status(200).json({ posts })
}
