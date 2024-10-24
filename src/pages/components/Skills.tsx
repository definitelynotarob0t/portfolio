import { useEffect, useRef, useState } from 'react';
import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs, FaPython, FaAws } from 'react-icons/fa';
import { SiTypescript, SiRedux, SiNextdotjs, SiMongodb, SiPostgresql } from 'react-icons/si';

const skills = [
    { icon: <FaJs size={50} />, label: 'JavaScript' },
    { icon: <SiTypescript size={50} />, label: 'TypeScript' },
    { icon: <FaPython size={50} />, label: 'Python' },
    { icon: <FaHtml5 size={50} />, label: 'HTML5' },
    { icon: <FaCss3 size={50} />, label: 'CSS3' },
    { icon: <FaReact size={50} />, label: 'React' },
    { icon: <SiRedux size={50} />, label: 'Redux' },
    { icon: <FaNodeJs size={50} />, label: 'Node.js' },
    { icon: <SiMongodb size={50} />, label: 'MongoDB' },
    { icon: <SiPostgresql size={50} />, label: 'PostgreSQL' },
    { icon: <SiNextdotjs size={50} />, label: 'Next.js' },
    { icon: <FaAws size={50} />, label: 'AWS'}
];

const Skills = () => {
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
        <div  ref={targetRef} className={`skills-container ${isVisible ? "fade-in" : ""}`}>
            <h1>My toolkit</h1>
            <div className="skills-grid">
                {skills.map((skill, index) => (
                    <div className="skill" key={index}>
                        {skill.icon}
                        <p>{skill.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Skills;
