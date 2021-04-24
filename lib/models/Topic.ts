import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  bnTitle: {
    type: String
  },
  enTitle: {
    type: String
  },
  questionType: {
    type: String,
    enum: ['textfield', 'textarea', 'multiselect', 'select', 'multiinput'],
  },
  enumBnValues: {
    type: [String]
  },
  enumEnValues: {
    type: [String]
  },
  isRequired: {
    type: Boolean
  },
  questionFor: {
    type: String,
    enum: ['male', 'female', 'both']
  },
  bnHelperText: {
    type: String
  },
  enHelperText: {
    type: String
  },
  orderId: {
    type: Number, 
    required: true
  }
}, {
  timestamps: true
});

const topicSchema = new mongoose.Schema({
  bnTitle: {
    type: String
  },
  enTitle: {
    type: String
  },
  questions: [questionSchema],
  orderId: {
    type: Number,
    required: true
  } 
}, {
  timestamps: true
});

export default mongoose.models.Topic || mongoose.model('Topic', topicSchema);
