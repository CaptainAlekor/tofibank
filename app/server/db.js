const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    {
        database: 'ebanking',
        username: 'render_user',
        password: 'i8IhyT3R0GjmqYy2VhVGTegYfztt5Vph',
        dialect: 'postgres',
        host: 'dpg-cm1ga5en7f5s73e92v10-a.frankfurt-postgres.render.com', 
        port: process.env.DB_PORT,
        pool: {
            max: 3,
            min: 1,
            idle: 10000,
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            keepAlive: true,
        },
        ssl:true,
        
    })

// const {Sequelize} = require('sequelize')

// module.exports = new Sequelize(
//     'ebanking',
//     'postgres',
//     'SpainPrince21',
//     {
//         dialect: 'postgres',
//         host: 'localhost',
//         port: 5432
//     }
// )

// const Pool = require('pg').Pool
// const pool = new Pool({
//     user: "postgres",
//     password: "SpainPrince21",
//     host: "localhost",
//     port: 5432,
//     database: "ebanking"
// })

// module.exports = pool()
