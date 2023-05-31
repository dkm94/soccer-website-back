const User = require("../models/User");
const Profile = require("../models/Profile");
const getError = require("../utils/handleErrorMessages");
const Article = require("../models/Article");

const findUserById = (id) => {
  const currentUser = User.findOne({ _id: id });
  return currentUser;
};

const findArticleById = (id) => {
  const currentArticle = Article.findOne({ _id: id });
  return currentArticle;
};

const findSelectedUsers = async (_id) => {
  const selectedUsers = await User.find({ _id: { $in: _id } });
  return selectedUsers;
};

exports.createMod = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    let newProfile, newMod;

    const profile = new Profile({
      name,
    });
    newProfile = await profile.save();

    if (newProfile) {
      const mod = new User({
        email: `${email}@twolefoot.fr`,
        isAdmin: false,
        isMod: true,
        accountValidated: false, // 1st log: Welcome mod, you can now activate your profile.
        id_profile: newProfile._id,
      });
      newMod = await mod.save();
    }

    res.status(200).json({
      success: true,
      message: "Account created successfully !",
      data: newMod,
    });
  } catch (err) {
    next(err);
  }
};

exports.isMod = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentUser = await findUserById(id);
    if (!currentUser) {
      res
        .status(404)
        .send({ success: false, message: "Oops, this user doesn't exist" });
      return;
    }

    const result = await User.updateOne(
      { _id: id },
      { $set: { isMod: !currentUser.isMod } },
      { runValidators: true }
    );
    const { matchedCount, modifiedCount } = result;
    if (!modifiedCount && !matchedCount) {
      res.status(404).send(getError("fail"));
      return;
    }

    return res
      .status(204)
      .send({ success: true, message: "Mod updated successfully !" });
  } catch (err) {
    next(err);
  }
};

exports.isFeatured = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentArticle = await findArticleById(id);
    if (!currentArticle) {
      res
        .status(404)
        .send({ success: false, message: "Oops, this post doesn't exist" });
      return;
    }

    const result = await Article.updateOne(
      { _id: id },
      { $set: { featured: !currentArticle.featured } },
      { runValidators: true }
    );
    const { matchedCount, modifiedCount } = result;
    if (!modifiedCount && !matchedCount) {
      res.status(404).send(getError("fail"));
      return;
    }

    res.send({ success: true, message: "Featured articles list updated !" });
  } catch (err) {
    next(err);
  }
};

exports.getModbyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mod = await findUserById(id);
    if (!mod) {
      res
        .status(404)
        .send({ success: false, message: "Oops, this user doesn't exist" });
      return;
    }
    return res.status(200).send(mod);
  } catch (err) {
    next(err);
  }
};

const deleteUserMods = async (_id) => {
  console.log("🚀 ~ file: AdminController.js:127 ~ deleteUserMods ~ _id:", _id);
  const result = await User.deleteMany({ _id: { $in: _id } });
  return result.deletedCount;
};

const findSelectedProfiles = async (profileIds) => {
  const profiles = await Profile.find({ _id: { $in: profileIds } });
  return profiles;
};

const deleteProfileMods = async (profileIds) => {
  console.log(
    "🚀 ~ file: AdminController.js:138 ~ deleteProfileMods ~ profileIds:",
    profileIds
  );
  const result = await Profile.deleteMany({ _id: { $in: profileIds } });
  return result.deletedCount;
};

exports.deleteMods = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const mods = await findSelectedUsers(_id);
    if (!mods || mods.length === 0) {
      res.status(404).send({
        success: false,
        message:
          "Oops, one or more of the moderators you are trying to remove do not exist",
      });
      return;
    }

    const deletedUserCount = await deleteUserMods(_id);
    if (!deletedUserCount) {
      res.status(404).send(getError("fail"));
      return;
    }

    const profileIds = mods.map((mod) => mod.id_profile.valueOf());
    const profiles = await findSelectedProfiles(profileIds);
    if (!profiles || profiles.length === 0) {
      res.status(404).send({
        success: false,
        message:
          "Oops, one or more of the profiles you are trying to remove do not exist",
      });
      return;
    }

    const deletedProfileCount = await deleteProfileMods(profileIds);
    if (!deletedProfileCount) {
      // res.status(404).send(getError("fail"));
      res.status(404).send("Erreur suppression profile");
      return;
    }

    res.send({ success: true, message: "Mod(s) deleted successfully!" });
  } catch (err) {
    next(err);
  }
};
