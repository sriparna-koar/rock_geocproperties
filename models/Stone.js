import mongoose from 'mongoose';

const StoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  properties: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const Stone = mongoose.models.Stone || mongoose.model('Stone', StoneSchema);

export default Stone;
