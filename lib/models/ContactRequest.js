import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['sent', 'seen', 'permitted', 'aborted']
  }
}, {
  timestamps: true
});

export default mongoose.models('Request') || mongoose.model('Request', requestSchema);