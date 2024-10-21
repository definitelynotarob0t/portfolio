import { useEffect, useRef, useState } from 'react';


const certificates = [
  { title: 'JavaScript', src: '/certificates/FreeCodeCamp_Javascript.png' },
  { title: 'Python', src: '/certificates/FreeCodeCamp_Python.png' },
  { title: 'Full Stack', src: '/certificates/FullStackOpen_parts0-7.png' },
  { title: 'Relational Databases', src: '/certificates/FullStackOpen_Relational-Databases.png' },
  { title: 'TypeScript', src: '/certificates/FullStackOpen_TypeScript.png' },
];

const CertificatesLinks = () => {
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
    <div  ref={targetRef} className={`certificates-container ${isVisible ? "fade-in" : ""}`}>
    <h1 style={{marginBottom: '-5px'}}>Certificates</h1>
      <p style={{marginTop: '0px', fontSize:"15px", color: "rgba(65, 64, 115, 0.556)"}}>(click on one to download)</p>
      <div className="certificates-grid">
          {certificates.map((cert, index) => (
              <div className="certificate-item" key={index}>
                  {cert.title}
                  <a href={cert.src} download>
                    <img src={cert.src} width="130" alt={`${cert.title} Certificate`} />
                  </a>
              </div>
          ))}
      </div>
  </div>
)};

export default CertificatesLinks;
