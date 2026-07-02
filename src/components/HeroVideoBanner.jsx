import React from 'react';

export default function HeroVideoBanner() {
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 2xl:pt-40 pb-10 sm:pb-14 md:pb-16 lg:pb-20 overflow-hidden w-full" id="hero">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                <div className="max-w-3xl text-center mx-auto w-full">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-normal leading-tight md:leading-[1.1] lg:leading-none tracking-normal md:-tracking-[1px] lg:-tracking-[2px] mb-4 text-black dark:text-white break-words"
                        style={{ opacity: '1', transform: 'none' }}>We Build <span className="italic"> Digital Products </span>
                        That Drive Growth.</h1>
                    <p className="mb-8 lg:mb-12 text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed md:leading-6 max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto break-words"
                        style={{ opacity: '1', transform: 'none' }}>From startups to global brands — we design, develop,
                        and deliver high-performing web and mobile solutions that turn ideas into impact.</p>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-5 w-full px-4 md:px-0"
                        style={{ opacity: '1', transform: 'none' }}><a
                            className="w-full max-w-[300px] md:w-auto md:max-w-none justify-center group px-6 md:px-8 py-3.5 md:py-4.5 flex gap-2 items-center bg-black text-sm md:text-base font-medium -tracking-[0.2px] leading-5 text-white rounded-full hover:bg-black dark:bg-white dark:text-black dark:hover:bg-white transition-all duration-300 shadow-sm border border-gray-200 dark:border-white/10"
                            href="#projects" onClick={(e) => handleScroll(e, '#projects')} data-discover="true"><span
                                className="relative inline-block overflow-hidden text-white dark:text-black"><span
                                    className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">EXPLORE
                                    PROJECTS</span><span
                                        className="absolute top-0 left-0 block w-full transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0">EXPLORE
                                    PROJECTS</span></span><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none"
                                        className="transition-transform duration-300 group-hover:translate-x-1 text-white dark:text-black">
                                <path
                                    d="M17.9941 5.25293C18.0771 5.253 18.1559 5.26997 18.2305 5.29492C18.2472 5.30045 18.2648 5.30381 18.2812 5.31055C18.3311 5.33127 18.3781 5.35722 18.4219 5.3877C18.4586 5.41309 18.4937 5.44192 18.5264 5.47461C18.6455 5.59379 18.7132 5.74352 18.7354 5.89844C18.7383 5.91968 18.7401 5.94112 18.7412 5.96289C18.7424 5.98346 18.7447 6.00382 18.7441 6.02441L18.7471 14.9941C18.747 15.4081 18.4103 15.744 17.9961 15.7441C17.5822 15.7438 17.2462 15.408 17.2461 14.9941L17.2441 7.81641L6.53027 18.5312C6.23737 18.824 5.76257 18.8241 5.46973 18.5312C5.1769 18.2384 5.17698 17.7636 5.46973 17.4707L16.1885 6.75098L8.99805 6.75C8.58403 6.74971 8.24816 6.41381 8.24805 6C8.24822 5.5859 8.58474 5.24985 8.99902 5.25L17.9941 5.25293Z"
                                    fill="currentColor" />
                            </svg></a><a
                                className="w-full max-w-[300px] md:w-auto md:max-w-none justify-center group px-6 md:px-8 py-3.5 md:py-4.5 flex gap-2 items-center bg-white border border-black text-sm md:text-base font-medium -tracking-[0.2px] leading-5 text-black rounded-full hover:bg-gray-100 dark:bg-transparent dark:border-white dark:text-white dark:hover:bg-white/10 transition-all duration-300"
                                href="#contact" onClick={(e) => handleScroll(e, '#contact')} data-discover="true"><span
                                    className="relative inline-block overflow-hidden "><span
                                        className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">CONTACT
                                    US</span>
                                <span
                                    className="absolute top-0 left-0 block w-full transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0">CONTACT
                                    US</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
