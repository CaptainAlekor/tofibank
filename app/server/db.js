const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'ebanking',
    'postgres',
    'SpainPrince21',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432
    }
)

// const Pool = require('pg').Pool
// const pool = new Pool({
//     user: "postgres",
//     password: "SpainPrince21",
//     host: "localhost",
//     port: 5432,
//     database: "ebanking"
// })

// module.exports = pool()