import type * as express from 'express';
import { Users } from 'src/generated/prisma/client';

declare global {
  namespace Express {
    export interface Request {
      user?: Users;
    }
  }
}
