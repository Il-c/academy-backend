const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "locations",
});

// You may omit this
connection.connect();

connection.query("select * from locations", (err, locations) => {
  if (err) {
    throw err;
  }
  locations.forEach((loc) => console.log(loc));
});
let coords = { latitude: 50, longitude: 30 };
var query = connection.query(
  "INSERT INTO locations SET ?",
  coords,
  function (error, results, fields) {
    if (error) throw error;
  }
);
console.log(query.sql);

// will wait if previously enqueued queries
connection.end();
