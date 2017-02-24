'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Documents', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

      },
      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      OwnerId: Sequelize.INTEGER,
      access: {
        defaultValue: 'public',
        type: Sequelize.ENUM('public', 'private')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Documents');
  }
};