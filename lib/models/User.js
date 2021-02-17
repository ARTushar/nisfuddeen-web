import mongoose  from 'mongoose';
import validator from 'validator';
import passportLocalMongoose from 'passport-local-mongoose';

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
    enum: ['normal', 'admin', 'moderator'],
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
  occupation: {
    type: String,
    lowerCase: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  homeDistrict: {
    type: String,
  },
  currentDistrict: {
    type: String
  },
  homeDivision: {
    type: String
  },
  currentDivision: {
    type: String
  },
  birthYear: {
    type: Number,
  },
  priviledgeType: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  prayerTimes: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5]
  },
  veilStyle: {
    type: String,
    enum: ['none', 'scarf', 'hijab', 'niqab']
  },

}, {
  timestamps: true
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
})

export default mongoose.models.User || mongoose.model('User', userSchema);