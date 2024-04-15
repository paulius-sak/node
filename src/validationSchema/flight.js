import Joi from "joi"

const flightSchema = Joi.object({
    price: Joi.number().required(),
  departureCity: Joi.string().required(),
  destinationCity: Joi.string().required(),
  destinationCityPhotoUrl: Joi.string().required(),
  departureTime: Joi.date().required().default(Date.now)
})

export default flightSchema