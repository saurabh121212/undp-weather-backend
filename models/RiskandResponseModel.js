module.exports = (sequelize, DataTypes) => {
    const RiskandResponseModel = sequelize.define('RiskandResponseModel', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(300),
            allowNull: false, // or false if required
            minlength: [3, 'name must be at least 3 characters long'],
            maxlength: [300, 'name must be at most 300 characters long'],
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: false, // or false if required
            minlength: [3, 'description must be at least 3 characters long'],
        },
        short_description: {
            type: DataTypes.TEXT('medium'),
            allowNull: false, // or false if required
            minlength: [3, 'Short description must be at least 3 characters long'],
            maxlength: [150, 'Short description must be at most 150 characters long'],
        },
        url: {
            type: DataTypes.STRING(500),
            allowNull: true, // or false if required
            minlength: [3, 'url Must be at least 3 characters long'],
        },
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'riskandresponses', // Optional: useful for clarity and pluralization control
    });

    RiskandResponseModel.associate = (models) => {
    RiskandResponseModel.hasMany(models.WeatherAlartsModel, { foreignKey: 'risk_id' }); // just tell Sequelize
  };
  
    return RiskandResponseModel;
};
