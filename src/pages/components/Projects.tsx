"use client"

import { useEffect, useState, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import Image from 'next/image';

const Projects = () => {
    const targetRefs = useRef<(HTMLDivElement | null)[]>([]); // Array of refs for each project-row
    const [visibility, setVisibility] = useState<boolean[]>([false, false, false]); // Visibility for each project

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const index = targetRefs.current.indexOf(entry.target as HTMLDivElement);
              if (index !== -1) {
                setVisibility((prev) => {
                  const newVisibility = [...prev];
                  newVisibility[index] = entry.isIntersecting;
                  return newVisibility;
                });
              }
            });
          },
          {
            threshold: 0.1, // Trigger when 10% of the element is visible
          }
        );

        targetRefs.current.forEach((ref) => {
          if (ref) observer.observe(ref);
        });

        return () => {
          targetRefs.current.forEach((ref) => {
            if (ref) observer.unobserve(ref);
          });
        };
    }, []);

    return (
        <div className="projects">
            <h1>My projects</h1>
            <div className="projects-columns">
                {/* Project 1 */}
                <div className="project-row" ref={(el) => { targetRefs.current[0] = el} }>
                    <div className={`project-image ${visibility[0] ? "fade-in" : ""}`} />   
                    <div className={`project-text ${visibility[0] ? "fade-in" : ""}`}>
                        <h4>Project line of sight mapper</h4>
                        <p>A full-stack application developed for <a href="https://consultingis.com.au/" target="_blank" >Consulting & Implementation Services (CIS)</a>. 
                        CIS employees use this in client workshops for early-stage program planning, to help clarify projects' lines-of-sight.
                        It implements user authentication and database hosting.</p>
                        <div className="project-tools-line">
                          <span className="project-tool-box">Node.js </span>
                          <span className="project-tool-box">React </span>
                          <span className="project-tool-box">Redux </span>
                          <span className="project-tool-box">PostgreSQL </span>
                          <span className="project-tool-box">Typescript </span>
                          <span className="project-tool-box">AWS </span>
                        </div>
                        <a href="https://github.com/definitelynotarob0t/cis-los" className="project-github-link"><FaGithub size={20} /></a>
                    </div>
                </div>

                {/* Project 2 */}
                <div className="project-row" ref={(el) => {targetRefs.current[1] = el} }>
                    <Image 
                      src="/images/Dalle-robot-b.webp"
                      alt="Robotic arm extracting data from web pages, surrounded by code"
                      width={500}
                      height={500}
                      className={`project-image ${visibility[1] ? "fade-in" : ""}`}
                    />
                    <div className={`project-text ${visibility[1] ? "fade-in" : ""}`}>
                        <h4>Grant webscrapers</h4>
                        <p>Developed four webscrapers to scrape three different grant database websites (<a href="https://grantguru.com/au">Grant Guru</a>, <a href="https://www.grants.gov.au/">Grant Connect,</a> and ???) for information on current and upcoming grants. 
                        These were developed for CIS employees to save time on manual research. Each script was made into executables for ease of use. 
                        After scripts are executed, the results are saved to a CSV (which can be viewed in Excel).</p>
                        <div className="project-tools-line">
                          <span className="project-tool-box">Python</span>
                          <span className="project-tool-box">Selenium</span>
                        </div>
                        <a href="https://github.com/definitelynotarob0t/grant-webscrapers" className="project-github-link"><FaGithub size={20} /></a>
                    </div>
                </div>

                {/* Project 3 */}
                <div className="project-row" ref={(el) => {targetRefs.current[2] = el} }>
                    <div className={`project-image ${visibility[2] ? "fade-in" : ""}`} />
                    <div className={`project-text ${visibility[2] ? "fade-in" : ""}`}>
                        <h4>Portfolio</h4>
                        <p>My portfolio, developed with Next.js, serves as a showcase of my software development journey, featuring the projects I've built and the skills I've acquired. 
                        The goal of this project is not only to present my work but also to demonstrate my ability to design, develop, and deploy a modern web application.</p>
                        <div className="project-tools-line">
                          <span className="project-tool-box">Next.js</span>
                          <span className="project-tool-box">React</span>
                          <span className="project-tool-box">Typescript</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Projects;
