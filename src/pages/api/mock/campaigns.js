// Mock campaigns API
import { CROWN_CUTS } from '../../../data/siteData'
import { requireMockData } from '../../../lib/mockGuard'

export default function handler(req, res) {
  if (!requireMockData(req, res)) return;
  const campaigns = (CROWN_CUTS || []).map((c, i) => ({ id: c.id || i, ...c }))
  res.status(200).json({ campaigns })
}
