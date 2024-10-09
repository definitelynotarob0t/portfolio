"use client"

import { useEffect, useState, useRef } from "react";

const Title = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const fullName = "Brianna Spinks"; 
    const [displayName, setDisplayName] = useState("_".repeat(fullName.length)); // All underscores to match full name length

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            // Replace the next underscore with the correct letter
            setDisplayName((prev) => 
                prev.substring(0, currentIndex) + fullName[currentIndex] + prev.substring(currentIndex + 1)
            );
            currentIndex++;
            // Clear interval when the entire name has been revealed
            if (currentIndex  + 1 === fullName.length) {
                clearInterval(typingInterval);
            }
        }, 85); // 85ms per letter

        return () => clearInterval(typingInterval); // Cleanup interval on unmount
    }, [fullName]);

    return (
        <div ref={targetRef} className="section">
            <h1 className="my-name">
                {displayName} 
            </h1>
            <h2 className="title-description">
                <strong>
                    Full-stack <br />
                    web developer
                </strong>
            </h2>
        </div>
    );
}

export default Title;
