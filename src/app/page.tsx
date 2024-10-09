"use client"

import React, { useRef } from 'react';
import AboutMe from '../pages/components/AboutMe';
import Projects from '../pages/components/Projects';
import CertificatesLinks from '../pages/components/Certificates';
import Skills from '../pages/components/Skills';
import ContactMe from '../pages/components/ContactMe';
import Title from '../pages/components/Title';
import Header from '../pages/components/Header';

type Section = 'title' | 'about' | 'projects' | 'skills' | 'certificates' | 'contact';


export default function Home() {
  // Create refs for each section
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactMeRef = useRef<HTMLDivElement>(null);

  //Function to scroll to the specific section
  const scrollToSection = (section: Section) => {
    switch (section) {
      case 'about':
        aboutMeRef.current && aboutMeRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'projects':
        projectsRef.current&& projectsRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'skills':
        skillsRef.current && skillsRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contact':
        contactMeRef.current && contactMeRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };
 


  return (
    <div>
      <Header scrollToSection={scrollToSection} />
      <div style={{margin: "50px 180px"}}>
        <Title />
        <div ref={aboutMeRef} style={{scrollMarginTop: '60px'}}><AboutMe /></div>
        <div ref={projectsRef} ><Projects /></div>
        <div ref={skillsRef} style={{scrollMarginTop: '40px'}}><Skills /></div>
        <CertificatesLinks />
        <div ref={contactMeRef} style={{scrollMarginTop: '40px'}}><ContactMe /></div>
      </div>
      < div style={{height: "60px"}}></div>
    </div>
  );
}
