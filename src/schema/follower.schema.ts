import Joi from 'joi';

export default {
  addFollower: Joi.object().keys({
    followerId: Joi.number().required()
  })
};
