const Joi = require('joi');

module.exports = (schema) => {
    return async (req, res, nxt) => {
        const result = schema.validate({
            params: req.params,
            body: req.body,
            query: req.query,
        });
    
        if (result.error) {
            res.send(400, result.error);
        } else {
            nxt();
        }
    };
};