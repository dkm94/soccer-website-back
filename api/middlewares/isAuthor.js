const getError = require("../../utils");
const Article = require("../models/Article");

module.exports = async (req, res, next) => {
  try {
    const trimmedId = req.params.id.trim();
    const article = await Article.findOne({ _id: trimmedId });

    if (!article) {
      res.sendStatus(404);
      return;
    }
    const articleProfileId = JSON.stringify(article.id_profile);
    const profileId = JSON.stringify(res.locals.profileId);

    if (articleProfileId !== profileId) {
      res.status(401).send(getError("unauthorized"));
      return;
    } else {
      next();
    }
  } catch {
    res.sendStatus(401);
  }
};
