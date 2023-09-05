const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto")

const contactsPath = path.join(__dirname, "db/contacts.json");

console.log(contactsPath);

function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

    return JSON.parse(data);

}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const oneContact = contacts.find((contact) => contact.id === contactId);
    return oneContact || null;
  
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [deletedContact] = contacts.splice(index, 1)
  
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
}


async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);
    await write(contacts);
    return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
