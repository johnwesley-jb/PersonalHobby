const Picture = require("../model/picture");
const callbackify = require("util").callbackify;
const ObjectId = require("mongodb").ObjectId;

const serverError = (res, error) => {
  res.status(500).json({ error: "Internal server error" });
};

const error404 = (res, error) => {
  res.status(404).json({ error: "Not found" });
};

const successMsg = (res, data) => {
  res.status(200).json(data);
};

exports.getAllPictures = (req, res) => {
  let offset = 0;
  let count = 10;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    offset = parseInt(req.query.count, 10);
  }
  // const findPictures = callbackify(Picture.find.bind(Picture));
  Picture.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, data) {
      res.status(200).json(data);
    });
};

exports.getPictureById = (req, res) => {
  const id = req.params.id;
  Picture.findById(id, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json(data);
    }
  });
};

exports.savePicture = (req, res) => {
  try {
    const pic = new Picture(req.body);
    pic.save();
    res.status(200).json(pic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePicture = (req, res) => {
  try {
    const deletedPic = Picture.findByIdAndDelete(req.params.id);
    if (!deletedPic) {
      return res.status(404).json({ error: process.env.PICTURE_NOT_FOUND });
    }
    res.status(200).json({ message: DELETE_SUCCESSFUL_MSG });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePicture = (req, res) => {
  const updatedPicture = callbackify(Picture.findByIdAndUpdate.bind(Picture));
  updatedPicture(
    req.params.id,
    req.body,
    {
      new: true,
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (data === null) {
          res.status(404).send("Picture not found");
        } else {
          res.status(200).json(data);
        }
      }
    }
  );
};

const _updatePublisher = (body) => {
  const verifiedAttributes = {};
  for (const attribute in body) {
    if (body[attribute] !== null) {
      verifiedAttributes[attribute] = body[attribute];
    }
  }

  return verifiedAttributes;
};

exports.partialUpdatePicture = (req, res) => {
  const updateData = _updatePublisher(req.body);
  const id = req.params.id;
  //console.log(updateData);
  Picture.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData },
    (err, result) => {
      if (err) {
        return res.status(500).send("Error updating Attributes");
      }
      res.status(200).json(result);
    }
  );
};
