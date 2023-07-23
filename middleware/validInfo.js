module.exports = (req, res, next) => {
    const { email, name, password } = req.body;

    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if(req.path === "/register") {
        if(email.length === 0 || password.length === 0 || name.length === 0) {
            return res.status(401).json("Missing Crednetials");
        }
        else if(!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    }
    else if(req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        }
        else if (!validEmail(email)){
            return res.status(401).json("Invalid Email");
        }
    }    
    next();
};