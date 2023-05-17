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
    await queryInterface.addColumn('Transactionhistories', 'ProductId', {
      type: Sequelize.INTEGER
    })
    await queryInterface.addColumn('Transactionhistories', 'UserId', {
      type: Sequelize.INTEGER
    })
    await queryInterface.addConstraint('Transactionhistories', {
      fields: ['ProductId'],
      type: 'foreign key',
      name: 'fk_transactionHistory_product_ref_product',
      references: {
        table: "Products",
        field:"id"
      },
      onDelete: "CASCADE",
      onUpdate:"CASCADE"
    })
    await queryInterface.addConstraint('Transactionhistories', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fk_transactionHistory_userid_ref_users',
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
    await queryInterface.removeConstraint("Transactionhistories", "fk_transactionHistory_product_ref_product")
    await queryInterface.removeConstraint("Transactionhistories", "fk_transactionHistory_userid_ref_users")
    await queryInterface.removeColumn("Transactionhistories", "ProductId")
    await queryInterface.removeColumn("Transactionhistories", "UserId")

  }
};
