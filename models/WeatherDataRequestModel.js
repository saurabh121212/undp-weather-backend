
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('WeatherDataRequestModel', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'name must be at least 3 characters long'],
        },
        mobile: {
            type: DataTypes.STRING(100),
            allowNull: false, // or false if required
            minlength: [3, 'Mobile must be at least 3 characters long'],
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'Email must be at least 3 characters long'],
            
        },

        message: {
            type: DataTypes.STRING,
            allowNull: false, // or false if required
            minlength: [3, 'description must be at least 3 characters long'],
        },

        mediume: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'Medium must be at least 3 characters long'],
        },
        use_of_data: {
            type: DataTypes.STRING(400),
            allowNull: false, // or false if required
            minlength: [3, 'name must be at least 3 characters long'],
        },
        
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'weatherDataRequests', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
