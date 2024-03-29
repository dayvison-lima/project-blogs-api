'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('blog_posts', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          // allowNull: false,
        },
        content: {
          type: Sequelize.STRING,
          // allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          // foreignKey: true,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        published: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updated: {
            type: Sequelize.DATE,
            allowNull: false,
        },
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('blog_posts');
    },
  };
  