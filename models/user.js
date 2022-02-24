"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.buying_list, {
        foreignKey: "user_id",
        otherKey: "id",
      });
      // define association here
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      pass: DataTypes.STRING,
      login_id: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
