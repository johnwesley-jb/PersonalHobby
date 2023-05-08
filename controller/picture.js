const Picture = require("../model/picture");
const callbackify = require("util").callbackify;

exports.getAllPictures = (req, res) => {
  const findPictures = callbackify(Picture.find.bind(Picture));
  findPictures((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(data);
    }
  });
};

exports.getPictureById = (req, res) => {
  const id = req.params.id;
  const findPictures = callbackify(Picture.findById.bind(Picture));
  findPictures(id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(data);
    }
  });
};
