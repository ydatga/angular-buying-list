"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BuyingList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BuyingList.init(
    {
      user_id: DataTypes.NUMBER,
      name: DataTypes.STRING,
      place: DataTypes.STRING,
      deadline: DataTypes.DATE,
      finished: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "BuyingList",
    }
  );
  return BuyingList;
};
