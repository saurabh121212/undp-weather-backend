const { response } = require("express");

module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('WeatherAlartsModel', {
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
            type: DataTypes.STRING(2000),
            allowNull: false, // or false if required
            minlength: [3, 'description must be at least 3 characters long'],
            maxlength: [2000, 'description Must be at most 600 characters long'],
        },

        short_description: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'Short description must be at least 3 characters long'],
            maxlength: [200, 'Short description Must be at most 200 characters long'],
        },
        todate: {
            type: DataTypes.DATE,
            allowNull: false, // or false if required
        },
        fromdate: {
            type: DataTypes.DATE,
            allowNull: false, // or false if required
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

    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'weatheralarts', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
