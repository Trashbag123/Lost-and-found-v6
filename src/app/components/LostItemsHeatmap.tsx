import { motion } from 'motion/react';
import { MapPin, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { useTheme } from '@/app/contexts/ThemeContext';

const locationData = [
  { location: 'Library', count: 45, percentage: 28, trend: 'up' as const },
  { location: 'Gym', count: 38, percentage: 24, trend: 'stable' as const },
  { location: 'Cafeteria', count: 32, percentage: 20, trend: 'up' as const },
  { location: 'Classroom A', count: 25, percentage: 16, trend: 'down' as const },
  { location: 'Student Center', count: 12, percentage: 8, trend: 'stable' as const },
  { location: 'Parking Lot', count: 6, percentage: 4, trend: 'down' as const },
];

export function LostItemsHeatmap() {
  const { getColor } = useTheme();
  const maxCount = Math.max(...locationData.map(d => d.count));

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: getColor('bgSecondary') }}>
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <span 
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{
              backgroundColor: `${getColor('accent3')}20`,
              color: getColor('accent3')
            }}
          >
            Location Insights
          </span>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${getColor('accent3')}, ${getColor('accent3Light')})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Where Items Are Most Often Lost
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: getColor('textSecondary') }}>
            Data-driven insights to help you know where to check first
          </p>
        </div>

        <Card 
          className="border-0 shadow-lg backdrop-blur-sm"
          style={{ backgroundColor: getColor('bgCard') }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" style={{ color: getColor('accent3') }} />
              <span style={{ color: getColor('textPrimary') }}>Top Lost & Found Locations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {locationData.map((data, index) => (
              <motion.div
                key={data.location}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1">
                    <span 
                      className="font-semibold transition-colors"
                      style={{ color: getColor('textPrimary') }}
                    >
                      {data.location}
                    </span>
                    {data.trend === 'up' && (
                      <TrendingUp className="h-4 w-4" style={{ color: getColor('accent1') }} />
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium" style={{ color: getColor('textSecondary') }}>
                      {data.count} items
                    </span>
                    <span className="text-sm font-bold min-w-[3rem] text-right" style={{ color: getColor('accent3') }}>
                      {data.percentage}%
                    </span>
                  </div>
                </div>
                
                <div 
                  className="relative h-3 rounded-full overflow-hidden"
                  style={{ backgroundColor: getColor('bgSecondary') }}
                >
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ background: `linear-gradient(to right, ${getColor('accent3')}, ${getColor('accent3Light')})` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${data.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
