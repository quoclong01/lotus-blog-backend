import Joi from 'joi';

export default {
  addFollower: Joi.object().keys({
    followingId: Joi.number().required()
  })
};
