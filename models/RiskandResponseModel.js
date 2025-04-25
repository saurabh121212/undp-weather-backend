
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('RiskandResponseModel', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(500),
            allowNull: false, // or false if required
            minlength: [3, 'name must be at least 3 characters long'],
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false, // or false if required
            minlength: [3, 'description must be at least 3 characters long'],
        },
        url: {
            type: DataTypes.STRING(500),
            allowNull: true, // or false if required
            minlength: [3, 'question Must be at least 3 characters long'],
        },
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'riskandresponses', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
