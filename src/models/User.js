module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false, 
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
    },
    {
        tableName: 'users',
        timestamps: false,
        underscored: true,
    });

    User.associate = (models) => {
        User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'blog_posts' })
    }

    return User;
};