const Sequelize = require("../models");
const { sequelize } = Sequelize({
    db_name: "whatsapp_masking",
    db_user: "root",
    db_pass: "password",
    db_host: "localhost",
    db_port: 1011,
    db_dialect: "mysql",
    db_logging: false
})

const whatsapp_sessions = require("./whatsapp_sessions.js")

describe('Test Whatsapp Session Repository', () => {
    beforeAll(async () => {
        await sequelize.sync({
            force: false
        });
    })

    test('Add Session Data', async () => {
        await whatsapp_sessions.AddWhatsappSession({
            title: "Whatsapp Ku",
            qr_code: "test",
            phone_number: "+628820192673",
            status: true,
            session: {
                data: "a"
            }
        }, sequelize);
    });

    test('Get Session Data', async () => {
        await whatsapp_sessions.GetSession({whatsapp_session_id: "bdc024e7-92cb-4803-82ae-27acb658cf33"}, sequelize);
    });

    // afterAll(async () => {
    //     await sequelize.drop()
    // })
})