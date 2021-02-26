const mysql = require("mysql");
const dbConfig = require("./mariadbconfig.js");
const connection = mysql.createConnection(dbConfig);

module.exports = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      connection.query("select * from locations", (err, locations) => {
        if (err) {
          reject(err);
        }
        locations.forEach((loc) => console.log(loc));
        resolve(locations);
      });
    });
  },
  findById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from locations where id = ${Number(id)}`,
        (err, locations) => {
          if (err) {
            reject(err);
          }
          locations.forEach((loc) => console.log(loc));
          resolve(locations);
        }
      );
    });
  },
  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `delete from locations where id = ${Number(id)}`,
        (err, locations) => {
          if (err) {
            reject(err);
          }
          resolve(true);
        }
      );
    });
  },
  addItem: (item) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO locations SET ?",
        item,
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results.insertId);
          }
        }
      );
    });
  },
  updateItem: (item, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE locations SET ? where id = ${Number(id)}`,
        item,
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results.insertId);
          }
        }
      );
    });
  },
};
