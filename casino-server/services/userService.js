const path = require("path");
const { readJSON, writeJSON } = require("../utils/db");

const USERS_FILE = path.join(__dirname, "../database/users.json");

function getAllUsers() {
    return readJSON(USERS_FILE);
}

function saveAllUsers(users) {
    writeJSON(USERS_FILE, users);
}

function getUser(id) {
    const users = getAllUsers();
    return users.find(user => user.id === id);
}

function createUser(data) {
    const users = getAllUsers();

    const user = {
        id: data.id,
        username: data.username || "",
        firstName: data.firstName || "",
        balance: 1000,
        level: 1,
        xp: 0,
        games: 0,
        wins: 0,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
    };

    users.push(user);
    saveAllUsers(users);

    return user;
}

function getOrCreateUser(data) {
    let user = getUser(data.id);

    if (!user) {
        user = createUser(data);
    }

    return user;
}

function updateBalance(id, balance) {
    const users = getAllUsers();

    const user = users.find(u => u.id === id);

    if (!user) {
        return null;
    }

    user.balance = balance;
    user.lastLogin = new Date().toISOString();

    saveAllUsers(users);

    return user;
}

module.exports = {
    getUser,
    createUser,
    getOrCreateUser,
    updateBalance
};
