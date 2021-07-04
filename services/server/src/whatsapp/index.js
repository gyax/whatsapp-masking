const { Client } = require('whatsapp-web.js');
const {GetSession, SetSession, SetQRCode, SuccessAuthentication, ClearAuth, ChangeBattery, ChangeState} = require("../repositories/whatsapp_sessions")

module.exports = async ({whatsapp_session_id}, db) => {
    // const SESSION_FILE_PATH = './session.json';
    const whatsapp_data = await GetSession({whatsapp_session_id}, db)
    let sessionCfg;
    if (whatsapp_data) {
        sessionCfg = whatsapp_data.session;
    }

    const client = new Client({ puppeteer: { headless: false }, session: sessionCfg });

    await client.on('auth_failure', async msg => {
        console.log(msg)
        await ClearAuth({whatsapp_session_id}, db);
    });

    await client.on('qr', async (qr) => {
        await ClearAuth({whatsapp_session_id}, db);
        await SetQRCode({qr_code:qr, whatsapp_session_id}, db);
    });

    await client.on('authenticated', async (session) => {
        await SetSession({session_data: session, whatsapp_session_id}, db)
    });


    await client.on('ready', async () => {
        await SuccessAuthentication({whatsapp_session_id}, db)
        await SetQRCode({qr_code:null, whatsapp_session_id}, db);
    });

    await client.on('change_battery', async (batteryInfo) => {
        const { battery, plugged } = batteryInfo;
        await ChangeBattery({whatsapp_session_id, battery, plugged},db)
    });

    await client.on('change_state', async state => {
        await ChangeState({whatsapp_session_id, state}, db);
    });

    await client.on('disconnected', async (reason) => {
        await ClearAuth({whatsapp_session_id}, db);
        await client.destroy();
        await client.initialize();
    });

    await client.initialize();

    return client;
}