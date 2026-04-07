import { useNavigate } from 'react-router';
import { useItems } from '@/app/contexts/ItemsContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { motion } from 'motion/react';
import {
  Smartphone, ShoppingBag, Shirt, BookOpen,
  Pencil, Key, Dumbbell, CreditCard, Package, ArrowUpRight,
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Electronics',      icon: Smartphone,   accent: 'accent1' },
  { name: 'Bags',             icon: ShoppingBag,  accent: 'accent2' },
  { name: 'Clothing',         icon: Shirt,        accent: 'accent3' },
  { name: 'Books',            icon: BookOpen,     accent: 'accent1' },
  { name: 'School Supplies',  icon: Pencil,       accent: 'accent2' },
  { name: 'Personal Items',   icon: CreditCard,   accent: 'accent3' },
  { name: 'Sports Equipment', icon: Dumbbell,     accent: 'accent1' },
  { name: 'Keys & Cards',     icon: Key,          accent: 'accent2' },
  { name: 'Other',            icon: Package,      accent: 'accent3' },
] as const;

export function CategoryGrid() {
  const navigate = useNavigate();
  const { items } = useItems();
  const { getColor } = useTheme();

  // only count approved items — no point showing pending ones the user can't claim yet
  const getCount = (name: string) =>
    items.filter((i) => i.category === name && i.status === 'approved').length;

  return (
    <section
      className="py-24"
      style={{ backgroundColor: getColor('bgPrimary') }}
      aria-label="Browse by category"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-0.5 w-10" style={{ background: getColor('accent2') }} />
            <span
              className="text-xs font-black tracking-widest uppercase"
              style={{ color: getColor('accent2') }}
            >
              Quick Browse
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-black"
            style={{ color: getColor('textPrimary') }}
          >
            Browse by Category
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, i) => {
            const count = getCount(cat.name);
            const Icon = cat.icon;
            const color = getColor(cat.accent);

            return (
              <motion.button
                key={cat.name}
                onClick={() => navigate('/items')}
                className="group relative overflow-hidden text-left rounded-2xl border-2 p-5 transition-shadow hover:shadow-xl cursor-pointer"
                style={{
                  backgroundColor: getColor('bgCard'),
                  borderColor: getColor('border'),
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Hover fill */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${color}18, ${color}08)` }}
                />

                {/* Border highlight on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderColor: `${color}60` }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <Icon className="h-6 w-6" style={{ color }} />
                  </div>

                  {/* Name */}
                  <p
                    className="font-bold text-sm leading-tight mb-1"
                    style={{ color: getColor('textPrimary') }}
                  >
                    {cat.name}
                  </p>

                  {/* Count / arrow row */}
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: count > 0 ? color : getColor('textTertiary') }}
                    >
                      {count > 0 ? `${count} available` : 'Browse all'}
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 translate-y-1 group-hover:translate-y-0 transition-transform duration-200"
                      style={{ color }}
                    />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
