"use client"

import { useEffect, useState, useRef } from "react";

const AboutMe = () => {
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
    

    return (
        <div  ref={targetRef} className={`about-me-container ${isVisible ? "fade-in" : ""}`}>
            <div style={{ flexBasis: '50%', border: '2px solid black'}} /> 
            <div className="about-me-text" >
            <div className="about-me-header">
                <h1>Hello WORLD <br /></h1>
                <div >I'M BRIANNA <p style={{fontSize: '20px', display: 'inline', color: "rgba(65, 64, 115, 0.656)"}}>(she/her)</p> </div>
            </div >
              <p > I'm a self-taught software developer with experience in full-stack development. </p>
              <p> 
                  I graduated with a Bachelor of Arts from the University of Melbourne in 2022, and after trying consulting and working in education, I found my passion in software development. 
                  I began my self-directed study in 2023 and have been learning ever since. 
              </p>
              <p> When I'm not at my computer, I love hiking, camping, reading and running.  </p>               
            </div>
          </div>
    )
}

export default AboutMe