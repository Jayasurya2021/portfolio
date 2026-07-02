import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Compass, Droplets, Flame, Sparkles, Trees } from 'lucide-react'
import GradualBlur from './Animation/GradualBlur'

const importAll = (r) =>
    Object.entries(r).reduce((acc, [key, value]) => {
        const name = key.split('/').pop()?.split('.')[0]?.toLowerCase() ?? ''
        acc[name] = value.default || value
        return acc
    }, {})

const serviceImages = importAll(
    import.meta.glob('../assets/services/*.{png,jpg,jpeg,jfif,webp}', { eager: true })
)

const getServiceImage = (imageName) =>
    serviceImages[imageName] ?? serviceImages.frontend ?? serviceImages.backend

const services = [
    {
        id: '01',
        title: 'FRONTEND DEVELOPMENT',
        description: 'Modern, responsive, and polished frontends built with React, Tailwind, and thoughtful interaction design.',
        image: getServiceImage('frontend'),
        accentColor: '#8b5cf6',
        icon: <Sparkles size={18} className="text-white" />,
    },
    {
        id: '02',
        title: 'BACKEND DEVELOPMENT',
        description: 'Scalable APIs, secure auth systems, databases, and solid server architecture for modern products.',
        image: getServiceImage('backend'),
        accentColor: '#2563eb',
        icon: <Flame size={18} className="text-white" />,
    },
    {
        id: '03',
        title: 'MERN STACK DEVELOPMENT',
        description: 'End-to-end web applications powered by MongoDB, Express, React, and Node.js.',
        image: getServiceImage('mern'),
        accentColor: '#059669',
        icon: <Compass size={18} className="text-white" />,
    },
    {
        id: '04',
        title: 'DJANGO DEVELOPMENT',
        description: 'Secure and maintainable Django builds with admin tools, business logic, and smooth deployment.',
        image: getServiceImage('django'),
        accentColor: '#16a34a',
        icon: <Trees size={18} className="text-white" />,
    },
    {
        id: '05',
        title: 'API INTEGRATION',
        description: 'Seamless integrations for payments, WhatsApp, email, authentication, and third-party platforms.',
        image: getServiceImage('apiimage'),
        accentColor: '#ea580c',
        icon: <Droplets size={18} className="text-white" />,
    },
    {
        id: '06',
        title: 'Hosting & Deployment',
        description: 'Reliable deployment workflows, performance tuning, and scalable hosting setups for live products.',
        image: getServiceImage('host'),
        accentColor: '#ea580c',
        icon: <Droplets size={18} className="text-white" />,
    },
    {
        id: '07',
        title: 'Maintenance & Support',
        description: 'Ongoing updates, monitoring, and support to keep your application stable and growing.',
        image: getServiceImage('support'),
        accentColor: '#f59e0b',
        icon: <Sparkles size={18} className="text-white" />,
    },
]

export default function ServicesSection() {
    const [activeService, setActiveService] = useState(0)
    const totalSlides = services.length

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setActiveService((prev) => (prev + 1) % totalSlides)
        }, 5000)

        return () => window.clearTimeout(timer)
    }, [activeService, totalSlides])

    const currentService = services[activeService % totalSlides] ?? services[0]

    const goToNext = () => setActiveService((prev) => (prev + 1) % totalSlides)
    const goToPrev = () => setActiveService((prev) => (prev - 1 + totalSlides) % totalSlides)

    return (
        <section id="services" className="relative overflow-hidden scroll-mt-24">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.35, 0.2] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -left-[8%] top-[8%] h-[38vw] w-[38vw] rounded-full bg-violet-500/20 blur-[140px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.16, 1], opacity: [0.16, 0.28, 0.16] }}
                    transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                    className="absolute bottom-[8%] right-[0%] h-[32vw] w-[32vw] rounded-full bg-sky-500/20 blur-[140px]"
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
                {/* <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="w-12 h-[2px] bg-purple-600 rounded-full" />
                            <span className="text-sm font-bold tracking-widest text-purple-600 uppercase">Our Expertise</span>
                            <span className="w-12 h-[2px] bg-purple-600 rounded-full" />
                        </div>
                        <h2 className="text-[clamp(2rem,8vw,4rem)] font-black uppercase tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                            Services
                        </h2>
                    </div>
                </div> */}
                <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-12 h-[2px] bg-purple-600 rounded-full" />
                        <span className="text-sm font-bold tracking-widest text-purple-600 uppercase">Our Expertise</span>
                        <span className="w-12 h-[2px] bg-purple-600 rounded-full" />
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-[#f1f5f9] tracking-tight pb-5">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Services</span>
                    </h2>
                </div>

                <div className="overflow-hidden rounded-[24px] lg:rounded-[36px] border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 shadow-[0_10px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                    <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="relative min-h-[250px] sm:min-h-[320px] lg:min-h-[520px] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentService.id}
                                    initial={{ opacity: 0, x: 24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -24 }}
                                    transition={{ duration: 0.45, ease: 'easeOut' }}
                                    className="absolute inset-0"
                                >
                                    <img src={currentService.image} alt={currentService.title} className="h-full w-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                                </motion.div>
                            </AnimatePresence>

                            <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 lg:p-10">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20 dark:border-white/20 bg-black/10 dark:bg-white/10 backdrop-blur-sm">
                                        {currentService.icon}
                                    </div>
                                    <div>
                                        {/* <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                                            {currentService.id}
                                        </p> */}
                                        <p className="text-sm font-semibold text-white">
                                            {activeService + 1} / {services.length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-black/45 dark:text-white/45">
                                    Featured service
                                </p>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentService.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -12 }}
                                        transition={{ duration: 0.35, ease: 'easeOut' }}
                                        className="mt-4"
                                    >
                                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-black dark:text-[#f8fafc]">
                                            {currentService.title}
                                        </h3>
                                        <p className="mt-3 lg:mt-4 max-w-xl text-sm leading-relaxed text-black/70 dark:text-white/70 sm:text-base">
                                            {currentService.description}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>

                                {/* <div className="mt-8 flex flex-wrap gap-2">
                                    {services.map((service, index) => (
                                        <button
                                            key={service.id}
                                            type="button"
                                            onClick={() => setActiveService(index)}
                                            className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition-all ${
                                                index === activeService
                                                    ? 'border-white/40 bg-white/15 text-white'
                                                    : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white'
                                            }`}
                                        >
                                            {service.id}
                                        </button>
                                    ))}
                                </div> */}
                            </div>

                            <div className="mt-8 flex items-center justify-between gap-4 border-t border-black/10 dark:border-white/10 pt-6">
                                <div className="flex items-center gap-10">
                                    <button
                                        type="button"
                                        onClick={goToPrev}
                                        className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 dark:border-white/15 bg-black/10 dark:bg-white/10 transition hover:bg-black/15 dark:hover:bg-white/15"
                                    >
                                        <ArrowLeft size={18} className="text-black dark:text-[#f8fafc]" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={goToNext}
                                        className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 dark:border-white/15 bg-black/10 dark:bg-white/10 transition hover:bg-black/15 dark:hover:bg-white/15"
                                    >
                                        <ArrowRight size={18} className="text-black dark:text-[#f8fafc]" />
                                    </button>
                                </div>

                                <div className="text-sm text-black/60 dark:text-white/60">

                                    Swipe through the services and explore each.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <GradualBlur position="bottom" height="8rem" strength={2.5} divCount={8} curve="bezier" exponential opacity={0.6} zIndex={5} /> */}
        </section>
    )
}
