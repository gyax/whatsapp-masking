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
            type: DataTypes.TEXT,
            allowNull: false
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
        session: {
            type: DataTypes.JSON,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'whatsapp_session',
    });
    return whatsapp_session;
};