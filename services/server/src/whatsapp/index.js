const { Client } = require('whatsapp-web.js');
const {GetSession, SetSession, SetQRCode, SuccessAuthentication, ClearAuth, ChangeBattery, ChangeState} = require("../repositories/whatsapp_sessions")

module.exports = async ({whatsapp_session_id}, db) => {

    // Mencari Session Whatsapp
    const whatsapp_data = await GetSession({whatsapp_session_id}, db)

    let sessionCfg;
    // jika Ada Session, maka msukkan di session config
    if (whatsapp_data?.session) {
        sessionCfg = whatsapp_data.session;
    }

    // Config Whatsapp
    const client = new Client({ puppeteer: { headless: false }, session: sessionCfg });

    // Jika Authentication Gagal
    await client.on('auth_failure', async (msg) => {
        // Clear Session Auth
        await ClearAuth({whatsapp_session_id}, db);
    });

    // Jika Belum Login
    await client.on('qr', async (qr) => {
        // Maka Clear Auth
        await ClearAuth({whatsapp_session_id}, db);
        // Dan Set QR Code to Database
        await SetQRCode({qr_code:qr, whatsapp_session_id}, db);
    });

    // Jika Berhasil Login
    await client.on('authenticated', async (session) => {
        // Maka Set Session to Database
        await SetSession({session_data: session, whatsapp_session_id}, db)
    });

    // Jika Setelah login dan Berhasil
    await client.on('ready', async () => {
        // Status AUTH is True
        await SuccessAuthentication({whatsapp_session_id}, db)
        // Delete QR Code Data in Database
        await SetQRCode({qr_code:null, whatsapp_session_id}, db);
    });

    // Informasi Batere
    await client.on('change_battery', async (batteryInfo) => {
        const { battery, plugged } = batteryInfo;
        await ChangeBattery({whatsapp_session_id, battery, plugged},db)
    });

    // Informasi State
    await client.on('change_state', async state => {
        await ChangeState({whatsapp_session_id, state}, db);
    });

    // Jika Whatsapp Di Logout (Dilogout lewat hp)
    await client.on('disconnected', async (reason) => {
        // Maka Clear Authentication
        await ClearAuth({whatsapp_session_id}, db);
        // Menghapus Initialize sebelumnya (Menutup)
        await client.destroy();
        // Menginitialize Kembali
        await client.initialize();
    });

    // Initialize Whatsapp
    await client.initialize();

    return client;
}