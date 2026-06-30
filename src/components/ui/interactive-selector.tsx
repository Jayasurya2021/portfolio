import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type InteractiveService = {
  id: string;
  title: string;
  description: string;
  image: string;
  accentColor?: string;
  icon?: ReactNode;
};

type InteractiveSelectorProps = {
  services: InteractiveService[];
  activeService: number;
  onSelect?: (index: number) => void;
};

export default function InteractiveSelector({
  services,
  activeService,
  onSelect,
}: InteractiveSelectorProps) {
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  const activeIndex = Math.min(Math.max(activeService, 0), Math.max(services.length - 1, 0));

  useEffect(() => {
    setAnimatedOptions([]);

    if (!services.length) {
      return;
    }

    const timers = services.map((_, index) =>
      window.setTimeout(() => {
        setAnimatedOptions((prev) => (prev.includes(index) ? prev : [...prev, index]));
      }, 180 * index)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [services]);

  const current = services[activeIndex] ?? services[0];

  if (!services.length) {
    return null;
  }

  return (
    <div className="relative h-[660px] w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#121212] p-5 shadow-[0_30px_120px_-30px_rgba(0,0,0,0.65)] sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(124,58,237,0.18),_transparent_40%)]" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50">
              Featured experience
            </p>
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">
              {current?.title ?? 'Service preview'}
            </h3>
          </div>
          <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70 backdrop-blur">
            {activeIndex + 1}/{services.length}
          </div>
        </div>

        <div className="flex flex-1 gap-3">
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            const isVisible = animatedOptions.includes(index);

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelect?.(index)}
                className={`group relative flex min-w-[58px] flex-col justify-end overflow-hidden rounded-[22px] border text-left transition-all duration-700 ease-out ${
                  isActive
                    ? 'border-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.45)]'
                    : 'border-white/10 hover:border-white/30'
                }`}
                style={{
                  flex: isActive ? '1.35' : '0.65',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(24px)',
                  backgroundImage: `url('${service.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#18181b',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent" />

                <div className="relative z-10 flex items-center gap-3 px-4 pb-4 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/35 backdrop-blur-sm">
                    {service.icon ?? <span className="text-sm font-semibold text-white">0{index + 1}</span>}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60">
                      {service.id}
                    </p>
                    <p className="truncate text-sm font-semibold text-white">
                      {service.title}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 px-4 pb-5">
                  <div
                    className={`text-sm leading-relaxed transition-all duration-500 ${
                      isActive ? 'translate-y-0 opacity-100 text-white/90' : 'translate-y-2 opacity-0 text-white/70'
                    }`}
                  >
                    {service.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
