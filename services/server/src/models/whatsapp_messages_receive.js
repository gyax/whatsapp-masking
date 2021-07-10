const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class whatsapp_message_receive extends Model {

    };
    whatsapp_message_receive.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        // ID Whatsapp Messege
        whatsappId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Nomor telephone Pengirim
        from: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Nomor Telephone Penerima/tujuan
        to: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Kondisi jika mengirim media/file
        hashMedia: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        // Tipe Messege
        type: {
            type: DataTypes.ENUM("chat", "location", "image", "document", "multi_vcard", "vcard", "audio")
        },
        // Timestamp Pengiriman (Waktu Pengiriman)
        timestamp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // Isi Pesan
        body: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // Key Media/File yg dikirim
        mediaKey: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isForwarded: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isStarred: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        broadcast: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        fromMe: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        hasQuotedMsg: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        vCards: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        mentionedIds: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        links: {
            type: DataTypes.JSON,
            allowNull: true,
        },

    }, {
        sequelize,
        modelName: 'whatsapp_message_receives',
    });
    return whatsapp_message_receive;
};