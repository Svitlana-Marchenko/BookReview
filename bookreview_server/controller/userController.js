const userService = require('../service/userService');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser =async (req, res) => {
    const { name, lastname, email, password, role } = req.body;

    if (!name || !lastname || !email || !password || !role) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await userService.findUserByEmail(email);
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
        name,
        lastname,
        email,
        password: hashedPassword,
        role
    };

    try {
        const user = await userService.createUser(data);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await userService.findUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    name: user.name,
                    lastname: user.lastname,
                    role: user.role,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "50m" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("email or password is not valid");
    }
};

const currentUser = async (req, res) => {
    res.json(req.user);
};

const createAdmin =async (req, res) => {
    const { name, lastname, email, password} = req.body;

    if (!name || !lastname || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await userService.findUserByEmail(email);
    if (userAvailable) {
        res.status(400);
        throw new Error("User with this email was already registered");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
        name,
        lastname,
        email,
        password: hashedPassword,
        role: "ADMIN"
    };

    try {
        const user = await userService.createUser(data);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    createAdmin
};