const getError = require("../../utils");
const Article = require("../models/Article");

module.exports = async (req, res, next) => {
  try {
    const trimmedId = req.params.id.trim();
    const article = await Article.findOne({ _id: trimmedId });

    const articleProfileId = JSON.stringify(article.id_profile);
    const profileId = JSON.stringify(res.locals.profileId);

    if (articleProfileId !== profileId) {
      res.status(401).send(getError("unauthorized"));
      return;
    } else {
      next();
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).send(getError("invalidValue"));
    }
    return res.status(500).send(getError("internalErrorServer"));
  }
};
