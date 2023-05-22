'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
       
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
       
      },
      price: {
        type: Sequelize.INTEGER,
        
      },
      stock: {
        type: Sequelize.INTEGER,
        
      },
      createdAt: {
        
        type: Sequelize.DATE
      },
      updatedAt: {
       
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};