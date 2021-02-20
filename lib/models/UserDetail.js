import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const answerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  answer: {
    type: Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true
});


const userDetailSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  linkedAccounts: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  answers: [answerSchema],
  wishList: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});


export default mongoose.models.UserDetail || mongoose.model('UserDetail', userDetailSchema);
