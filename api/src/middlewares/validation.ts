import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Middleware para validar o body da requisição
export const validateBody = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Dados de entrada inválidos",
          errors: (error as z.ZodError).issues.map((err: any) => ({
            campo: err.path.join("."),
            mensagem: err.message,
          })),
        });
      }
      next(error);
    }
  };
};

// Middleware para validar parâmetros da URL
export const validateParams = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedParams = schema.parse(req.params);
      (req as any).params = validatedParams;
      next();
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Parâmetros inválidos",
          errors: (error as z.ZodError).issues.map((err: any) => ({
            campo: err.path.join("."),
            mensagem: err.message,
          })),
        });
      }
      next(error);
    }
  };
};

// Middleware para validar query parameters
export const validateQuery = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedQuery = schema.parse(req.query);
      (req as any).query = validatedQuery;
      next();
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Parâmetros de consulta inválidos",
          errors: (error as z.ZodError).issues.map((err: any) => ({
            campo: err.path.join("."),
            mensagem: err.message,
          })),
        });
      }
      next(error);
    }
  };
};
