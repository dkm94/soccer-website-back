const User = require("../models/User");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET_KEY;
const getError = require("../utils/handleErrorMessages");

const regex =
  /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

exports.createAdmin = async (req, res, next) => {
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

    const admin = new User({
      ...req.body,
      password: hash,
      isAdmin: true,
      isMod: true,
      user: false, // 1st log: Dear admin, welcome. You can now, activate your user profile. => true
      id_profile: newProfile._id,
    });
    const newAdmin = await admin.save();

    return res.status(200).send({
      message: "Admin created successfully !",
      data: newAdmin,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(422).send(getError("empty"));
      return;
    }
    const registeredUser = await User.findOne({ email });
    if (!registeredUser) {
      res.status(404).json(getError("userNotFound"));
      return;
    }
    bcrypt.compare(password, registeredUser.password, (err, result) => {
      if (!result) {
        res.status(401).json(getError("password"));
        return;
      } else if (err) {
        res.status(500).json(getError("internalErrorServer"));
        return;
      } else {
        let token = jwt.sign(
          {
            id: registeredUser._id,
            isAdmin: registeredUser.isAdmin,
            profileId: registeredUser.id_profile,
            accountValidated: registeredUser.accountValidated,
            isMod: registeredUser.isMod,
            userId: registeredUser._id,
            user: registeredUser.email,
          },
          jwt_secret
        );
        res.status(200).json({
          auth: true,
          token,
          message: "Redirection...",
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.validateAccount = async (req, res, next) => {
  try {
    const mod = await User.findOne({ _id: req.params.id });
    if (!mod) {
      res.sendStatus(404);
      return;
    }
    const result = await User.updateOne(
      { _id: req.params.id },
      { $set: { accountValidated: true } },
      { runValidators: true }
    );
    if (!result.modifiedCount) {
      res.status(404).send(getError("fail"));
      return;
    }
    res.status(204).send(result);
  } catch (err) {
    next(err);
  }
};
