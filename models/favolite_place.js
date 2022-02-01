'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favolite_place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  favolite_place.init({
    name: DataTypes.STRING,
    user_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'favolite_place',
  });
  return favolite_place;
};