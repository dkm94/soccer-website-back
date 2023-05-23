const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const User = require("../models/User");
const getError = require("../utils/handleErrorMessages");
// const fs = require("fs");
const cloudinary = require("../utils/cloudinary-config");
// const Article = require("../models/Article");

const regex =
  /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

//****** USER ********
exports.updatePassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    const isInvalid = password?.match(regex) == null; // true for no match, false for match
    if (isInvalid) {
      res.status(400).send(getError("passwordRegex"));
      return;
    }

    let hash = bcrypt.hashSync(password, 10);

    const result = await User.updateOne(
      { _id: req.params.id },
      { $set: { password: hash } },
      { runValidators: true }
    );

    if (!result.modifiedCount) {
      res.status(404).send(getError("fail"));
      return;
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

//****** PROFILE ********
exports.editProfile = async (req, res, next) => {
  try {
    const trimmedId = req.params.id.trim();
    const profile = await Profile.findOne({ _id: trimmedId });

    if (!profile) {
      res.status(404).json({ message: "This profile doesn't exist" });
      return;
    }

    // let newPath = null;
    // if (req.file) {
    //   const { originalname, path } = req.file;
    //   const parts = originalname.split(".");
    //   const extension = parts[parts.length - 1];
    //   newPath = path + "." + extension;
    //   fs.renameSync(path, newPath);
    // }

    const file = req.body.file;

    if (req.body.file !== "") {
      const imgId = profile.file.public_id;
      if (imgId) {
        await cloudinary.uploader.destroy(imgId);
      }
    }

    const newImg = await cloudinary.uploader.upload(file, {
      folder: "soccer-avatars",
      width: 1000,
      crop: "scale",
    });

    const result = await Profile.updateOne(
      { _id: req.params.id },
      // { $set: { ...req.body, file: newPath ? newPath : profile.file } },
      {
        $set: {
          ...req.body,
          file: {
            public_id: newImg.public_id,
            url: newImg.secure_url,
          },
        },
      },
      { runValidators: true, new: true }
    );

    const { matchedCount, modifiedCount } = result;
    if (!modifiedCount && !matchedCount) {
      res.status(404).send(getError("fail"));
      return;
    }

    res.send("Profile updated successfully !");
  } catch (err) {
    next(err);
  }
};
