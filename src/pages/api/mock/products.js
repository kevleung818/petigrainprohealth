// Mock products API for store
import { MERCH_ITEMS } from '../../../data/siteData'
import { requireMockData } from '../../../lib/mockGuard'

export default function handler(req, res) {
  if (!requireMockData(req, res)) return;
  const products = (MERCH_ITEMS || []).map((p, i) => ({ id: p.id || i, ...p }))
  res.status(200).json({ products })
}
