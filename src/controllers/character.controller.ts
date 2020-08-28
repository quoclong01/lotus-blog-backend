import { Request, Response, NextFunction } from 'express';
import { Character } from '../models/Character';
import { responseMiddleware } from '../lib/utils';

const defaultSize = 10;

const characterController = {
  index: responseMiddleware(async (req: Request, res: Response, next: NextFunction) =>  {
    // default limit 10 records
    const size = +req.query.size || defaultSize;
    const offset = +req.query.offset || 0;
    // get n record from offset
    const data = await Character.findAll({
      limit: size,
      offset,
      order: [ ['createdAt', 'DESC'] ]
    });
    // get total record
    const length = await Character.count();
    /**
     * Validate for load more
     * if loaded records less than total records, turn on load more
     * loaded records calculate from the offset combined with items per page
     */
    const status = (offset + size) < length;
    return { characters: data, loadMore: status };
  }),
  new: responseMiddleware(async (req: Request, res: Response, next: NextFunction) =>  {
    return await Character.createCharacter(req.body);
  }),
  show: responseMiddleware( async (req: Request, res: Response, next: NextFunction) =>  {
    return await Character.findOne({
      where: { id: req.params.id }
    });
  }),
  updateAge: responseMiddleware(async (req: Request, res: Response, next: NextFunction) =>  {
    return Character.updateAge(req.params.id);
  }),
  delete: responseMiddleware(async (req: Request, res: Response, next: NextFunction) =>  {
    return Character.removeCharacter(req.params.id);
  })
};

export default characterController;