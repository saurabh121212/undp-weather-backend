const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('UserModel', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(300),
            allowNull: true, // or false if required
            minlength: [3, 'Name Must be at least 3 characters long'],
            maxlength: [300, 'Name Must be at most 300 characters long'],

        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: true, // or false if required
            minlength: [8, 'Phone Must be at least 3 characters long'],
            maxlength: [10, 'Phone Must be at most 20 characters long'],
        },
        email: {
            type: DataTypes.STRING(300),
            allowNull: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: [3, 'Email Must be at least 3 characters long'],
            maxlength: [300, 'Name Must be at most 300 characters long'],
        },

        location_id: {
            type: DataTypes.STRING(200),
            allowNull: true, // or false if required
            minlength: [3, 'Location Id Must be at least 3 characters long'],
            maxlength: [200, 'Name Must be at most 200 characters long'],
        },

        location_name: {
            type: DataTypes.STRING(200),
            allowNull: true, // or false if required
            minlength: [3, 'Location Name Must be at least 3 characters long'],
            maxlength: [200, 'Name Must be at most 200 characters long'],
        },

        gender: {
            type: DataTypes.STRING(100),
            allowNull: true, // or false if required
            minlength: [3, 'Gender Name Must be at least 3 characters long'],
            maxlength: [100, 'Gender Name Must be at most 200 characters long'],
        },
        
        region: {
            type: DataTypes.STRING(200),
            allowNull: true, // or false if required
            minlength: [3, 'Region Name Must be at least 3 characters long'],
            maxlength: [200, 'Region Must be at most 200 characters long'],
        },

        address: {
            type: DataTypes.STRING(500),
            allowNull: true, // or false if required
            minlength: [3, 'Address Must be at least 3 characters long'],
            maxlength: [500, 'Name Must be at most 500 characters long'],

        },

        password: {
            type: DataTypes.STRING(400),
            allowNull: true, // or false if required
            minlength: [5, 'Password Must be at least 5 characters long'],
        },

        token: {
            type: DataTypes.STRING(300),
            allowNull: true // or false if required
        },

        divice_id: {
            type: DataTypes.STRING(300),
            allowNull: true // or false if required
        },
        divice_type: {
            type: DataTypes.STRING(300),
            allowNull: true // or false if required
        },
        divice_token: {
            type: DataTypes.STRING(400),
            allowNull: true // or false if required
        },

        is_ragistered: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },

        user_type: {
            type: DataTypes.STRING(20),
            allowNull: true,
            enum: ['admin', 'user'],
            default: 'user',
        },

    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'users', // Optional: useful for clarity and pluralization control
    });


    Model.prototype.generateAuthToken = function () {
        return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: '300h' });
    };


    Model.prototype.comparePassword = async function (password) {
        return bcrypt.compare(password, this.password);
    };

    Model.hashPassword = async function (password) {
        return await bcrypt.hash(password, 10);
    };


    return Model;
};
