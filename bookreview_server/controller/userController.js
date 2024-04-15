const userService = require('../service/userService');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser =async (req, res) => {
    const { name, lastname, email, password} = req.body;

    if (!name || !lastname || !email || !password) {
        res.status(400).json({ message: "All fields are mandatory"});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email address" });
    }

    const userAvailable = await userService.findUserByEmail(email);
    if (userAvailable) {
        res.status(400).json({ message: "User already registered"});
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
        name,
        lastname,
        email,
        password: hashedPassword,
        role: "USER"
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
        res.status(400).json({ message: "All fields are mandatory"});
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
            { expiresIn: "1h" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401).json({ message: "email or password is not valid"});
    }
};

const currentUser = async (req, res) => {
    res.json(req.user);
};

const createAdmin =async (req, res) => {
    const { name, lastname, email, password} = req.body;

    if (!name || !lastname || !email || !password) {
        res.status(400).json({message: "All fields are mandatory"});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email address" });
    }

    const userAvailable = await userService.findUserByEmail(email);
    if (userAvailable) {
        res.status(400).json( {message: "User with this email was already registered"});
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

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.findUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'Користувача не знайдено' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, lastname } = req.body;
    try {
        const updatedUser = await userService.updateUserById(id, { name, lastname });
        if (!updatedUser) {
            return res.status(404).json({ error: 'Користувача не знайдено' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.deleteUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'Користувача не знайдено' });
        }
        res.status(200).json({ message: 'Користувач успішно видалено' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCount = async (req, res) => {
    try {
        const count = await userService.countUsers();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUsers = async (req, res) => {
    try {
        let query = {};
        if (Object.keys(req.query).length !== 0) {
            query = req.query;
        }
        await userService.deleteUsers(query);
        res.status(200).json({message: 'Users deleted successfully.'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 0;
        const sortBy = req.query.sortBy || '';
        const sortOrder = req.query.sortOrder || '';
        const search = req.query.search

        let query = {};
        if (Object.keys(req.query).length !== 0) {
            query = req.query;
            delete query.page;
            delete query.limit;
            delete query.sortBy;
            delete query.sortOrder;
            delete query.search

            if (search.length !== 0) {
                query = {...query,
                    $or: [
                        {name: {$regex: search, $options: 'i'}},
                        {lastname: {$regex: search, $options: 'i'}}
                    ]
                };
            }
        }

        let books;
        if (limit > 0) {
            books = await userService.findUsersPagination(query, page, limit, sortBy, sortOrder);
        } else {
            books = await userService.findAllUsers(query, sortBy, sortOrder);
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    createAdmin,
    deleteUser,
    updateUser,
    getUserById,
    getCount,
    deleteUsers,
    getUsers
};