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
                    <Image
                      src="/images/screenshot_los_page.png"
                      alt="Screenshot of the project's line of sight page with example text filled in"
                      width={450}
                      height={350}
                      className={`project-image ${visibility[0] ? "fade-in" : ""}`}
                      style={{marginTop: '35px', marginBottom: '35px'}}
                      />
                    <div className={`project-text ${visibility[0] ? "fade-in" : ""}`}>
                        <h4>Project planning web app</h4>
                        <p>A full-stack app developed for <a href="https://consultingis.com.au/" target="_blank" >Consulting & Implementation Services</a> to use in client workshops to ease early-stage project planning, aided by intuitive prompts and interactive tools.
                        See my GitHub repository's README.md for a live demo.
                        </p>
                        <div className="project-tools-line">
                          <span className="project-tool-box">Node.js </span>
                          <span className="project-tool-box">React </span>
                          <span className="project-tool-box">Redux </span>
                          <span className="project-tool-box">PostgreSQL </span>
                          <span className="project-tool-box">Typescript </span>
                          <span className="project-tool-box">AWS </span>
                        </div>
                        <a href="https://github.com/definitelynotarob0t/cis-los" target="_blank" className="project-github-link"><FaGithub size={20} /></a>
                        <a href="https://app.consultingis.com.au/login" target="_blank" style={{fontSize: '14px'}}>Live site</a>
                    </div>
                </div>

                {/* Project 2 */}
                <div className="project-row" ref={(el) => {targetRefs.current[1] = el} }>
                    <Image 
                      src="/images/Dalle-robot-b.webp"
                      alt="Robotic arm extracting data from web pages, surrounded by code"
                      width={400}
                      height={400}
                      className={`project-image ${visibility[1] ? "fade-in" : ""}`}
                    />
                    <div className={`project-text ${visibility[1] ? "fade-in" : ""}`}>
                        <h4>Grant webscrapers</h4>
                        <p>Four automated webscrapers to scrape three different grant database websites (<a href="https://grantguru.com/au">Grant Guru</a>, <a href="https://www.grants.gov.au/">Grant Connect,</a> and <a href="https://business.gov.au/grants-and-programs?resultsNum=10">business.gov.au</a>) for information on current and upcoming grants. 
                        After scripts are executed, results are saved to a CSV (which can be viewed in Excel).</p>
                        <div className="project-tools-line">
                          <span className="project-tool-box">Python</span>
                          <span className="project-tool-box">Selenium</span>
                        </div>
                        <a href="https://github.com/definitelynotarob0t/grant-webscrapers" target="_blank" className="project-github-link"><FaGithub size={20} /></a>
                    </div>
                </div>

                {/* Project 3 */}
                <div className="project-row" ref={(el) => {targetRefs.current[2] = el} }>
                    <Image 
                      src="/images/screenshot_recursive_5.png"
                      alt="Screnshot of webpage recursively nested inside screenshots of webpage"
                      width={400}
                      height={400}
                      className={`project-image ${visibility[2] ? "fade-in" : ""}`}
                    />
                    <div className={`project-text ${visibility[2] ? "fade-in" : ""}`}>
                        <h4>Web portfolio</h4>
                        <p>My portfolio, developed with Next.js, serves as a showcase of my software development journey, featuring the projects I've built and the skills I've acquired. 
                        The goal of this project is not only to present my work but also to demonstrate my ability to design, develop, and deploy a modern web application.</p>
                        <div className="project-tools-line">
                          <span className="project-tool-box">Next.js</span>
                          <span className="project-tool-box">React</span>
                          <span className="project-tool-box">Typescript</span>
                        </div>
                        <a href="https://github.com/definitelynotarob0t/portfolio" target="_blank" className="project-github-link"><FaGithub size={20} /></a>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Projects;
