const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { id } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(id);
        const targetDev = await Dev.findById(user);

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        };

        if (targetDev.likes.includes(loggedDev._id)) {
            const loggedSocket = req.connectedUsers[id];
            const targetSocket = req.connectedUsers[user];

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetDev);
            };

            if (targetSocket) {
                req.io.to(targetSocket).emit('match', loggedDev);
            };
        };

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
}; 