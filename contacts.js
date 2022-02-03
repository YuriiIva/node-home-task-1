const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

/*
 * Раскомментируй и запиши значение
 * const contactsPath = ;
 */

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((data) => {
      console.table(data);
    });
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((data) => {
      const contact = data.filter((elem) => +elem.id === contactId);
      console.table(contact);
    });
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((data) => {
      const contact = data.filter((elem) => +elem.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(contact));
    });
  listContacts();
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((data) => {
      const contact = [...data, { name, email, phone, id: uid() }];
      fs.writeFile(contactsPath, JSON.stringify(contact));
    });
  listContacts();
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
