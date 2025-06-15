'use client';

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useEffect, useRef, useState } from "react";
import Resume from "./components/Resume";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    // console.log("First : ", localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
    // console.log("Second : ", !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = '';
    }
  }, [isDarkMode])


  const sectionRefs = {
    home: useRef(null),
    resume: useRef(null),
    services: useRef(null),
    work: useRef(null),
    contact: useRef(null),
  };


  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let activeSectionList: string[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Clear any previous timeout
            console.log(entry.target.id)
          clearTimeout(timeoutId);

          activeSectionList.push(entry.target.id);

          timeoutId = setTimeout(() => {
            if (activeSectionList.length > 0) {
              setActiveSection(activeSectionList[activeSectionList.length - 1]);
              activeSectionList = [];
            } else if (activeSectionList.length === 1) {
              setActiveSection(activeSectionList[0]);
              activeSectionList = [];
            }
          }, 300);
          }
        });
      },
      {
        // root: null, // viewport
        // rootMargin: '0px',
        threshold: 0.5, // 50% of section should be visible
      }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
    observer.disconnect();
    clearTimeout(timeoutId);
  };
  }, []);


  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} activeSection={activeSection} />
      <Header id={"home"} ref={sectionRefs.home} isDarkMode={isDarkMode} />
      {/* <About id={"about"} ref={sectionRefs.about} isDarkMode={isDarkMode} /> */}
      <Services id={"services"} ref={sectionRefs.services} isDarkMode={isDarkMode} />
      <Resume id={"resume"} ref={sectionRefs.resume} isDarkMode={isDarkMode} />
      <Work id={"work"} ref={sectionRefs.work} isDarkMode={isDarkMode} />
      <Contact id={"contact"} ref={sectionRefs.contact} isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </>
  );
}
