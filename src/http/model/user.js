import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  approved: { type: Boolean, default: false },
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);