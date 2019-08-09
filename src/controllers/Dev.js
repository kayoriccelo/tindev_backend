const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async create(req, res) {
        const { username: user } = req.body;

        const userExists = await Dev.findOne({ user });

        if (userExists) {
            return res.json(userExists)
        }

        const response = await axios.get(`https://api.github.com/users/${user}`);

        const { name, bio, avatar_url: avatar} = response.data

        const dev = await Dev.create({
            name,
            user,
            bio,
            avatar
        })

        return res.json(dev);
    }
};