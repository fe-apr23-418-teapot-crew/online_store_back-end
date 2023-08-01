const TABLE_NAME = 'products';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      TABLE_NAME,
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        category: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        item_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        full_price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        screen: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        capacity: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        color: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ram: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        year: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING,
          allowNull: false
        },
      }
    );

    await queryInterface.addConstraint(
      TABLE_NAME,
      {
        fields: ['item_id'],
        type: 'foreign key',
        references: {
          table: 'phones',
          field: 'id',
        }
      },
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME);
  }
};
