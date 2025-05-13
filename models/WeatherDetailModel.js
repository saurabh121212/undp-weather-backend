const e = require("cors");

module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('WeatherDetailModel', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false, // or false if required
        },
        location_id: {
            type: DataTypes.BIGINT,
            allowNull: false, // or false if required
        },
        location_name: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'name must be at least 3 characters long'],
        },
        
        weather_description: {
            type: DataTypes.STRING,
            allowNull: true, // or false if required
            minlength: [3, 'description must be at least 3 characters long'],
        },
        morning_temprature: {
            type: DataTypes.STRING(50),
            allowNull: true, // or false if required
        },
        afternoon_temprature: {
            type: DataTypes.STRING(50),
            allowNull: true, // or false if required
        },  
        evening_temprature: {
            type: DataTypes.STRING(50),
            allowNull: true, // or false if required
        },

        day_maximum_temprature: {
            type: DataTypes.STRING(50),
            allowNull: true, // or false if required
        },
        day_minimum_temprature: {
            type: DataTypes.STRING(50),
            allowNull: true, // or false if required
        },

        night_maximum_temprature: {
            type: DataTypes.STRING(50),
            allowNull: true, // or false if required
        },
        night_minimum_temprature: {
            type: DataTypes.STRING(50),
            allowNull: true, // or false if required
        },
        precipitation: {
            type: DataTypes.STRING(200),
            allowNull: true, // or false if required
        },
        humidity: {
            type: DataTypes.STRING(200),
            allowNull: true, // or false if required
        },
        wind_speed: {
            type: DataTypes.STRING(200),
            allowNull: true, // or false if required
        },
        wind_direction: {
            type: DataTypes.STRING(200),
            allowNull: true, // or false if required
        },
        weather_type: {
            type: DataTypes.STRING(200),
            allowNull: true, // or false if required
        },
        weather_icon: {
            type: DataTypes.STRING(500),
            allowNull: true, // or false if required
        },
        night_icon_url: {
            type: DataTypes.STRING(600),
            allowNull: false,
        },
        
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'WeatherDetails', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
