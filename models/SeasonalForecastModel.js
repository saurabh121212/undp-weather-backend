
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('SeasonalForecastModel', {
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
            maxlength: [300, 'Name Must be at most 600 characters long'],
        },
        description: {
            type: DataTypes.STRING(650),
            allowNull: false, // or false if required
            minlength: [3, 'description must be at least 3 characters long'],
            maxlength: [650, 'description Must be at most 600 characters long'],
        },
        url: {
            type: DataTypes.STRING(500),
            allowNull: true, // or false if required
            minlength: [3, 'question Must be at least 3 characters long'],
        },
        
        todate: {
            type: DataTypes.DATE,
            allowNull: false, // or false if required
        },
        fromdate: {
            type: DataTypes.DATE,
            allowNull: false, // or false if required
        },
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'seasonalforecasts', // Optional: useful for clarity and pluralization control
    });

    return Model;
};

