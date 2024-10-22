"use client"

import { useEffect, useRef, useState } from 'react';
import { ChangeEvent } from 'react'; 
import { SyntheticEvent } from 'react';
import { FaGithub } from 'react-icons/fa';
import DOMPurify from 'dompurify'; 

const ContactMe = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const targetRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            // Check if the element is in view
            setIsVisible(entry.isIntersecting);
          },
          {
            threshold: 0.1, // Trigger when 10% of the element is visible
          }
        );
    
        if (targetRef.current) {
          observer.observe(targetRef.current);
          ;
        }
    
        return () => {
          if (targetRef.current) {
            observer.unobserve(targetRef.current);
          }
        };
      }, []);



    const sanitizeInput = (value: string) => {
        return DOMPurify.sanitize(value);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: sanitizeInput(value),
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
        <div  ref={targetRef} className={`contact-container ${isVisible ? "fade-in" : ""}`}>
        <div className="contact-text">
                <h2 style={{textAlign: 'left', margin: '0'}}> Contact me </h2>
                <p style={{margin: '0'}}>
                    I am very excited for any opportunity to delve deeper into the world and work of software.  
                <br/>
                    If you have any questions, comments, ...job opportunities, or just want to say hello, please feel free to reach out.
                    <br/>Thank you for visiting my page.
                    <br />
                </p>
            </div>
            <div>
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
            </div>
            {status && <p>{status}</p>}

        </div>
                  
    );
};

export default ContactMe;
