import { ValidationError, validate } from 'class-validator';
import { Request, Response, NextFunction} from 'express';

export function dtoValidationMiddleware<T extends object>(type: new () => T): (
  req: Request, 
  res: Response,
  next: NextFunction
) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors: ValidationError[] = await validate(
      Object.assign(new type(), req.body)
    );

    if(errors.length > 0) {
      res.status(400).json(errors);
      return;
    }
    
    next();
  };
}