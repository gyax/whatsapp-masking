// const sequelize =require("sequelize");
// const {Op} = sequelize;

exports.AddWhatsappSession = async ({ title, qr_code, phone_number, status, session }, db) => {
    const WhatsappSessionModel = db.models.whatsapp_sessions;
    return await WhatsappSessionModel.create({ title, qr_code, phone_number, status, session })
}

exports.GetSession = async ({whatsapp_session_id}, db) => {
    const WhatsappSessionModel = db.models.whatsapp_sessions;
    return await WhatsappSessionModel.findOne({
        where: {
            id: whatsapp_session_id
        }
    })
}

exports.SetSession = async ({whatsapp_session_id, session_data}, db) => {
    const WhatsappSessionModel = db.models.whatsapp_sessions;
    return await WhatsappSessionModel.update({
        session: session_data
    },{
        where: {
            id: whatsapp_session_id
        }
    })
}

exports.SetQRCode = async ({whatsapp_session_id, qr_code}, db) => {
    const WhatsappSessionModel = db.models.whatsapp_sessions;
    return await WhatsappSessionModel.update({
        qr_code: qr_code
    },{
        where: {
            id: whatsapp_session_id
        }
    })
}

exports.ChangeState = async ({state, whatsapp_session_id}, db) => {
    const WhatsappSessionModel = db.models.whatsapp_sessions;
    return await WhatsappSessionModel.update({
        state
    },{
        where: {
            id: whatsapp_session_id
        }
    })
}

exports.SuccessAuthentication = async ({whatsapp_session_id}, db) => {
    const WhatsappSessionModel = db.models.whatsapp_sessions;
    return await WhatsappSessionModel.update({
        auth: true
    },{
        where: {
            id: whatsapp_session_id
        }
    })
}

exports.ClearAuth = async ({whatsapp_session_id}, db) => {
    const WhatsappSessionModel = db.models.whatsapp_sessions;
    return await WhatsappSessionModel.update({
        qr_code: null,
        session: null,
        auth: false
    },{
        where: {
            id: whatsapp_session_id
        }
    })
}

exports.ChangeBattery = async ({whatsapp_session_id, plugged, battery}, db) => {
    const WhatsappSessionModel = db.models.whatsapp_sessions;
    return await WhatsappSessionModel.update({
        plugged,
        battery
    },{
        where: {
            id: whatsapp_session_id
        }
    })
}