const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/my_db';
mongoose.connect(mongoDB);

const { Schema } = mongoose;

const UserModelSchema = new Schema({
  name: {
    type: Schema.Types.String,
  },
  surname: {
    type: Schema.Types.String,
  },
});
// Компилируем модель из схемы
const UserModel = mongoose.model('UserModel', UserModelSchema);

module.exports = UserModel;