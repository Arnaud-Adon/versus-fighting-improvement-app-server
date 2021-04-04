const User = require("../models/user");
const Note = require("../models/note");

exports.addCharacter = function (req, res, next) {
  const userId = req.body.userId;
  const characterId = req.body.characterId;

  User.findByIdAndUpdate(
    userId,
    {
      $push: {
        characters: {
          characterId,
          fightNumber: 0,
          victoryNumber: 0,
          defeatNumber: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    },
    { new: true },
    function (err, user) {
      if (err) {
        next(err);
      }
      if (user) {
        User.findOne({ _id: userId }, (err, updatedUser) => {
          if (err) {
            next(err);
          }
          if (updatedUser) {
            res.send({ user: updatedUser });
          } else {
            res.status(404).send({
              message: "Le personnage n'a pas pu être enregistré",
            });
          }
        });
      } else {
        res.status(404).send({
          message: "Le personnage n'a pas pu être enregistré",
        });
      }
    }
  );
};

exports.getNote = function (req, res, next) {
  console.log("req", req.body);
  const userId = req.body.data.userId;
  const characterId = req.body.data.characterId;
  const opponentCharacterId = req.body.data.opponentCharacterId;

  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      next(err);
    }
    if (user) {
      Note.find(
        {
          userId: userId,
          characterId: characterId,
          opponentCharacterId: opponentCharacterId,
        },
        (err, notes) => {
          if (err) {
            next(err);
          }
          if (notes) {
            res.json({ notes: notes });
          } else {
            res.status(404).send({ message: "Aucune note" });
          }
        }
      );
    } else {
      res.status(404).send({ message: "L'utilisateur n'a pas été trouvé" });
    }
  });
};

exports.addNote = function (req, res, next) {
  console.log("req", req.body);
  const userId = req.body.data.userId;
  const characterId = req.body.data.characterId;
  const opponentCharacterId = req.body.data.opponentCharacterId;
  const text = req.body.data.text;

  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      next(err);
    }
    if (user) {
      const note = new Note({
        userId: userId,
        characterId: characterId,
        opponentCharacterId: opponentCharacterId,
        text: text,
      });

      note.save((err, note) => {
        if (err) {
          next(err);
        }
        if (note) {
          res.json({ note: note });
        } else {
          res.status(404).send({ message: "La note n'a pas été ajoutée" });
        }
      });
    } else {
      res.status(404).send({ message: "L'utilisateur n'a pa été trouvé" });
    }
  });
};

exports.updateNote = function (req, res, next) {
  const userId = req.body.data.userId;
  const noteId = req.body.data.noteId;
  const text = req.body.data.text;

  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      next(err);
    }
    if (user) {
      Note.findOne({ _id: noteId }, (err, note) => {
        if (err) {
          next(err);
        }
        if (note) {
          note.update({ text: text, updatedAt: new Date() }, (err, result) => {
            if (err) {
              next(err);
            }
            if (result) {
              Note.findOne({ _id: noteId }, (err, noteUpdated) => {
                if (err) {
                  next(err);
                }
                if (noteUpdated) {
                  res.json({ note: noteUpdated });
                } else {
                  res
                    .status(404)
                    .send({ message: "La note modifiée n'a pas été trouvé" });
                }
              });
            }
          });
        }
      });
    } else {
      res.status(404).send({ message: "L'utilisateur n'a pas été trouvé" });
    }
  });
};

exports.deleteNote = function (req, res, next) {
  const userId = req.body.data.userId;
  const noteId = req.body.data.noteId;

  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      next(err);
    }
    if (user) {
      Note.findOne({ _id: noteId }, (err, note) => {
        if (err) {
          next(err);
        }
        if (note) {
          note.deleteOne({ _id: noteId }, (err) => {
            if (err) {
              next(err);
            } else {
              res.json({ note: note });
            }
          });
        }
      });
    } else {
      res.status(404).send({ message: "L'utilisateur n'a pas été trouvé" });
    }
  });
};
