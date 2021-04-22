import mongoose  from 'mongoose';
import validator from 'validator';
import passportLocalMongoose from 'passport-local-mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const addressSchema = new mongoose.Schema({
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

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  salt: {
    type: String
  },
  hash: {
    type: String
  },
  accountType: {
    type: String,
    enum: ['normal', 'admin', 'moderator', 'guardian'],
    default: 'normal',
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: validator.isEmail
  },
  googleId: {
    type: String,
    trim: true,
    index: { unique: true, sparse: true }
  },
  verifiedBiodata: {
    type: Boolean,
    default: false,
  },
  maritalStatus: {
    type: String,
    enum: ['divorced', 'unmarried', 'widow', 'widower']
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  occupation: {
    type: String,
    lowerCase: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  presentAddress: {
    type: addressSchema,
  },
  permanentAddress: {
    type: addressSchema
  },
  birthYear: {
    type: Number,
  },
  priviledgeType: {
    type: String,
    enum: ['free', 'premium', 'trial'],
    default: 'free'
  },
  trialDays: {
    type: Number,
    min: 1,
    max: 7
  },
  prayerTimes: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5]
  },
  veilStyle: {
    type: String,
    enum: ['none', 'scarf', 'hijab', 'niqab']
  },
  dressUpStyle: {
    type: String,
    enum: ['shirtpant', 'panjabipajama', 'panjabipant']
  },
  pantPajamaAboveKnee: {
    type: Boolean,
  },
  haveHandfulBeard: {
    type: Boolean
  }

}, {
  timestamps: true
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

userSchema.plugin(mongoosePaginate);

export default mongoose.models.User || mongoose.model('User', userSchema);