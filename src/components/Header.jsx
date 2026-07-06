import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, User, Grid, Layers, Mail, Moon, Sun } from "lucide-react";
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

const NavItem = ({ href, icon: Icon, label, selected }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${selected ? "text-purple-600 dark:text-purple-400" : "text-black hover:text-black/70 dark:text-gray-300 dark:hover:text-white"
        }`}
    >
      {selected && (
        <motion.div
          layoutId="header-active-pill"
          className="absolute inset-0 bg-white shadow-sm dark:bg-white/10 rounded-full"
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      )}
      <Icon size={16} className="relative z-10" />
      <span className="relative z-10 hidden sm:block">{label}</span>
    </a>
  );
};

export const Header = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.hash || "#hero");

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

  // Subscribe to theme changes to force a re-render for the boxShadow
  const [isDark, setIsDark] = useState(
    typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : true
  );

  useEffect(() => {
    const handleThemeChange = () => setIsDark(document.documentElement.classList.contains('dark'));
    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-[100] h-24 flex items-center justify-center px-8 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
    >

      {/* Center Nav Pill */}
      <motion.div 
        id="header-nav-pill"
        className="flex-shrink-0 pointer-events-auto flex items-center p-1.5 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-black/10 dark:border-white/10"
        animate={{
            boxShadow: isDark 
                ? '0 10px 50px rgba(255,255,255,.08), inset 0 1px 1px rgba(255,245,220,0.25)' 
                : '0 10px 35px rgba(0,0,0,.08), inset 0 1px 1px rgba(255,214,120,0.4)'
        }}
        transition={{ duration: 0.6 }}
        style={{
            // Fallback for initial render before JS runs or animate kicks in
            boxShadow: 'var(--header-shadow, 0 10px 35px rgba(0,0,0,.08))'
        }}
      >

        <NavItem href="#hero" icon={Home} label="Home" selected={activeSection === "#hero"} />

        <NavItem href="#services" icon={Layers} label="Services" selected={activeSection === "#services"} />
        <NavItem href="#projects" icon={Grid} label="Projects" selected={activeSection === "#projects"} />
        <NavItem href="#about" icon={User} label="About" selected={activeSection === "#about"} />
        <NavItem href="#contact" icon={Mail} label="Contact" selected={activeSection === "#contact"} />

        {display.themeSwitcher && (
          <>
            <div className="w-[1px] h-6 bg-black/20 dark:bg-white/10 mx-1" />
            <button
              onClick={() => {
                const isDark = document.documentElement.classList.toggle('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                // Force a re-render to update the icon
                window.dispatchEvent(new Event('themechange'));
              }}
              className="p-2.5 rounded-full text-black hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              <ThemeIcon />
            </button>
          </>
        )}
      </motion.div>
    </motion.header>
  );
};

const ThemeIcon = () => {
  const [isDark, setIsDark] = useState(
    typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  useEffect(() => {
    // Check initial preference from localStorage or system
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

  return isDark ? <Sun size={16} /> : <Moon size={16} />;
};
