

import connectDB from './connectDB';
import Stone from '../../models/Stone';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  await connectDB(); 

  switch (method) {
    case 'GET':
      try {
        if (id) {
          const stone = await Stone.findById(id);

          if (!stone) {
            return res.status(404).json({ error: 'Stone not found' });
          }

          return res.status(200).json(stone);
        } else {
          const stones = await Stone.find({});
          return res.status(200).json(stones);
        }
      } catch (error) {
        console.error('Error fetching stones or stone by ID:', error);
        return res.status(500).json({ error: 'Server error' });
      }

    case 'POST':
      try {
        const { name, properties, pictureUrl, locationDescription } = req.body;
        const stone = new Stone({ name, properties, pictureUrl, locationDescription });
        await stone.save();
        return res.status(201).json(stone);
      } catch (error) {
        console.error('Error creating stone:', error);
        return res.status(500).json({ error: 'Server error' });
      }

    case 'DELETE':
      try {
        const { id } = req.body;
        if (!id) {
          return res.status(400).json({ error: 'ID is required for delete operation' });
        }

        const deletedStone = await Stone.findByIdAndDelete(id);
        if (!deletedStone) {
          return res.status(404).json({ error: 'Stone not found' });
        }

        return res.status(200).json({ message: 'Stone deleted successfully', deletedStone });
      } catch (error) {
        console.error('Error deleting stone:', error);
        return res.status(500).json({ error: 'Server error' });
      }

    default:
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}

