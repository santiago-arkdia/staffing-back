import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AllowAnyIPMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Establece los encabezados CORS para permitir cualquier origen
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    // Continúa con la solicitud
    next();
  }
}
