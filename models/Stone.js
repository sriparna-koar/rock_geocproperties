
import mongoose from 'mongoose';

const StoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  properties: { type: String, required: true },
  pictureUrl: { type: String, required: true }, 
  locationDescription: { type: String, required: true },
});

const Stone = mongoose.models.Stone || mongoose.model('Stone', StoneSchema);

export default Stone;
