import { Schema, model, models } from 'mongoose';
import { MongoMapRegion } from './mapRegion';

const MapSchema = new Schema<MongoMapRegion>({
  type: {
    type: String,
    required: true,
    enum: ['region', 'federalDistrict'],
  },
  polygon: {
    type: {
      type: String,
      enum: ['Polygon', 'MultiPolygon'],
    },
    coordinates: [[[Number]]],
  },
  name: {
    type: String,
    required: true,
  },
  dot: [Number],
});

export default models.Map || model('MapRegion', MapSchema);
