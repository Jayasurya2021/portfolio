import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ScrollFloat from './Animation/ScrollFloat';

const aboutBlocks = [
    {
        id: "01",
        title: "SKILLS",
        desc: "Our expertise spans modern frontend, backend, and full-stack development. From responsive user interfaces to scalable server architectures, we build digital solutions that combine performance, reliability, and exceptional user experiences."
    },
    {
        id: "02",
        title: "EXPERIENCE",
        desc: "We develop powerful full-stack web applications using MongoDB, Express.js, React, and Node.js. From business websites to complex web platforms, our solutions are designed for scalability, speed, and long-term growth."
    },
    {
        id: "03",
        title: "TECH STACK",
        desc: "We leverage modern technologies including React, Node.js, Express.js, Django, MongoDB, Tailwind CSS, and cloud deployment platforms to create fast, secure, and future-ready digital products."
    }
];

export default function AboutSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end end"]
    });

    // Scale the vertical line from top to bottom
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <section ref={containerRef} id="about" className="relative w-full bg-white dark:bg-[#0a0a0a] text-black dark:text-white py-20 md:py-40 lg:py-64 overflow-hidden">

            {/* Center Timeline Background Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/10 dark:bg-white/10 -translate-x-1/2 z-0 hidden md:block" />

            {/* Center Timeline Animated Progress Line */}
            <motion.div
                className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-black dark:bg-white -translate-x-1/2 z-0 hidden md:block origin-top"
                style={{ scaleY }}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px] relative z-10 flex flex-col gap-16 sm:gap-32 md:gap-48 lg:gap-[300px]">

                {aboutBlocks.map((block, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <div
                            key={block.id}
                            className="relative w-full
                                /* Mobile: stacked flex */
                                flex flex-col items-center
                                /* Desktop: 12-col grid */
                                md:grid md:grid-cols-12 md:gap-x-0 md:items-center"
                        >

                            {/* ── Timeline Dot — columns 6–7, perfectly centered ── */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: false, margin: "-20%" }}
                                transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
                                className="hidden md:flex
                                           md:col-start-6 md:col-end-8
                                           items-center justify-center
                                           row-start-1"
                                style={{ zIndex: 20 }}
                            >
                                <span className="w-5 h-5 bg-black dark:bg-white rounded-full border-[4px] border-white dark:border-black shadow-sm block" />
                            </motion.div>

                            {/* ── Mobile Layout: stacked ── */}
                            <div className="md:hidden w-full flex flex-col items-center text-center gap-6">
                                {/* Mobile Title */}
                                <div className="w-full flex justify-center">
                                    <ScrollFloat
                                        animationDuration={1}
                                        ease="back.out(1.2)"
                                        scrollStart="top bottom-=10%"
                                        scrollEnd="bottom center"
                                        stagger={0.03}
                                        containerClassName="overflow-hidden"
                                        textClassName="text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-[0.9] text-black dark:text-white"
                                    >
                                        {block.title}
                                    </ScrollFloat>
                                </div>

                                {/* Mobile Description */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    viewport={{ once: false, amount: 0.4 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="w-full"
                                >
                                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-light">
                                        {block.desc}
                                    </p>
                                </motion.div>
                            </div>

                            {/* ── Desktop Left Area — cols 1–5 ── */}
                            <div
                                className="hidden md:flex
                                           md:col-start-1 md:col-end-6
                                           row-start-1
                                           flex-col justify-center items-end
                                           pr-10 lg:pr-16 xl:pr-20"
                            >
                                {isEven ? (
                                    /* TITLE on Left (even rows) */
                                    <div className="flex justify-end">
                                        <ScrollFloat
                                            animationDuration={1}
                                            ease="back.out(1.2)"
                                            scrollStart="top bottom-=10%"
                                            scrollEnd="bottom center"
                                            stagger={0.03}
                                            containerClassName="overflow-hidden"
                                            textClassName="text-[2.5rem] md:text-[3srem] lg:text-[3.5rem] xl:text-[4rem] 2xl:text-[4.2rem] font-black uppercase tracking-tighter leading-[0.9] text-black dark:text-white text-right"
                                        >
                                            {block.title.toUpperCase()}
                                        </ScrollFloat>
                                    </div>
                                ) : (
                                    /* DESCRIPTION on Left (odd rows) */
                                    <motion.div
                                        initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
                                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                        viewport={{ once: false, amount: 0.4 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="max-w-[480px] text-right"
                                    >
                                        <p className="text-gray-500 text-lg md:text-lg lg:text-xl xl:text-2xl leading-relaxed font-light">
                                            {block.desc}
                                        </p>
                                    </motion.div>
                                )}
                            </div>

                            {/* ── Desktop Right Area — cols 8–12 ── */}
                            <div
                                className="hidden md:flex
                                           md:col-start-8 md:col-end-13
                                           row-start-1
                                           flex-col justify-center items-start
                                           pl-10 lg:pl-16 xl:pl-20"
                            >
                                {isEven ? (
                                    /* DESCRIPTION on Right (even rows) */
                                    <motion.div
                                        initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
                                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                        viewport={{ once: false, margin: "-20%" }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="max-w-[480px] text-left"
                                    >
                                        <p className="text-gray-500 text-lg md:text-lg lg:text-xl xl:text-2xl  leading-relaxed font-light">
                                            {block.desc}
                                        </p>
                                    </motion.div>
                                ) : (
                                    /* TITLE on Right (odd rows) */
                                    <div className="flex justify-start">
                                        <ScrollFloat
                                            animationDuration={1}
                                            ease="back.out(1.2)"
                                            scrollStart="top bottom-=10%"
                                            scrollEnd="bottom center"
                                            stagger={0.03}
                                            containerClassName="overflow-hidden"
                                            textClassName="text-[2.5rem] md:text-[3srem] lg:text-[3.5rem] xl:text-[4rem] 2xl:text-[4.2rem] font-black uppercase tracking-tighter leading-[0.9] text-black dark:text-white text-left"
                                        >
                                            {block.title}
                                        </ScrollFloat>
                                    </div>
                                )}
                            </div>

                        </div>
                    );
                })}
            </div>
        </section>
    );
}
