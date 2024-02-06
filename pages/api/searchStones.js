// pages/api/searchStones.js

import connectDB from './connectDB';
import Stone from '../../models/Stone';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const { query } = req.query;

    try {
      const stones = await Stone.find({ name: { $regex: query, $options: 'i' } });
      res.status(200).json({ stones });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
