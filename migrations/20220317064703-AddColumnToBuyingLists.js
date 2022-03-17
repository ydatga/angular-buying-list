"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn("buying_lists", "deletedAt", {
      type: Sequelize.DATE,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("buying_lists", "deletedAt");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
