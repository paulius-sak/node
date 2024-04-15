import Joi from "joi"

const cartSchema = Joi.object({
    date: Joi.string().required(),
    userEmail: Joi.string().required(),
    userId: Joi.string().required()
})

export default cartSchema