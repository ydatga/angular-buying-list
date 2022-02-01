"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("things", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      count: {
        type: Sequelize.INTEGER,
      },
      list_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "buying_lists",
          },
          key: "id",
        },
        allowNull: false,
      },
      check: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("things");
  },
};
