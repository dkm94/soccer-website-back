const User = require('../models/User');
const Profile = require('../models/Profile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET_KEY;

const regex = /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

exports.createAdmin = async (req, res) => {
    try {
        let profile = new Profile({
            ...req.body,
            isActive: false
        })
        profile.save()
            .then(newProfile => {
                const {email, password, isAdmin, isActive} = req.body;
                if(!email || !password || !isAdmin || !isActive){
                    return res.status(422).json({"error": "Merci de renseigner tous les champs."})
                } else {
                    const isInvalid = password?.match(regex) == null; // true for no match, false for match
                    if(isInvalid) {
                        return res.status(400).json({ error : "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un nombre et caractère spécial." })
                    } else {
                        let hash = bcrypt.hashSync(password, 10);
                        let admin = new User ({
                            ...req.body,
                            password: hash,
                            isAdmin: true,
                            isActive: false,
                            id_profile: newProfile._id
                        });
                        admin.save()
                            .then(data => res.status(200).json(data))
                            .catch(err => console.log(err))
                    }    
                }
            })    
    } catch (e) {
        console.log(e)
    }  
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
                        profileId: user?.id_profile,
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