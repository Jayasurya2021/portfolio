import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import {
    ArrowRight, Phone, MapPin,
    Star, CheckCircle2, X, ChevronRight, Award, Briefcase,
    Users, Layers, Mail, User, Activity, Menu, ChevronDown,
    ChevronLeft
} from 'lucide-react'
import '../App.css'
import HeroVideoBanner from './HeroVideoBanner'
import ProjectsSection from './ProjectsSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import ContactSection from './ContactSection';
import ContactInfoArea from './ContactInfoArea';
import FooterSection from './FooterSection';
import WhatsAppButton from './WhatsAppButton';
import { WallWasherLight } from './WallWasherLight';

/* ─────────────────────────────────────────────
   SLIDE BAR COMPONENT (replaces building banner)
───────────────────────────────────────────── */
function SlideBar() {
    const slides = [
        {
            id: 1,
            tag: 'EST. 2008 · LUXURY CONSTRUCTION',
            title: 'Building Future',
            highlight: 'Landmarks',
            subtitle: 'Merging architectural brilliance with next-generation technology to shape tomorrow\'s urban skylines.',
            cta: 'Explore Our Work',
            bg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=90',
        },
        {
            id: 2,
            tag: 'PREMIUM VILLAS · WORLDWIDE',
            title: 'Crafted For',
            highlight: 'Excellence',
            subtitle: 'Every detail, every material, every line — designed for those who demand nothing less than perfection.',
            cta: 'View Villas',
            bg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=90',
        },
        {
            id: 3,
            tag: 'SUSTAINABLE · INNOVATIVE · BOLD',
            title: 'Engineering',
            highlight: 'Legacies',
            subtitle: 'Sustainable design principles woven into iconic commercial structures that define city skylines for generations.',
            cta: 'Our Projects',
            bg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=90',
        },
    ]

    const [current, setCurrent] = useState(0)
    const [animating, setAnimating] = useState(false)
    const [direction, setDirection] = useState('next')
    const intervalRef = useRef(null)

    const goTo = (idx, dir = 'next') => {
        if (animating) return
        setDirection(dir)
        setAnimating(true)
        setTimeout(() => {
            setCurrent(idx)
            setAnimating(false)
        }, 600)
    }

    const next = () => goTo((current + 1) % slides.length, 'next')
    const prev = () => goTo((current - 1 + slides.length) % slides.length, 'prev')

    useEffect(() => {
        intervalRef.current = setInterval(next, 6000)
        return () => clearInterval(intervalRef.current)
    }, [current])

    const slide = slides[current]

    return (

        <div className="slidebar-root">
            {/* Background layers */}
            <div
                className={`slidebar-bg ${animating ? `slidebar-bg-exit-${direction}` : 'slidebar-bg-active'}`}
                style={{ backgroundImage: `url(${slide.bg})` }}
            />
            <div className="slidebar-overlay" />

            {/* Animated grid lines */}
            <div className="slidebar-grid" />

            {/* Content */}
            <div className={`slidebar-content ${animating ? 'slidebar-content-exit' : 'slidebar-content-enter'}`}>
                <div className="slidebar-tag">
                    <span className="sb-dot" />
                    <span>{slide.tag}</span>
                </div>

                <h1 className="slidebar-title">
                    {slide.title} <br />
                    <span className="slidebar-highlight">{slide.highlight}</span>
                </h1>

                <p className="slidebar-sub">{slide.subtitle}</p>

                <div className="slidebar-actions">
                    <a href="#projects" className="sb-btn-primary">
                        {slide.cta} <ArrowRight size={18} />
                    </a>
                    <a href="#about" className="sb-btn-outline">
                        Learn More
                    </a>
                </div>
            </div>

            {/* Controls */}
            <div className="slidebar-controls">
                <button className="sb-ctrl-btn" onClick={prev} aria-label="Previous">
                    <ChevronLeft size={20} />
                </button>

                <div className="sb-dots">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`sb-dot-btn ${i === current ? 'active' : ''}`}
                            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                            aria-label={`Slide ${i + 1}`}
                        />
                    ))}
                </div>

                <button className="sb-ctrl-btn" onClick={next} aria-label="Next">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Progress bar */}
            <div className="sb-progress-bar" key={current}>
                <div className="sb-progress-fill" />
            </div>

            {/* Slide counter */}
            <div className="sb-counter">
                <span className="sb-counter-current">0{current + 1}</span>
                <span className="sb-counter-sep">/</span>
                <span className="sb-counter-total">0{slides.length}</span>
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────── */
function useScrollReveal(options = {}) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    obs.unobserve(el)
                }
            },
            { threshold: 0.12, ...options }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return [ref, visible]
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
function MainPage() {
    const [activeFilter, setActiveFilter] = useState('all')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [hoveredNav, setHoveredNav] = useState(null)
    const [navHidden, setNavHidden] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious()
        if (latest > previous && latest > 150) {
            setNavHidden(true)
        } else {
            setNavHidden(false)
        }
    })

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const portfolioItems = [
        { id: 1, title: 'Aura Heights', category: 'commercial', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', area: '450,000 sq ft', year: '2025' },
        { id: 2, title: 'Cyan Oasis Villa', category: 'villa', location: 'Miami, USA', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', area: '12,500 sq ft', year: '2024' },
        { id: 3, title: 'Sapphire HQ', category: 'commercial', location: 'London, UK', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80', area: '280,000 sq ft', year: '2026' },
        { id: 4, title: 'Nebula Smart House', category: 'villa', location: 'California, USA', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', area: '8,400 sq ft', year: '2025' },
        { id: 5, title: 'The Azure Penthouse', category: 'interior', location: 'New York, USA', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', area: '6,200 sq ft', year: '2023' },
        { id: 6, title: 'Vortex Tech Hub', category: 'commercial', location: 'Singapore', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', area: '620,000 sq ft', year: '2026' },
    ]

    const filteredPortfolio = activeFilter === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeFilter)

    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#services', label: 'Services' },
        { href: '#projects', label: 'Projects' },
        { href: '#vision', label: 'Vision' },
        { href: '#reviews', label: 'Reviews' },
    ]

    return (
        <div className="app-container relative">
            {/* ── WALL WASHER LIGHT ── */}
            <WallWasherLight />

            {/* ── SLIDE BAR (replaces banner + hero) ── */}
            <HeroVideoBanner />

            {/* ── SERVICES SECTION ── */}
            <ServicesSection />

            {/* ── PROJECTS SECTION (scroll-driven premium cards) ── */}
            <ProjectsSection />

            {/* ── WHO WE ARE SECTION ── */}
            <AboutSection />

            {/* 1. CONTACT SECTION */}
            <ContactSection />

            {/* 2. CONTACT INFORMATION AREA */}
            <ContactInfoArea />

            {/* 3. WHATSAPP BUTTON */}
            <WhatsAppButton />

            {/* 4. FOOTER SECTION */}
            <FooterSection />
        </div>
    )
}

export default MainPage
