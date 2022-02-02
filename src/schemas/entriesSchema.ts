import joi from 'joi';

const entrySchema = joi.object({
    description: joi.string().required(),
    value: joi.number().precision(2).required(),
    category: joi.number()
});

export {
    entrySchema
}