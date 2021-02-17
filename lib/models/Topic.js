import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  bnTitle: {
    type: String
  },
  enTitle: {
    type: String
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  orderId: {
    type: Number,
    required: true
  } 
}, {
  timestamps: true
});

export default mongoose.models.Topic || mongoose.model('Topic', topicSchema);
