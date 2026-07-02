import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Grid, Layers, Mail, Moon, Sun, Menu, X } from "lucide-react";
import { routes, display, person, about, blog, work, gallery } from "@/resources";
import styles from "./Header.module.scss";

const TimeDisplay = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <span>{currentTime}</span>;
};

const NavItem = ({ href, icon: Icon, label, selected, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`relative flex items-center gap-3 px-5 py-3 md:px-4 md:py-2 rounded-full text-base md:text-sm font-medium transition-colors min-h-[48px] md:min-h-0 ${selected ? "text-purple-600 dark:text-purple-400 bg-black/5 dark:bg-white/10 md:bg-transparent" : "text-black hover:bg-black/5 md:hover:bg-transparent hover:text-black/70 dark:text-gray-300 dark:hover:bg-white/5 md:dark:hover:bg-transparent dark:hover:text-white"
        }`}
    >
      {selected && (
        <motion.div
          layoutId="header-active-pill"
          className="absolute inset-0 bg-white shadow-sm dark:bg-white/10 rounded-full hidden md:block"
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      )}
      <Icon size={18} className="relative z-10 shrink-0 md:w-4 md:h-4" />
      <span className="relative z-10 block">{label}</span>
    </a>
  );
};

export const Header = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.hash || "#hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "#hero", icon: Home, label: "Home" },
    { href: "#services", icon: Layers, label: "Services" },
    { href: "#projects", icon: Grid, label: "Projects" },
    { href: "#about", icon: User, label: "About" },
    { href: "#contact", icon: Mail, label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] h-24 flex items-center justify-center px-4 sm:px-8 pointer-events-none">

      <div className="relative w-full md:w-auto max-w-md md:max-w-fit flex flex-col pointer-events-auto" ref={menuRef}>
        
        {/* Main Header Pill */}
        <div className="flex justify-between md:justify-center items-center p-1.5 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl">
          
          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <NavItem key={link.href} {...link} selected={activeSection === link.href} />
            ))}
          </div>

          {/* Mobile Current Section */}
          <div className="flex md:hidden items-center px-4 py-2">
            <span className="text-sm font-bold tracking-wide text-black dark:text-white capitalize">
              {activeSection.replace('#', '') || 'Home'}
            </span>
          </div>

          {/* Theme & Menu Toggle */}
          <div className="flex items-center gap-1">
            {display.themeSwitcher && (
              <>
                <div className="w-[1px] h-6 bg-black/20 dark:bg-white/10 mx-1 md:mx-2 hidden md:block" />
                <button
                  onClick={() => {
                    const isDark = document.documentElement.classList.toggle('dark');
                    localStorage.setItem('theme', isDark ? 'dark' : 'light');
                    window.dispatchEvent(new Event('themechange'));
                  }}
                  className="p-3 md:p-2.5 rounded-full text-black hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Toggle Theme"
                >
                  <ThemeIcon />
                </button>
              </>
            )}

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 rounded-full text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-3 p-3 bg-white/95 dark:bg-[#111]/95 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-2xl rounded-3xl flex flex-col gap-1 md:hidden"
            >
              {navLinks.map((link) => (
                <NavItem 
                  key={link.href} 
                  {...link} 
                  selected={activeSection === link.href}
                  onClick={() => setIsMobileMenuOpen(false)} 
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

const ThemeIcon = () => {
  const [isDark, setIsDark] = useState(
    typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (theme === 'dark' || (!theme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    const handleThemeChange = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  return isDark ? <Sun size={18} className="md:w-4 md:h-4" /> : <Moon size={18} className="md:w-4 md:h-4" />;
};

