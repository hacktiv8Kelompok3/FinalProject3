'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Categories', {
      fields: ['id'],
      type: 'foreign key',
      name: 'fk_id_ref_user',
      references: {
        table: "Users",
        field:"id"
      },
      onDelete: "CASCADE",
      onUpdate:"CASCADE"
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint("Categories", "fk_id_ref_user")

  }
};
