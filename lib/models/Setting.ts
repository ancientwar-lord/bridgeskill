import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true,
  },
  mentorConfig: [
    {
      title: { type: String, required: true },
      href: { type: String, required: true },
      order: { type: Number, required: true },
      active: { type: Boolean, required: true, default: false },
    },
  ],
  personalMentorConfig: {
    usergoal: { type: String, default: '' },
    userpersona: { type: String, default: '' },
    userpreference: { type: String, default: '' },
  },
  founderMentorConfig: {
    startupstage: { type: String, default: '' },
    industry: { type: String, default: '' },
  },
  researchMentorConfig: {
    researchfield: { type: String, default: '' },
    researchinterest: { type: String, default: '' },
  },
});

const Setting =
  mongoose.models.Setting || mongoose.model('Setting', SettingSchema);

export default Setting;
