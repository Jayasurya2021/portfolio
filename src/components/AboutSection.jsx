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
        title: "TECHNOLOGIES",
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
        <section ref={containerRef} id="about" className="relative w-full bg-white dark:bg-[#0a0a0a] text-black dark:text-white py-20 md:py-40 lg:py-64 overflow-hidden scroll-mt-24">

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
                        <div key={block.id} className="relative flex flex-col md:flex-row items-center justify-between w-full">

                            {/* Timeline Dot (Center) */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: false, margin: "-20%" }}
                                transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
                                className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-black dark:bg-white rounded-full z-20 border-[4px] border-white dark:border-black shadow-sm"
                            />

                            {/* Mobile Layout: Title + Description Stacked */}
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

                            {/* Desktop Layout: Left Side Container */}
                            <div className="hidden md:flex w-full md:w-1/2 flex-col justify-center items-center md:items-end text-center md:text-right md:pr-24 lg:pr-32">
                                {isEven ? (
                                    /* TITLE on Left */
                                    <div className="w-full flex justify-center md:justify-end">
                                        <ScrollFloat
                                            animationDuration={1}
                                            ease="back.out(1.2)"
                                            scrollStart="top bottom-=10%"
                                            scrollEnd="bottom center"
                                            stagger={0.03}
                                            containerClassName="overflow-hidden"
                                            textClassName="text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-black uppercase tracking-tighter leading-[0.9] text-black dark:text-white"
                                        >
                                            {block.title}
                                        </ScrollFloat>
                                    </div>
                                ) : (
                                    /* DESCRIPTION on Left */
                                    <motion.div
                                        initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
                                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                        viewport={{ once: false, amount: 0.4 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="w-full max-w-[400px]"
                                    >
                                        <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-light">
                                            {block.desc}
                                        </p>
                                    </motion.div>
                                )}
                            </div>

                            {/* Desktop Layout: Right Side Container */}
                            <div className="hidden md:flex w-full md:w-1/2 flex-col justify-center items-center md:items-start text-center md:text-left md:pl-24 lg:pl-32">
                                {isEven ? (
                                    /* DESCRIPTION on Right */
                                    <motion.div
                                        initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
                                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                        viewport={{ once: false, margin: "-20%" }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="w-full max-w-[400px]"
                                    >
                                        <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-light">
                                            {block.desc}
                                        </p>
                                    </motion.div>
                                ) : (
                                    /* TITLE on Right */
                                    <div className="w-full flex justify-center md:justify-start">
                                        <ScrollFloat
                                            animationDuration={1}
                                            ease="back.out(1.2)"
                                            scrollStart="top bottom-=10%"
                                            scrollEnd="bottom center"
                                            stagger={0.03}
                                            containerClassName="overflow-hidden"
                                            textClassName="text-[3.5rem] md:text-[5rem] lg:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.9] text-black dark:text-white"
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
