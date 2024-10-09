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
            <div className="about-me-text">
                <h2 className="about-me-header" style={{fontSize: '50px'}}> Hello WORLD <br /> </h2>
                <div className="about-me-header">I'M BRIANNA <p style={{fontSize: '20px', display: 'inline', color: "rgba(65, 64, 115, 0.656)"}}>(she/her)</p></div>
                <p > I'm a self-taught software developer with experience in full-stack development. </p>
                <p> 
                    I graduated with a Bachelor of Arts from the University of Melbourne in 2022, and after trying consulting and working in education, I found my passion in software development. 
                    I began my self-directed study in 2023 and have been learning ever since. 
                </p>
                <p> When I'm not at my computer, I love hiking, camping, reading and running.  </p>               
                {/* <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <img src="/images/IMG_1442_Original.jpg" width="250"/>
                    <img src="/images/IMG_3420.jpg" width="250"/>
                    <img src="/images/IMG_7464.jpg" width="250"/>
                </div> */}
            </div>

        </div>
    )
}

export default AboutMe