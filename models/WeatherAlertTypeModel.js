
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('WeatherAlertTypeModel', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'Name Must be at least 3 characters long'],
            maxlength: [200, 'Name Must be at most 600 characters long'],
        },
        create_time: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'weatheralerttypes', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
