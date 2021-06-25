import Joi from 'joi';

export default {
  addFollower: Joi.object().keys({
    follower: Joi.string().required(),
    status: Joi.string().required()
  })
};
