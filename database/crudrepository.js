let counter = 0;

let database = [
  { id: counter++, latitude: 60, longitude: 70 },
  { id: counter++, latitude: 40, longitude: 80 },
];

module.exports = {
  findAll: () => {
    return database;
  },
  findById: (id) => {
    return database.find((i) => i.id === Number(id));
  },
  deleteById: (id) => {
    let newDB = database.filter((i) => i.id != Number(id));
    response = database.length > newDB.length ? true : false;
    database = newDB;
    return response;
  },
  addItem: (item) => {
    item.id = counter++;
    database.push(item);
    return item;
  },
};
