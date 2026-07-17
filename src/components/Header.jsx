import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Grid, Layers, Mail, Moon, Sun, MoreHorizontal, X } from "lucide-react";
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

const MobileNavItem = ({ href, icon: Icon, label, selected, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    onClick();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${selected ? "bg-white dark:bg-white/10 text-purple-600 dark:text-purple-400 shadow-sm" : "text-black hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
        }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </a>
  );
};

export const Header = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.hash || "#hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      className="fixed top-0 left-0 right-0 z-[100] h-24 flex items-center justify-end md:justify-center px-6 md:px-8 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
    >

      {/* Center Nav Pill */}
      <motion.div
        id="header-nav-pill"
        className="relative flex-shrink-0 pointer-events-auto flex items-center p-1.5 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-black/10 dark:border-white/10"
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

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center">
          <NavItem href="#hero" icon={Home} label="Home" selected={activeSection === "#hero"} />
          <NavItem href="#services" icon={Layers} label="Services" selected={activeSection === "#services"} />
          <NavItem href="#projects" icon={Grid} label="Projects" selected={activeSection === "#projects"} />
          <NavItem href="#about" icon={User} label="About" selected={activeSection === "#about"} />
          <NavItem href="#contact" icon={Mail} label="Contact" selected={activeSection === "#contact"} />
        </div>

        {display.themeSwitcher && (
          <>
            <div className="hidden sm:block w-[1px] h-6 bg-black/20 dark:bg-white/10 mx-1" />
            <button
              onClick={() => {
                const isDark = document.documentElement.classList.toggle('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                window.dispatchEvent(new Event('themechange'));
              }}
              className="p-2.5 rounded-full text-black hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              <ThemeIcon />
            </button>
            <div className="sm:hidden w-[1px] h-6 bg-black/20 dark:bg-white/10 mx-1" />
          </>
        )}

        {/* Mobile Nav Button */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2.5 rounded-full transition-all flex items-center justify-center ${isMobileMenuOpen ? 'bg-white shadow-sm dark:bg-white/10 text-purple-600 dark:text-purple-400' : 'text-black hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/5'}`}
          >
            {isMobileMenuOpen ? <X size={18} /> : <MoreHorizontal size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-[120%] right-0 min-w-[200px] bg-white/90 dark:bg-[#111]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-2 flex flex-col gap-1 sm:hidden shadow-xl"
            >
              <MobileNavItem href="#hero" icon={Home} label="Home" selected={activeSection === "#hero"} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavItem href="#services" icon={Layers} label="Services" selected={activeSection === "#services"} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavItem href="#projects" icon={Grid} label="Projects" selected={activeSection === "#projects"} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavItem href="#about" icon={User} label="About" selected={activeSection === "#about"} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavItem href="#contact" icon={Mail} label="Contact" selected={activeSection === "#contact"} onClick={() => setIsMobileMenuOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Downward Light Effect */}
        <AnimatePresence>
          {activeSection === "#hero" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:flex absolute left-[3%] right-[3%] -bottom-[1px] justify-center pointer-events-none z-[-1]"
            >
              {/* Core bright line */}
              <div className="absolute inset-0 bg-[#FFF7D6]/90 dark:bg-white h-[1px] rounded-full shadow-[0_0_15px_5px_rgba(255,247,214,0.6)] dark:shadow-[0_0_15px_5px_rgba(255,255,255,0.9)]" />

              {/* Upward glow reaching towards the buttons (behind the frosted glass) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] h-[40px] bg-[#FFF7D6]/40 dark:bg-white/20 blur-2xl rounded-full" />

              {/* Conical downward light beam */}
              <div 
                className="absolute top-[1px] left-1/2 -translate-x-1/2 w-[250%] h-[250px] bg-gradient-to-b from-[#FFF7D6]/80 dark:from-white/30 via-[#FFF7D6]/30 dark:via-white/10 to-transparent pointer-events-none blur-sm"
                style={{ clipPath: 'polygon(30% 0, 70% 0, 100% 130%, 0% 130%)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
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
