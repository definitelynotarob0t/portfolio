"use client"

import { useState } from 'react';
import { ChangeEvent } from 'react'; 
import { SyntheticEvent } from 'react';
import { FaGithub } from 'react-icons/fa';

const ContactMe = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const [status, setStatus] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setStatus('Sending...');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 429) {
                setStatus("Too many requests. Please try again later.");
            } else if (response.ok) {
                await response.json(); 
                setStatus('Message sent successfully!');
            } else {
                setStatus('Error sending message. Please try again.');
            }
        } catch (error) {
            setStatus('Error sending message. Please try again.');
        }
    };

    return (
        <div className="contact-container">
            <div style={{display: 'flex'}}>
                <div className="contact-text">
                    <h2 style={{textAlign: 'left', margin: '0'}}> Contact me </h2>
                    <p style={{margin: '0'}}>
                        I am very excited for any opportunity to delve deeper into the world and work of software.  
                    <br/>
                        If you have any questions, comments, ...job opportunities, or just want to say hello, please feel free to reach out.
                        <br/>Thank you for visiting my page.
                        <br />
                        <a href="https://github.com/definitelynotarob0t" className="github-link">< FaGithub size={20} /></a>
                    </p>
                </div>
                    <div >
                    <form onSubmit={handleSubmit} className="contact-form">
                        <label>
                            <input
                                type="text"
                                name="name"
                                placeholder="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            <textarea
                                name="message"
                                placeholder="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </label>
                        <button type="submit">Send</button>
                    </form>
                    {status && <p>{status}</p>}
                </div>
            </div>

        </div>
                  
    );
};

export default ContactMe;
