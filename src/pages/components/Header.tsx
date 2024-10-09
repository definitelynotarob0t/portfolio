import React from 'react';

type Section = 'about' | 'projects' | 'skills' | 'contact';

interface HeaderProps {
  scrollToSection: (section: Section) => void;
}

export default function Header({ scrollToSection }: HeaderProps) {
  return (
    <header>
        <nav>
        <ul>
            <li><button onClick={() => scrollToSection('about')}>About Me</button></li>
            <li><button onClick={() => scrollToSection('projects')}>Projects</button></li>
            <li><button onClick={() => scrollToSection('skills')}>Skills</button></li>
            <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
        </ul>
        </nav>
    </header>
  );
}
