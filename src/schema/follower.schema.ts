import Joi from 'joi';

export default {
  addFollower: Joi.object().keys({
    followedId: Joi.number().required()
  })
};
