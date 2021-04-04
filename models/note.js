const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const NoteSchema = new Schema({
  userId: { type: String, default: null },
  characterId: { type: String, default: null },
  opponentCharacterId: { type: String, default: null },
  text: { type: String, default: "" },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const Note = model("note", NoteSchema);

module.exports = Note;
