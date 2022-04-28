const { Sequelize } = require("sequelize");

// // Option 1: Passing a connection URI | Dung tren host online
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// // Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize("demo_qltt", "root", null, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Nodejs server | Kết nối thành công đến Database!");
    } catch (error) {
        console.error(
            "Nodejs server | Không kết nối được đến Database (T.T)",
            error
        );
    }
};

module.exports = connectDB;
