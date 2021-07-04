const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class whatsapp_session extends Model {

    };
    whatsapp_session.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        qr_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        auth: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        plugged: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        battery: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        session: {
            type: DataTypes.JSON,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'whatsapp_sessions',
    });
    return whatsapp_session;
};