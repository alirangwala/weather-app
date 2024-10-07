import { Sequelize, Model, DataTypes } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

class User extends Model { }
User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  lastCity: DataTypes.STRING
}, { sequelize, modelName: 'user' });

sequelize.sync();

export { User, sequelize}