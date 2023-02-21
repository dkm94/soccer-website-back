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