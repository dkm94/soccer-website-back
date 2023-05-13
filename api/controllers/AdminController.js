const User = require("../models/User");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const getError = require("../utils/handleErrorMessages");

const regex =
  /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

exports.createMod = async (req, res, next) => {
  try {
    const profile = new Profile({
      ...req.body,
    });
    const newProfile = await profile.save();
    const { password } = req.body;
    const isInvalid = password?.match(regex) == null; // true for no match, false for match
    if (isInvalid) {
      res.status(400).send(getError("passwordRegex"));
      return;
    }
    const hash = bcrypt.hashSync(password, 10);
    const mod = new User({
      ...req.body,
      // mail suffix
      password: hash,
      isAdmin: false,
      isMod: true,
      accountValidated: false, // 1st log: Welcome mod, you can now activate your profile.
      id_profile: newProfile._id,
    });
    const newMod = await mod.save();
    return res.status(200).json({
      message: "Account created successfully !",
      data: newMod,
    });
  } catch (err) {
    next(err)
  }
};

exports.isMod = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.sendStatus(404);
      return;
    }

    const result = await User.updateOne(
      { _id: req.params.id },
      { $set: { isMod: !user.isMod } },
      { runValidators: true }
    );
    if (!result.modifiedCount) {
      res.status(404).send(getError("fail"));
      return;
    }
    return res.status(204).send({ message: "Mod updated successfully !" });
  } catch (err) {
    next(err)
  }
};

exports.getModbyId = async (req, res, next) => {
  try {
    const mod = await User.findOne({ _id: req.params.id });
    if (!mod) {
      res.sendStatus(404);
      return;
    }
    return res.status(200).send(mod);
  } catch (err) {
    next(err)
  }
};

exports.deleteMod = async (req, res, next) => {
  try {
    const mod = await User.findOne({ _id: req.params.id });
    if (!mod) {
      res.status(404).send({ message: "Oops, this mod doesn't exist" });
      return;
    }

    const user_result = await User.deleteOne({ _id: req.params.id });
    if (!user_result.deletedCount) {
      res.status(404).send(getError("fail"));
      return;
    }

    const profile_result = await Profile.deleteOne({ _id: mod.id_profile });
    if (!profile_result.deletedCount) {
      res.status(404).send(getError("fail"));
      return;
    }

    return res.status(204).send({ message: "Mod deleted successfully !" });
  } catch (err) {
    next(err)
  }
};
