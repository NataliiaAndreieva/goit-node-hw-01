const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case "list":
          const allContacts = await contacts.listContacts();
          return console.table(allContacts);

      case "get":
          const getById = await contacts.getContactById(id);
          return console.log(getById);

      case "add":
          const addContact = await contacts.addContact(name, email, phone)
              return console.log(addContact);
  
      case "remove":
          const deletedContact = await contacts.removeContact(id);
          return console.log(deletedContact);
      
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

    