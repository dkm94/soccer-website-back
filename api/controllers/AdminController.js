const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createMod = (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, 10);
    const {email, password, isAdmin, isActive} = req.body;
    let mod = new User ({
        ...req.body,
        password: hash,
        isAdmin: false,
        isActive: false
    });
    if(!email || !password || !isAdmin || !isActive){
        return res.status(422).json({"error": "Merci de renseigner tous les champs."})
    } else if (mod) {
        mod.save()
            .then(data => res.send(data))
            .catch(err => console.log(err))
    } else return res.status(500).json({"error": "L'opération n'a pas pu être traitée. Veuillez réessayer ultérieurement."})
          
}

exports.deactivateMod = async (req, res) => {
   try {
        const result = await User.updateOne({ _id: req.params.id },
            {$set: { isActive: req.body.isActive }})
            res.send(result)
            console.log("Mod has been updated successfully.")
   } catch (e) {
        console.log(e)
   }
}

exports.getAllMods = async (req, res) => {
    try {
        const mods = await User.find({ isAdmin: false })
        if(mods) return res.status(200).json(mods);
        if(!mods) return res.status(204).json({ message: "No users found"});
    } catch (e) {
        console.log(e)
    }
}

exports.getModbyId = async (req, res) => {
    try {
        const mod = await User.findOne({ _id: req.params.id })
        if(mod) return res.status(200).json(mod);
        if(!mod) return res.status(204).json({ message: "User not found."});
    } catch (e) {
        console.log(e)
    }
}
