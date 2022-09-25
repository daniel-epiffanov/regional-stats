import { Schema, model, models } from 'mongoose';
import { MongoCoordsOfRegion } from './coordsOfRegion';

const MapSchema = new Schema<MongoCoordsOfRegion>({
  regionType: {
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
  regionName: {
    type: String,
    required: true,
  },
  point: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
});

export default models.Map || model('CoordsOfRegion', MapSchema);
