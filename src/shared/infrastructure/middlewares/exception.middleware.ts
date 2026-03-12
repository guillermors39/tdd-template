import { ErrorRequestHandler, Response } from 'express';
import z, { ZodError } from 'zod';

export const exceptionHandler: ErrorRequestHandler = (error: unknown, req, res, next) => {
    if (error instanceof ZodError) {
        res.status(400).json({
            success: false,
            message: 'Bad request',
            errors: z.treeifyError(error),
        });
    } else {
        if (!next) {
            const response = req as unknown as Response;

            response.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
};
