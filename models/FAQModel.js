
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('FAQModel', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: DataTypes.STRING(700),
            allowNull: false, // or false if required
            minlength: [3, 'question Must be at least 3 characters long'],
        },
        answer: {
            type: DataTypes.STRING(2000),
            allowNull: false, // or false if required
            minlength: [3, 'answer Must be at least 3 characters long'],
        },
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'faqs', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
