const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');

const UserSchema = Schema({
  approved: { type: Boolean, default: false },
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema);