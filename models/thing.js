"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class thing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      thing.belongsTo(models.buying_list, {
        foreignKey: "list_id",
        otherKey: "id",
      });
      // define association here
    }
  }
  thing.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      count: DataTypes.INTEGER,
      list_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "thing",
    }
  );
  return thing;
};
