import rateLimit from 'express-rate-limit';
import type { NextApiRequest, NextApiResponse } from 'next';

// Apply rate limiting middleware
export const applyRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many requests, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Helper to run middleware manually in Next.js
export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: unknown) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};
