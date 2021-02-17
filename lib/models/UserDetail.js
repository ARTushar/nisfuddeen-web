import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const answerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  answer: {
    type: Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true
});

const addressSchema = new Schema({
  country: {
    type: String
  },
  division: {
    type: String
  },
  district: {
    type: String
  },
  postOffice: {
    type: String
  }
}, {
  timestamps: true
});

const userDetailSchema = new Schema({
  presentAddress: {
    type: addressSchema,
  },
  permanentAddress: {
    type: addressSchema
  },
  answers: [answerSchema]
}, {
  timestamps: true
});


export default mongoose.models.UserDetail || mongoose.model('UserDetail', userDetailSchema);
