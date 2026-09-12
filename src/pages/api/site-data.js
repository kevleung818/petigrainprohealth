import * as siteData from '../../data/siteData';
import { requireMockData } from '../../lib/mockGuard';

export default function handler(req, res) {
  if (!requireMockData(req, res)) return;
  res.status(200).json(siteData);
}
