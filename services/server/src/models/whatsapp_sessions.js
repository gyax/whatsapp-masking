const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class settings extends Model {

    };
    settings.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        user_subscribe_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        value_setting: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'settings',
    });
    return settings;
};