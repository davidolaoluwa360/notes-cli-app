const fs = require("fs");
const chalk = require("chalk");

const saveNote = (notes) => {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
  return loadNotes();
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString("utf8");
    const data = JSON.parse(dataJSON);
    return data;
  } catch (e) {
    return [];
  }
};

exports.getNotes = () => {
  console.log(chalk.white.inverse.bold(loadNotes()));
};

exports.addNote = (title, body) => {
  const notes = loadNotes();
  const titleExist = notes.filter((note) => {
    return note.title.toLocaleLowerCase() === title.toLocaleLowerCase();
  });

  debugger;

  if (titleExist.length > 0) {
    console.log(chalk.red.inverse.bold("Note title taken"));
  } else {
    notes.push({
      title: title,
      body: body,
    });
    console.log(chalk.white.inverse.bold(saveNote(notes)));
    console.log(chalk.green.inverse.bold("Note added"));
  }
};

exports.removeNote = (title) => {
  let notes = loadNotes();
  let notesToKeep = notes.filter((note) => {
    return note.title.toLocaleLowerCase() !== title.toLocaleLowerCase();
  });
  if (notes.length > notesToKeep.length) {
    console.log(chalk.white.inverse.bold(saveNote(notesToKeep)));
    console.log(chalk.green.inverse.bold("Note removed"));
  } else {
    console.log(chalk.red.inverse.bold("No Note Found"));
  }
};

exports.readNote = (title) => {
  const notes = loadNotes();
  const findNote = notes.find((note) => {
    return note.title.toLocaleLowerCase() === title;
  });
  if (!findNote) {
    console.log(chalk.red.inverse.bold("Note not found"));
  } else {
    console.log(chalk.white.inverse.bold(findNote.body));
  }
};
