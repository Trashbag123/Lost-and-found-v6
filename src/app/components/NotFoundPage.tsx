import { Link } from 'react-router';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Search, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';

export function NotFoundPage() {
  const { getColor } = useTheme();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: getColor('bgPrimary') }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
          style={{ backgroundColor: `${getColor('accent1')}15` }}
        >
          <Search className="h-10 w-10" style={{ color: getColor('accent1') }} />
        </div>

        <h1
          className="text-6xl font-bold mb-3"
          style={{ color: getColor('accent1') }}
        >
          404
        </h1>

        <h2
          className="text-2xl font-semibold mb-3"
          style={{ color: getColor('textPrimary') }}
        >
          Page not found
        </h2>

        <p
          className="text-base mb-8 leading-relaxed"
          style={{ color: getColor('textSecondary') }}
        >
          Looks like this page got lost too. Let's help you find your way back.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button
              className="w-full sm:w-auto font-medium text-white rounded-lg px-6"
              style={{ backgroundColor: getColor('accent1') }}
            >
              <Home className="h-4 w-4 mr-2" aria-hidden="true" />
              Go home
            </Button>
          </Link>

          <Link to="/items">
            <Button
              variant="outline"
              className="w-full sm:w-auto font-medium rounded-lg px-6"
              style={{
                borderColor: getColor('border'),
                color: getColor('textPrimary'),
              }}
            >
              <Search className="h-4 w-4 mr-2" aria-hidden="true" />
              Browse items
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
