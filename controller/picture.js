const Picture = require("../model/picture");
const callbackify = require("util").callbackify;

exports.getAllPictures = (req, res) => {
  let offset = 0;
  let count = 10;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 0);
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

// const findPictures = callbackify(Picture.findById.bind(Picture));
// findPictures(id, (err, data) => {
//   if (err) {
//     res.status(500).send(err);
//   } else {
//     res.json(data);
//   }
// });

exports.savePicture = (req, res) => {
  try {
    const pic = new Picture(req.body);
    pic.save();
    res.status(200).json(pic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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

// exports.updatePicture = async (req, res) => {
//   try {
//     const updatedPicture = await Picture.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//       }
//     );
//     if (!updatedPicture) {
//       return res.status(404).json({ error: process.env.PICTURE_NOT_FOUND });
//     }
//     res.status(200).json(updatedPicture);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

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
          res.json(data);
        }
      }
    }
  );
};
