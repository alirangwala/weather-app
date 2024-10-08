import { Sequelize, Model, DataTypes } from 'sequelize'
import {decrypt, encrypt} from "./encryption.js"

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

class User extends Model { }

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  apiUrl: {
    type: DataTypes.STRING
  },
  apiKey: {
    type: DataTypes.STRING(512),
    allowNull: false,
    get() {
      try {
        const encryptedApiKey = this.getDataValue('apiKey');
        return encryptedApiKey ? decrypt(encryptedApiKey) : null;
      } catch (error) {
        console.error('Error decrypting API key:', error);
        return null;  // Return null if decryption fails
      }
    },
    set(value) {
      try {
        const encryptedValue = encrypt(value);
        this.setDataValue('apiKey', encryptedValue);
      } catch (error) {
        console.error('Error encrypting API key:', error);
      }
    }
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: false
});

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

export { User, sequelize }