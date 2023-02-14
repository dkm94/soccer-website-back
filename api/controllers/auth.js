const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('./UserController');
const jwt_secret = process.env.JWT_SECRET_KEY;

exports.register = (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, 10);
    const {email, password, admin, profile} = req.body;
    let user = new User ({
        ...req.body,
        password: hash,
        admin: true,
        profile: null
    });
    if(!email || !password || !admin){
        return res.status(422).json({error: "Merci de renseigner tous les champs."})
    } else 
        user.save()
            .then(data => res.status(200).json(data))
            .catch(err => console.log(err))  
}


exports.login = function(req, res) {
    User.findOne({ 
        email: req.body.email
    },function(err, user){
        if(err)
            res.status(400).json({auth: false, message: "Echec connexion."});
        else {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                console.log(result);
                if (!result)
                {
                    res.status(400).json({auth: false, message: "Echec connexion. Merci de vérifier vos identifiants."});
                            
                } else {
                    var token = jwt.sign({ 
                        id: user._id, 
                        admin: user.alias,
                        profile: user.id_profile
                    }, jwt_secret
                    );
                    res.status(200).json({
                        auth: true, 
                        token, 
                        profile: user.id_profile,
                        message: "Vous pouvez à présent accéder à votre compte."});
                }
            
                    
            })
        }
    });

}