import {
  ArrowDown,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const titles = [
  'Building Reliable Systems',
  'Full Stack Developer',
  'Passionate about AI/ML',
  'Tech Enthusiast',
  'Problem Solver',
];

export const HeroSection = () => {
  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 text-foreground"
    >
      <div className="container max-w-6xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Mobile: Profile image first */}
          <div className="flex justify-center lg:justify-end lg:order-2 opacity-0 animate-fade-in-delay-3">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl">
              <img
                src="/shubhanan.jpg"
                alt="Shubhanan Sharma"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content - moved down on mobile */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left lg:order-1 mt-4 lg:mt-0">
            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-primary opacity-0 animate-fade-in-delay-1">
                  Shubhanan Sharma
                </span>
              </h1>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground opacity-0 animate-fade-in-delay-2 h-10 lg:h-12 flex items-center justify-center lg:justify-start">
                <span key={currentTitle} className="animate-title-change">
                  {titles[currentTitle]}
                </span>
              </h2>

              <p className="text-base lg:text-lg text-foreground/70 max-w-xl leading-relaxed opacity-0 animate-fade-in-delay-3 mx-auto lg:mx-0 px-2 lg:px-0">
                I'm a developer who loves turning ideas into real, usable
                products. What started as curiosity grew into a passion for
                building tools I'd actually use, whether simple or ambitious.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 opacity-0 animate-fade-in-delay-4 px-4 sm:px-0 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('projects')}
                className="group flex items-center justify-center gap-2 bg-foreground text-background px-5 lg:px-6 py-2.5 lg:py-3 rounded-lg font-medium hover:bg-foreground/90 transition-all duration-300 hover:scale-105"
              >
                View My Work
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://drive.google.com/file/d/1rlKmygPq1swT7B50DO6JE8EihgzyDCTJ/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-border text-foreground px-5 lg:px-6 py-2.5 lg:py-3 rounded-lg font-medium hover:bg-card transition-all duration-300 hover:scale-105"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-3 lg:gap-4 opacity-0 animate-fade-in-delay-5 justify-center lg:justify-start">
              <a
                href="https://github.com/shubhs27"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 lg:p-3 border border-border rounded-lg text-foreground/70 hover:text-foreground hover:border-primary transition-all duration-300 hover:scale-110"
              >
                <Github className="h-4 w-4 lg:h-5 lg:w-5" />
              </a>
              <a
                href="https://leetcode.com/u/shubhs27/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                className="p-2.5 lg:p-3 border border-border rounded-lg text-foreground/70 hover:text-foreground hover:border-primary transition-all duration-300 hover:scale-110"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                  alt="LeetCode"
                  className="h-4 w-4 lg:h-5 lg:w-5 grayscale dark:invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/shubhs27/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 lg:p-3 border border-border rounded-lg text-foreground/70 hover:text-foreground hover:border-primary transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-4 w-4 lg:h-5 lg:w-5" />
              </a>
              <a
                href="mailto:shubhanans@gmail.com"
                aria-label="Email"
                className="p-2.5 lg:p-3 border border-border rounded-lg text-foreground/70 hover:text-foreground hover:border-primary transition-all duration-300 hover:scale-110"
              >
                <Mail className="h-4 w-4 lg:h-5 lg:w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection('experience')}
        className="hidden lg:flex absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center animate-bounce hover:text-primary transition-colors duration-300 cursor-pointer border-none bg-transparent"
      >
        <span className="text-xs lg:text-sm text-foreground/60 mb-1 lg:mb-2">
          Scroll
        </span>
        <ArrowDown className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
      </button>
    </section>
  );
};
