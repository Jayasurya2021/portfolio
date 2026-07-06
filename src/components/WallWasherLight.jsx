import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

export const WallWasherLight = () => {
    const prefersReducedMotion = useReducedMotion();
    const { scrollY } = useScroll();

    const [isDark, setIsDark] = useState(true);
    const [navWidth, setNavWidth] = useState(400); // Default fallback
    const [navTop, setNavTop] = useState(24);
    const [navHeight, setNavHeight] = useState(56);

    useEffect(() => {
        const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
        checkTheme();
        window.addEventListener('themechange', checkTheme);
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            window.removeEventListener('themechange', checkTheme);
            observer.disconnect();
        };
    }, []);

    // Track the floating nav pill width and position
    useEffect(() => {
        const pill = document.getElementById('header-nav-pill');
        if (!pill) return;

        const updateMeasurements = () => {
            const rect = pill.getBoundingClientRect();
            setNavWidth(rect.width);
            setNavTop(rect.top);
            setNavHeight(rect.height);
        };

        updateMeasurements();

        const resizeObserver = new ResizeObserver(updateMeasurements);
        resizeObserver.observe(pill);
        window.addEventListener('resize', updateMeasurements);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateMeasurements);
        };
    }, []);

    // Fade OUT beam on scroll so it only lights the hero section
    const scrollOpacityRaw = useTransform(scrollY, [0, 400], [1, 0]);
    const scrollOpacity = useSpring(scrollOpacityRaw, { stiffness: 100, damping: 30 });

    const fixtureColor = isDark ? '#1E1E1E' : '#2D2D2D';

    // Exact colors from the master spec
    const beamColors = {
        center: isDark ? 'rgba(255,245,220,0.20)' : 'rgba(245, 210, 160, 0.65)', // Slightly stronger/warmer color for better visibility
        middle: isDark ? 'rgba(255,245,220,0.12)' : 'rgba(245, 210, 160, 0.55)',
        outer: isDark ? 'rgba(255,245,220,0.05)' : 'rgba(245, 210, 160, 0.35)',
        edge: 'transparent'
    };

    // Calculate fixture position (exactly overlapping the navbar pill)
    const fixtureTop = navTop;
    const fixtureHeight = navHeight;

    // SVG for Steel Chain Link
    const chainSvg = `data:image/svg+xml,%3Csvg width='8' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1' y='1' width='6' height='10' rx='3' fill='none' stroke='%23888' stroke-width='2'/%3E%3Crect x='3' y='8' width='2' height='10' rx='1' fill='none' stroke='%23555' stroke-width='2'/%3E%3C/svg%3E`;

    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-[100vh] pointer-events-none z-[1] flex justify-center"
            style={{ opacity: scrollOpacity }} // Entire system fades in on scroll
        >
            <div
                className="relative"
                style={{ width: navWidth, height: '100%' }}
            >
                {/* --- SUSPENDED STEEL CHAIN ROPES --- */}

                {/* Left Chain Rope & Ring */}
                <div
                    className="absolute w-[8px]"
                    style={{
                        left: '22%', top: -1000, height: 1000 + fixtureTop,
                        backgroundImage: `url("${chainSvg}")`,
                        backgroundRepeat: 'repeat-y',
                        backgroundPosition: 'center bottom'
                    }}
                />
                <div className="absolute -translate-x-1/2 rounded-full border-[2.5px] border-[#00000000] shadow-sm" style={{ left: '22%', top: fixtureTop - 8 }} />

                {/* Right Chain Rope & Ring */}
                <div
                    className="absolute w-[8px]"
                    style={{
                        right: '22%', top: -1000, height: 1000 + fixtureTop,
                        backgroundImage: `url("${chainSvg}")`,
                        backgroundRepeat: 'repeat-y',
                        backgroundPosition: 'center bottom'
                    }}
                />
                <div className="absolute translate-x-1/2 rounded-full border-[2.5px] border-[#00000000] shadow-sm" style={{ right: '22%', top: fixtureTop - 8 }} />

                {/* --- (FIXTURE BODY HIDDEN - NAVBAR ACTS AS FIXTURE) --- */}

                {/* --- LIGHT BEAM (EMITTED FROM NAVBAR BOTTOM) --- */}
                <motion.div
                    className="absolute left-0 w-full flex justify-center"
                    style={{
                        top: fixtureTop, // Anchor to top of navbar to hide the clip line behind the navbar
                        opacity: scrollOpacity,
                        clipPath: 'inset(0 -500px -1000px -500px)' // Guaranteed to block any light bleeding above the navbar
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, ease: "easeOut" }} // 900ms easeOut per spec
                >
                    <div className="relative w-full flex justify-center" style={{ top: 15 }}>

                        {/* 1. Center (Tight, bright) */}
                        <div
                            className="absolute top-0"
                            style={{
                                width: '148%', // Expanded from 80% base to match the 185% bottom ratio
                                height: 250,
                                filter: 'blur(80px)'
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    background: `linear-gradient(to bottom, ${beamColors.center} 0%, ${beamColors.edge} 100%)`,
                                    clipPath: 'polygon(23% 0%, 77% 0%, 100% 100%, 0% 100%)'
                                }}
                            />
                        </div>

                        {/* 2. Middle (Wider, softer) */}
                        <div
                            className="absolute top-0"
                            style={{
                                width: '129.5%', // Expanded from 70% base to match the 185% bottom ratio
                                height: 400,
                                filter: 'blur(50px)'
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    background: `linear-gradient(to bottom, ${beamColors.middle} 0%, ${beamColors.edge} 100%)`,
                                    clipPath: 'polygon(23% 0%, 77% 0%, 100% 100%, 0% 100%)'
                                }}
                            />
                        </div>

                        {/* 3. Outer (Widest, largest fade) */}
                        <div
                            className="absolute top-0"
                            style={{
                                width: '120.25%', // Expanded from 65% base to match the 185% bottom ratio
                                height: 550, // Fades before CTA buttons
                                filter: 'blur(60px)'
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    background: `linear-gradient(to bottom, ${beamColors.outer} 0%, ${beamColors.edge} 100%)`,
                                    clipPath: 'polygon(23% 0%, 77% 0%, 100% 100%, 0% 100%)'
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};
