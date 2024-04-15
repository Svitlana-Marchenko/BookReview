const User = require('../model/UserModel');

const findUserByEmail = async (email) => {
    return User.findOne({email});
};

const createUser = async (data) => {
    const user = new User(data);
    return user.save();
};

const findAllUsers = async (query) => {
    return User.find(query);
};

const findUsersPagination = async (query, page, pageSize) => {
    const skip = (page - 1) * pageSize;
    return User.find(query).skip(skip).limit(pageSize);
}


const deleteUsers = async (query) => {
    return User.deleteMany(query);
};

const countUsers = async () => {
    return User.countDocuments();
};

const findUserById = async (id) => {
    return User.findById(id);
};

const updateUserById = async (id, updateData) => {
    const { name, lastname } = updateData;
    return User.findByIdAndUpdate(id, { name, lastname }, { new: true });
};


const deleteUserById = async (id) => {
    return User.findByIdAndDelete(id);
};

module.exports = {
    findUserByEmail,
    createUser,
    deleteUserById,
    deleteUsers,
    updateUserById,
    findUserById,
    findAllUsers,
    findUsersPagination,
    countUsers
};
