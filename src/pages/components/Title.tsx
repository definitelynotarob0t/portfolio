"use client"

import { useEffect, useState, useRef } from "react";

const Title = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const fullName = "Brianna Spinks"; // The full name
    const [displayName, setDisplayName] = useState("B_____________"); // Underscores matching the name length
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
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            let currentIndex = 0;
            const typingInterval = setInterval(() => {
                // Replace the next underscore with the correct letter
                setDisplayName((prev) => 
                    prev.substring(0, currentIndex) + fullName[currentIndex] + prev.substring(currentIndex + 1) 
                );
                currentIndex++;
                // Clear interval when the entire name has been revealed
                if (currentIndex + 1 >= fullName.length) {
                    clearInterval(typingInterval);
                }
            }, 150); 
        }
    }, [isVisible, fullName]);



    return (
        <div ref={targetRef} className="section">
            <h1 className="my-name">
                {displayName}
            </h1>
            <h2 style={{ textAlign: 'left' }}>
                Full-stack <br />
                web developer
            </h2>
        </div>
    );
}

export default Title;
