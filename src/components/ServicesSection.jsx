import { useRef, useState } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'
import { X, Plus } from 'lucide-react'

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
        title: 'FRONTEND',
        subtitle: 'Development',
        description: 'We craft impactful digital experiences that connect with your audience and build long-term trust. Through strategic thinking and clean code, your platform gains clarity, consistency, and character.',
        features: ['React & Next.js', 'Vue & Nuxt', 'Tailwind CSS', 'Framer Motion', 'Web Accessibility', 'Performance Optimization'],
        image: getServiceImage('frontend'),
        accentColor: '#9333ea',
    },
    {
        id: '02',
        title: 'BACKEND',
        subtitle: 'Architecture',
        description: 'Scalable APIs, secure auth systems, databases, and solid server architecture tailored to power modern applications reliably under heavy load.',
        features: ['Node.js & Express', 'Python & Django', 'Database Design', 'Microservices', 'API Development', 'Cloud Security'],
        image: getServiceImage('backend'),
        accentColor: '#9333ea',
    },
    {
        id: '03',
        title: 'MERN STACK',
        subtitle: 'Fullstack',
        description: 'End-to-end web applications powered by MongoDB, Express, React, and Node.js. Delivering unified stacks for fast iterations and seamless data flow.',
        features: ['MongoDB Integration', 'Express Server setup', 'React Frontends', 'Node.js Backends', 'REST & GraphQL APIs', 'State Management'],
        image: getServiceImage('mern'),
        accentColor: '#9333ea',
    },
    {
        id: '04',
        title: 'DJANGO',
        subtitle: 'Python',
        description: 'Secure and maintainable Django builds with admin tools, business logic, and smooth deployment, perfect for complex, data-driven backends.',
        features: ['Django ORM', 'Django REST Framework', 'PostgreSQL', 'Admin Customization', 'Celery Tasks', 'Caching Strategies'],
        image: getServiceImage('django'),
        accentColor: '#9333ea',
    },
    {
        id: '05',
        title: 'API',
        subtitle: 'Integration',
        description: 'Seamless integrations for payments, WhatsApp, email, authentication, and third-party platforms to supercharge your application capabilities.',
        features: ['Stripe / PayPal', 'Twilio & SendGrid', 'OAuth & JWT', 'WhatsApp API', 'Webhooks', 'Custom Middleware'],
        image: getServiceImage('apiimage'),
        accentColor: '#9333ea',
    },
    {
        id: '06',
        title: 'HOSTING',
        subtitle: 'Deployment',
        description: 'Reliable deployment workflows, performance tuning, and scalable hosting setups to keep your live products fast and always available.',
        features: ['AWS & Vercel', 'Docker & CI/CD', 'Nginx & SSL', 'Load Balancing', 'Database Backups', 'Uptime Monitoring'],
        image: getServiceImage('host'),
        accentColor: '#9333ea',
    },
    {
        id: '07',
        title: 'SUPPORT',
        subtitle: 'Maintenance',
        description: 'Ongoing updates, monitoring, and support to keep your application stable, secure, and growing alongside your business.',
        features: ['Bug Fixing', 'Security Audits', 'Dependency Updates', 'Performance Tuning', '24/7 Monitoring', 'Feature Additions'],
        image: getServiceImage('support'),
        accentColor: '#9333ea',
    },
]

function ServiceRow({ service, index, isExpanded, onToggle }) {
    const [isHovered, setIsHovered] = useState(false);
    const x = useSpring(0, { stiffness: 300, damping: 30 });
    const y = useSpring(0, { stiffness: 300, damping: 30 });
    const rotate = useSpring(0, { stiffness: 300, damping: 30 });
    const rowRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!rowRef.current || isExpanded) return;
        const rect = rowRef.current.getBoundingClientRect();
        const xPos = e.clientX - rect.left;
        const yPos = e.clientY - rect.top;

        x.set(xPos);
        y.set(yPos);

        const movementX = e.movementX;
        rotate.set(movementX * 0.5);
    };

    return (
        <div
            ref={rowRef}
            className={`relative border-b border-gray-200 dark:border-white/10 py-10 md:py-14 group flex flex-col cursor-pointer transition-all ${isExpanded ? 'bg-gray-50/50 dark:bg-white/[0.02]' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                rotate.set(0);
            }}
            onMouseMove={handleMouseMove}
            onClick={onToggle}
        >
            {/* Hover Floating Image (Desktop Only) */}
            <motion.div
                style={{
                    x,
                    y,
                    rotate,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: (isHovered && !isExpanded) ? 1 : 0, scale: (isHovered && !isExpanded) ? 1 : 0.8 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute left-0 top-0 z-50 hidden md:block overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-[220px] h-[140px]"
            >
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            </motion.div>

            {/* Top Row: Title & Action Button */}
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 relative z-10 pointer-events-none w-full pl-4 md:pl-0">
                    <span className="text-[#9333ea] font-medium text-lg md:text-xl shrink-0 md:w-12">
                        {service.id}
                    </span>
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 flex-wrap">
                        <h3 className={`text-5xl md:text-6xl lg:text-[6.5rem] font-black uppercase tracking-tighter transition-colors duration-300 leading-[0.85] ${isExpanded ? 'text-[#9333ea]' : 'text-gray-900 dark:text-[#f8fafc] group-hover:text-[#9333ea]'}`}>
                            {service.title}
                        </h3>
                        <span className="text-gray-500 dark:text-gray-400 text-lg md:text-2xl font-light tracking-wide mt-2 md:mt-0">
                            {service.subtitle}
                        </span>
                    </div>
                </div>

                {/* Right Side Icons */}
                <div className="relative z-10 shrink-0 ml-4 hidden sm:flex items-center justify-center pr-4 md:pr-0">
                    {isExpanded ? (
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <X size={24} strokeWidth={1.5} />
                        </div>
                    ) : (
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center transition-all group-hover:border-[#9333ea]">
                            <Plus size={24} strokeWidth={1.5} className="text-gray-400 dark:text-gray-500 group-hover:text-[#9333ea] transition-colors" />
                        </div>
                    )}
                </div>
            </div>

            {/* Expanded Content Area */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 40 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden w-full pl-4 md:pl-[5.5rem] pr-4 md:pr-0"
                    >
                        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start pb-6">
                            {/* Left: Description */}
                            <div className="flex-1 max-w-lg relative z-10">
                                <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            {/* Right: Features Grid */}
                            <div className="flex-1 w-full relative z-10">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-2">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-gray-700 dark:text-gray-300 text-base md:text-lg">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 mr-3 shrink-0"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ServicesSection() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleToggle = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <section id="services" className="relative py-24 overflow-hidden bg-white dark:bg-[#050505]">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="inline-flex items-center gap-3 mb-10 md:mb-16 pl-4 md:pl-0">
                    <span className="w-12 h-[2px] bg-[#9333ea] rounded-full" />
                    <span className="text-sm font-bold tracking-widest text-[#9333ea] uppercase">Our Expertise</span>
                    <span className="w-12 h-[2px] bg-[#9333ea] rounded-full" />
                </div>

                <div className="border-t border-gray-200 dark:border-white/10 flex flex-col">
                    {services.map((service, index) => (
                        <ServiceRow
                            key={service.id}
                            service={service}
                            index={index}
                            isExpanded={expandedIndex === index}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
