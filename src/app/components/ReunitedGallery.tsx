import { motion } from 'motion/react';
import { Heart, Quote } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { useTheme } from '@/app/contexts/ThemeContext';

const successStories = [
  {
    id: '1',
    studentName: 'Sarah M.',
    itemName: 'Blue Backpack',
    story: 'I lost my backpack with all my textbooks right before finals. Thanks to this platform, I got it back within 24 hours!',
    dateReunited: '2 days ago',
    category: 'Backpack',
  },
  {
    id: '2',
    studentName: 'James K.',
    itemName: 'Calculator',
    story: 'My graphing calculator disappeared from the library. Someone found it and posted it here. Got it back the same day!',
    dateReunited: '1 week ago',
    category: 'Electronics',
  },
  {
    id: '3',
    studentName: 'Emily R.',
    itemName: 'Laptop',
    story: 'Left my laptop in the cafeteria. The QR code feature helped match it to me quickly. Forever grateful!',
    dateReunited: '3 days ago',
    category: 'Electronics',
  },
];

export function ReunitedGallery() {
  const { getColor } = useTheme();

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: getColor('bgSecondary') }}>
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span 
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{
                backgroundColor: `${getColor('accent1')}20`,
                color: getColor('accent1')
              }}
            >
              Success Stories
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
            Reunited & It Feels So Good
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: getColor('textSecondary') }}>
            Real stories from students who found their lost items
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 overflow-hidden backdrop-blur-sm"
                style={{ backgroundColor: getColor('bgCard') }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(to bottom right, ${getColor('accent1')}05, transparent)` }}
                />
                <CardContent className="p-6 relative">
                  <div className="absolute top-4 right-4 opacity-10">
                    <Quote className="h-16 w-16" style={{ color: getColor('accent1') }} />
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <Avatar 
                      className="h-12 w-12 border-2"
                      style={{ borderColor: `${getColor('accent1')}20` }}
                    >
                      <AvatarFallback 
                        className="text-white font-semibold"
                        style={{ background: `linear-gradient(to bottom right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
                      >
                        {story.studentName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg" style={{ color: getColor('textPrimary') }}>
                        {story.studentName}
                      </h3>
                      <p className="text-sm" style={{ color: getColor('textSecondary') }}>
                        {story.dateReunited}
                      </p>
                    </div>
                    <Heart className="h-5 w-5" style={{ color: getColor('accent3'), fill: getColor('accent3') }} />
                  </div>

                  <div className="mb-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: `linear-gradient(to right, ${getColor('accent1')}10, ${getColor('accent1')}05)`,
                        color: getColor('accent1')
                      }}
                    >
                      {story.category}: {story.itemName}
                    </span>
                  </div>

                  <blockquote className="leading-relaxed italic" style={{ color: getColor('textSecondary') }}>
                    &quot;{story.story}&quot;
                  </blockquote>

                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    style={{ background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
