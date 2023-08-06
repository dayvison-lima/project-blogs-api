const User = (sequelize, DataTypes) => {
    const userTable = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        displayName: DataTypes.STRING,
        image: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    },
    {
        tableName: 'User',
        underscored: true,
        timestamp: false,
    })

    return userTable;
};

module.exports = User;