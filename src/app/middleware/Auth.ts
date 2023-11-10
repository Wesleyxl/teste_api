/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type Request, type Response, type NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import jwtConfig from "../../config/jwt";
import Funcionario from "../model/Funcionario";

declare module "express" {
  interface Request {
    matricula?: string;
  }
}
export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ["Unauthorized"] });
  }

  const [, token] = authorization.split(" ");

  if (!token || token === undefined) {
    return res.status(401).json({ errors: ["Unauthorized"] });
  }

  try {
    const data = jwt.verify(token, jwtConfig.jwt_secret) as JwtPayload;

    const { matricula } = data;

    const funcionario = await Funcionario.findOne({
      where: {
        matricula,
      },
    });

    if (!funcionario) {
      return res.status(401).json({
        errors: ["Unauthorized"],
      });
    }

    req.matricula = funcionario.matricula;

    next();
  } catch (e: any) {
    return res.status(401).json({
      errors: ["Unauthorized"],
    });
  }
};
