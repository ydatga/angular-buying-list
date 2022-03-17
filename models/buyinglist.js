"use strict";
const { Model } = require("sequelize");
const { idText } = require("typescript");
module.exports = (sequelize, DataTypes) => {
  class buying_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      buying_list.hasMany(models.thing, {
        foreignKey: "list_id",
        otherKey: "id",
      });
      buying_list.belongsTo(models.user, {
        foreignKey: "user_id",
        otherKey: "id",
      });
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
      paranoid: true,
      modelName: "buying_list",
    }
  );
  return buying_list;
};
