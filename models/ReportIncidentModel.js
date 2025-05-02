
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('ReportIncidentModel', {
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
            minlength: [8, 'Mobile must be at least 3 characters long'],
        },
        location: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'Location must be at least 3 characters long'],
        },

        message: {
            type: DataTypes.STRING,
            allowNull: false, // or false if required
            minlength: [3, 'description must be at least 3 characters long'],
        },

        url: {
            type: DataTypes.STRING(400),
            allowNull: false, // or false if required
            minlength: [3, 'URL must be at least 3 characters long'],
        },
       
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'reportIncidents', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
