import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { applyRateLimiter, runMiddleware } from '../../lib/rateLimiter';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
     // Apply rate limiting middleware
     await runMiddleware(req, res, applyRateLimiter);

    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASS,
            },
        });

        try {
            await transporter.sendMail({
                from: email,
                to: process.env.EMAIL_USER,
                subject: `New message from ${name}`,
                text: message,
                html: `<p>You have a new message from your portfolio website:</p>
                       <p><strong>Name:</strong> ${name}</p>
                       <p><strong>Email:</strong> ${email}</p>
                       <p><strong>Message:</strong> ${message}</p>`,
            });

            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to send email.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed.' });
    }
}
