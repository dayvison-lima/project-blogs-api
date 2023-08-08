module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            foreignKey: true,
            field: 'post_id',
        },
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            foreignKey: true,
            field: 'category_id'
        },
    },
    {
        tableName: 'posts_categories',
        underscored: true,
        timestamp: false,
    })

    PostCategory.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost,
            {
                foreignKey: 'categoryId',
                as: 'blogPosts',
                otherKey: 'postId',
                through: PostCategory,
            });

        models.BlogPost.belongsToMany(models.Category,
            {
                foreignKey: 'postId',
                as: 'categories',
                otherKey: 'categoryId',
                through: PostCategory,
            });
    };


    return PostCategory;
};