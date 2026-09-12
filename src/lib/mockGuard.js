const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false';

export function requireMockData(req, res) {
  if (USE_MOCK_DATA) return true;

  res.status(404).json({ error: 'Mock API route is disabled.' });
  return false;
}