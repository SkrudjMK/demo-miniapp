const express = require("express");
const router = express.Router();

const {
    getOrCreateUser,
    updateBalance
} = require("../services/userService");

router.get("/:id", (req, res) => {
    const user = getOrCreateUser({
        id: Number(req.params.id),
        username: req.query.username || "",
        firstName: req.query.firstName || ""
    });

    res.json({
        success: true,
        user
    });
});

router.post("/balance", (req, res) => {
    const { id, balance } = req.body;

    const user = updateBalance(Number(id), Number(balance));

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.json({
        success: true,
        user
    });
});

module.exports = router;
