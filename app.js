const note = require("./notes");
const yargs = require("yargs");
const chalk = require("chalk");

yargs.version("1.1.0");

// create add command
yargs.command({
  command: "add",
  describe: "add new note",
  builder: {
    title: {
      describe: "notes title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "notes description",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    note.addNote(argv.title, argv.body);
  },
});

// create remove command
yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      describe: "notes title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    note.removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "listing all notes",
  handler: () => {
    note.getNotes();
  },
});

yargs.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: {
      describe: "note titile",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    note.readNote(argv.title);
  },
});

yargs.parse();
