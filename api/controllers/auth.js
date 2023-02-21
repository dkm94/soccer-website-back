const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET_KEY;

exports.register = (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, 10);
    const {email, password, isAdmin, isActive} = req.body;
    let admin = new User ({
        ...req.body,
        password: hash,
        isAdmin: true,
        isActive: false,
    });
    if(!email || !password || !isAdmin || !isActive){
        return res.status(422).json({error: "Merci de renseigner tous les champs."}) //  syntax of the request entity is correct but was unable to process the contained instructions
    } else 
        admin.save()
            .then(data => res.status(200).json(data))
            .catch(err => console.log(err))  
}


exports.login = (req, res) => {
    User.findOne({ 
        email: req.body.email
    }, (err, user) => {
        if(err) return res.status(500).json(err); // err serveur
        if(!user) {
            return res.status(404).json({ // not found
                auth: false,
                error: "Utilisateur introuvable, veuillez vérifier vos identifiants."
            })
        } else {
            // user.isActive = true;
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (!result)
                {
                    res.status(401).json({ // Unauthorized (password couldn't match)
                        auth: false, 
                        error: "Mot de passe incorrect. Merci de vérifier vos identifiants."});
                            
                } else if (err) {
                    return res.status(500).json(err);
                } else  {
                    var token = jwt.sign({ 
                        id: user._id, 
                        isAdmin: user.isAdmin,
                        profile: user?.id_profile,
                        isActive: user.isActive
                    }, jwt_secret
                    );
                    res.status(200).json({
                        auth: true, 
                        token,
                        user: user.email,
                        isAdmin: user.isAdmin,
                        message: "Vous pouvez à présent accéder à votre compte."
                    });
                }
            })
        }
    });

}