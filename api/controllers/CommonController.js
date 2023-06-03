const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const User = require("../models/User");
const getError = require("../utils/handleErrorMessages");
// const fs = require("fs");
const cloudinary = require("../utils/cloudinary-config");
// const Article = require("../models/Article");

const regex =
  /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const findUserById = (id) => {
  const currentUser = User.findOne({ _id: id });
  return currentUser;
};
//****** USER ********
const checkPwd = async (pwd, userPwd) => {
  const validPwd = await bcrypt.compare(pwd, userPwd);
  return validPwd;
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password, newPwd, confirmPwd } = req.body;

    const currentUser = await findUserById(id);
    if (!currentUser) {
      res
        .status(404)
        .send({ success: false, message: "Oops, this user doesn't exist" });
      return;
    }

    const checkedPwd = await checkPwd(password, currentUser.password);
    if (!checkedPwd) {
      res.status(401).send(getError("password"));
      return;
    }

    const isInvalid = newPwd?.match(regex) == null; // true for no match, false for match
    if (isInvalid) {
      res.status(400).send(getError("passwordRegex"));
      return;
    }

    const passwordMatch = newPwd.trim() == confirmPwd.trim();
    if (!passwordMatch) {
      res.status(400).send(getError("confirmPassword"));
    }

    let hash = bcrypt.hashSync(newPwd, 10);

    const result = await User.updateOne(
      { _id: id },
      { $set: { password: hash } },
      { runValidators: true }
    );

    const { matchedCount, modifiedCount } = result;
    if (!modifiedCount && !matchedCount) {
      res.status(404).send(getError("fail"));
      return;
    }
    res.send({ success: true, message: "You password has been changed" });
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

    const inputFile = req.body.file;
    const profileImg = profile.file;

    let newImg;

    if (inputFile == "" || inputFile == undefined) {
      newImg = profileImg;
    }

    if (inputFile !== "" && inputFile !== undefined) {
      const imgId = profile.file.public_id;
      if (imgId) {
        await cloudinary.uploader.destroy(imgId);
      }
      const img = await cloudinary.uploader.upload(inputFile, {
        folder: "soccer-avatars",
        width: 350,
        // crop: "thumb",
      });

      newImg = {
        public_id: img.public_id,
        url: img.secure_url,
      };
    }

    const result = await Profile.updateOne(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
          file: newImg,
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
