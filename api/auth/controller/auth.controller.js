const token = require("../helper/jwt-token");

//create token for valid user.
exports.getToken = async (req, res, next) => {

    try {
        const pemail = req.body.email;
        const ppassword = req.body.password;    

        if (pemail == null || ppassword == null)
            return res.status(401).json({ message: 'unauthorised' });

        await token.authenticate(pemail, ppassword,req,res);

    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}