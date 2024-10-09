import rateLimit from 'express-rate-limit';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequestHandler } from 'next/dist/server/next';

export const applyRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many requests, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, next: NextRequestHandler) =>
    new Promise((resolve, reject) => {
        next(req, res, (result: unknown) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
