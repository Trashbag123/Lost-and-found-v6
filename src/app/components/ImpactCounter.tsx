import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Heart, Clock, Award } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { useTheme } from '@/app/contexts/ThemeContext';

interface ImpactCounterProps {
  itemsReturned: number;
  studentsHelped: number;
  avgReturnTime: number;
  successRate: number;
}

export function ImpactCounter({
  itemsReturned,
  studentsHelped,
  avgReturnTime,
  successRate,
}: ImpactCounterProps) {
  const { getColor } = useTheme();

  const stats = [
    {
      icon: Heart,
      value: itemsReturned,
      label: 'Items Reunited',
      suffix: '',
      accent: 'accent1',
    },
    {
      icon: TrendingUp,
      value: studentsHelped,
      label: 'Students Helped',
      suffix: '',
      accent: 'accent3',
    },
    {
      icon: Clock,
      value: avgReturnTime,
      label: 'Avg Return Time',
      suffix: ' days',
      accent: 'accent3',
    },
    {
      icon: Award,
      value: successRate,
      label: 'Success Rate',
      suffix: '%',
      accent: 'accent1',
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: getColor('bgSecondary') }}>
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span 
              className="inline-block px-4 py-2 text-white rounded-full text-sm font-semibold mb-4 shadow-lg"
              style={{ background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
            >
              Our Impact
            </span>
          </motion.div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Making a Difference Together
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: getColor('textSecondary') }}>
            Real-time statistics showing the positive impact on our school community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
                  style={{ backgroundColor: getColor('bgCard') }}
                >
                  <div 
                    className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity"
                    style={{ background: `linear-gradient(to bottom right, ${getColor(stat.accent)}10, ${getColor(stat.accent)}05)` }}
                  />
                  <div className="relative p-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform"
                      style={{ background: `linear-gradient(to bottom right, ${getColor(stat.accent)}, ${getColor(stat.accent + 'Light')})` }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <motion.div
                      className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${getColor(stat.accent)}, ${getColor(stat.accent + 'Light')})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 10,
                        delay: index * 0.1 + 0.3,
                      }}
                    >
                      <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                    </motion.div>
                    <p className="font-medium text-sm" style={{ color: getColor('textSecondary') }}>{stat.label}</p>
                  </div>
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    style={{ background: `linear-gradient(to right, ${getColor(stat.accent)}, ${getColor(stat.accent + 'Light')})` }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function CountUp({ end, duration, suffix = '' }: { end: number; duration: number; suffix?: string }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count}{suffix}</>;
}
