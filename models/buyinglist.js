"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class buying_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  buying_list.init(
    {
      user_id: DataTypes.NUMBER,
      name: DataTypes.STRING,
      place: DataTypes.STRING,
      deadline: DataTypes.DATE,
      finished: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "buying_list",
    }
  );
  return buying_list;
};
