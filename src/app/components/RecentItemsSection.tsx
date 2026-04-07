import { Link } from 'react-router';
import { useItems } from '@/app/contexts/ItemsContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { motion } from 'motion/react';
import { MapPin, Calendar, Package, ArrowRight, Sparkles } from 'lucide-react';

export function RecentItemsSection() {
  const { items } = useItems();
  const { getColor } = useTheme();

  // Newest 3 approved items
  const recent = items
    .filter((i) => i.status === 'approved')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  if (recent.length === 0) return null;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <section
      className="py-24"
      style={{ backgroundColor: getColor('bgSecondary') }}
      aria-label="Recently found items"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <motion.div
          className="flex items-end justify-between mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-0.5 w-10" style={{ background: getColor('accent3') }} />
              <span
                className="text-xs font-black tracking-widest uppercase"
                style={{ color: getColor('accent3') }}
              >
                New in
              </span>
              {/* Live pulse */}
              <span
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: `${getColor('accent3')}15`,
                  color: getColor('accent3'),
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: getColor('accent3') }}
                />
                Just turned in
              </span>
            </div>
            <h2
              className="text-5xl md:text-6xl font-black"
              style={{ color: getColor('textPrimary') }}
            >
              Recently Found
            </h2>
          </div>

          <Link to="/items" className="hidden sm:block">
            <motion.div
              className="flex items-center gap-2 font-bold text-sm px-5 py-3 rounded-xl border-2 transition-colors cursor-pointer"
              style={{
                borderColor: getColor('border'),
                color: getColor('textSecondary'),
              }}
              whileHover={{ x: 4 }}
            >
              See all items
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recent.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/item/${item.id}`} className="group block h-full">
                <motion.div
                  className="h-full rounded-2xl overflow-hidden border-2 transition-shadow hover:shadow-2xl"
                  style={{
                    backgroundColor: getColor('bgCard'),
                    borderColor: getColor('border'),
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: 220 }}>
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: `${getColor('accent1')}10` }}
                      >
                        <Package
                          className="h-16 w-16"
                          style={{ color: `${getColor('accent1')}40` }}
                        />
                      </div>
                    )}

                    {/* Category pill overlay */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm"
                        style={{
                          backgroundColor: `${getColor('bgCard')}cc`,
                          color: getColor('textPrimary'),
                        }}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* "Available" badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                        style={{
                          backgroundColor: `${getColor('accent3')}20`,
                          color: getColor('accent3'),
                        }}
                      >
                        <Sparkles className="h-3 w-3" />
                        Available
                      </span>
                    </div>

                    {/* Hover gradient overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(to top, ${getColor('bgCard')}80, transparent 60%)`,
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3
                      className="font-bold text-lg mb-3 leading-snug group-hover:text-accent transition-colors"
                      style={{ color: getColor('textPrimary') }}
                    >
                      {item.title}
                    </h3>

                    <div className="space-y-1.5 mb-5">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin
                          className="h-3.5 w-3.5 flex-shrink-0"
                          style={{ color: getColor('accent1') }}
                        />
                        <span
                          className="truncate"
                          style={{ color: getColor('textSecondary') }}
                        >
                          {item.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar
                          className="h-3.5 w-3.5 flex-shrink-0"
                          style={{ color: getColor('accent2') }}
                        />
                        <span style={{ color: getColor('textSecondary') }}>
                          Found {formatDate(item.dateFound)}
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div
                      className="flex items-center justify-between pt-4 border-t"
                      style={{ borderColor: getColor('border') }}
                    >
                      <span
                        className="text-sm font-bold"
                        style={{ color: getColor('accent1') }}
                      >
                        View details
                      </span>
                      <motion.div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${getColor('accent1')}15` }}
                        whileHover={{ scale: 1.15 }}
                      >
                        <ArrowRight
                          className="h-4 w-4"
                          style={{ color: getColor('accent1') }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile "see all" link */}
        <motion.div
          className="text-center mt-10 sm:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            to="/items"
            className="inline-flex items-center gap-2 font-bold text-sm"
            style={{ color: getColor('accent1') }}
          >
            See all items <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
