const { response } = require("express");

module.exports = (sequelize, DataTypes) => {
    const WeatherAlartsModel = sequelize.define('WeatherAlartsModel', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false, // or false if required
            minlength: [3, 'name must be at least 3 characters long'],
            maxlength: [100, 'Name Must be at most 600 characters long'],
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
        },
        todate: {
            type: DataTypes.DATE,
            allowNull: false, // or false if required
        },
        fromdate: {
            type: DataTypes.DATE,
            allowNull: false, // or false if required
        },
        to_time: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
        },
        from_time: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
        },

        risk_id: {
            type: DataTypes.BIGINT,
        },

        disasterType: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
        },

        severity: {
            type: DataTypes.STRING(400),
            allowNull: false, // or false if required
        },

        responseType: {
            type: DataTypes.STRING(400),
            allowNull: false, // or false if required
        },

        certaintyType: {
            type: DataTypes.STRING(400),
            allowNull: false, // or false if required
        },  

    classification: {
            type: DataTypes.STRING(400),
            allowNull: false, // or false if required
        }, 

    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'weatheralarts', // Optional: useful for clarity and pluralization control
    });

      WeatherAlartsModel.associate = (models) => {
      WeatherAlartsModel.belongsTo(models.RiskandResponseModel, {
      foreignKey: 'risk_id', // tell Sequelize to link this way
      targetKey: 'id'        // match with Risk.id
    });
  };

    return WeatherAlartsModel;
};
