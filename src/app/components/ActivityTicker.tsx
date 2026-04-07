import { useEffect, useRef } from 'react';
import { useItems } from '@/app/contexts/ItemsContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { MapPin, Tag } from 'lucide-react';

// shown when there aren't enough real items to fill the ticker
const FALLBACK_ENTRIES = [
  { type: 'found', text: 'Blue backpack', location: 'Main Library' },
  { type: 'claimed', text: 'iPhone 13', location: 'Cafeteria' },
  { type: 'found', text: 'Keys with blue lanyard', location: 'Parking Lot B' },
  { type: 'claimed', text: 'AirPods Pro', location: 'Student Center' },
  { type: 'found', text: 'TI-84 calculator', location: 'Math Building' },
  { type: 'claimed', text: 'North Face jacket', location: 'Science Lab' },
  { type: 'found', text: 'Hydro Flask', location: 'Gym' },
  { type: 'claimed', text: 'Sony headphones', location: 'Library' },
];

export function ActivityTicker() {
  const { items } = useItems();
  const { getColor } = useTheme();
  const trackRef = useRef<HTMLDivElement>(null);

  // use real item data if we have enough, otherwise use the fallback list
  const realEntries = items.slice(0, 12).map((item) => ({
    type: item.status === 'claimed' ? 'claimed' : 'found',
    text: item.title,
    location: item.location.split(' - ')[0], // trim room numbers
  }));

  // duplicate the array so the scroll loops seamlessly
  const entries = realEntries.length >= 6
    ? [...realEntries, ...realEntries]
    : [...FALLBACK_ENTRIES, ...FALLBACK_ENTRIES];

  return (
    <div
      className="relative overflow-hidden py-3 border-y"
      style={{
        backgroundColor: `${getColor('bgCard')}cc`,
        borderColor: getColor('border'),
      }}
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${getColor('bgCard')}, transparent)`,
        }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to left, ${getColor('bgCard')}, transparent)`,
        }}
      />

      {/* Label */}
      <div
        className="absolute left-0 top-0 bottom-0 flex items-center px-4 z-20 border-r"
        style={{
          backgroundColor: getColor('bgCard'),
          borderColor: getColor('border'),
        }}
      >
        <span className="text-xs font-black tracking-widest uppercase whitespace-nowrap" style={{ color: getColor('accent1') }}>
          Live
        </span>
        <span
          className="ml-2 w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: getColor('accent1') }}
        />
      </div>

      {/* Scrolling track */}
      <div className="pl-20">
        <div
          ref={trackRef}
          className="flex gap-6 ticker-scroll"
          style={{ width: 'max-content' }}
        >
          {entries.map((entry, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              {/* Status pill */}
              <span
                className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: entry.type === 'found'
                    ? `${getColor('accent1')}20`
                    : `${getColor('accent3')}20`,
                  color: entry.type === 'found'
                    ? getColor('accent1')
                    : getColor('accent3'),
                }}
              >
                {entry.type === 'found' ? 'Found' : 'Claimed'}
              </span>

              <Tag className="h-3 w-3 flex-shrink-0" style={{ color: getColor('textTertiary') }} />

              <span
                className="text-sm font-semibold whitespace-nowrap"
                style={{ color: getColor('textPrimary') }}
              >
                {entry.text}
              </span>

              <MapPin className="h-3 w-3 flex-shrink-0" style={{ color: getColor('textTertiary') }} />

              <span
                className="text-xs whitespace-nowrap"
                style={{ color: getColor('textSecondary') }}
              >
                {entry.location}
              </span>

              {/* Dot separator */}
              <span
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: getColor('border') }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-scroll {
          animation: ticker 40s linear infinite;
        }
        .ticker-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
