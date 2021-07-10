const express = require("express");
const cors = require('cors');
const SequelizeInit = require("./models");
const Whatsapp = require("./whatsapp")
const environments = require("./configs/environments");

const { sequelize } = SequelizeInit({
    db_name: environments.db_name,
    db_user: environments.db_user,
    db_pass: environments.db_pass,
    db_host: environments.db_host,
    db_port: environments.db_port,
    db_dialect: environments.db_dialect,
    db_logging: false
})

const app = express();
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(cors());

app.listen(environments.app_port || 5000, async () =>{
    try {
        await sequelize.sync({
            force: process.env.DB_FORCE || false
        });
        await sequelize.authenticate();
        await Whatsapp({whatsapp_session_id: "0ca75fae-6ddd-44de-9e8e-9919f80aa1ad"}, sequelize);
        console.log(`Server Jalan di Port ${environments.app_port || 5000}`)
    }catch (e) {
        console.log("Error")
        console.log(e)
    }
});