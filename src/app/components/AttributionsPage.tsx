import { useTheme } from '@/app/contexts/ThemeContext';
import { Card, CardContent } from '@/app/components/ui/card';
import { BookOpen, Image, Code, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface Attribution {
  name: string;
  description: string;
  url: string;
  license: string;
}

const codeLibraries: Attribution[] = [
  { name: 'React', description: 'UI component library', url: 'https://react.dev', license: 'MIT' },
  { name: 'Vite', description: 'Build tool and dev server', url: 'https://vitejs.dev', license: 'MIT' },
  { name: 'React Router', description: 'Client-side routing', url: 'https://reactrouter.com', license: 'MIT' },
  { name: 'Tailwind CSS', description: 'Utility-first CSS framework', url: 'https://tailwindcss.com', license: 'MIT' },
  { name: 'shadcn/ui', description: 'Accessible UI component primitives', url: 'https://ui.shadcn.com', license: 'MIT' },
  { name: 'Radix UI', description: 'Accessible component primitives', url: 'https://www.radix-ui.com', license: 'MIT' },
  { name: 'Framer Motion', description: 'Animation library', url: 'https://www.framer.com/motion', license: 'MIT' },
  { name: 'Lucide React', description: 'Icon library', url: 'https://lucide.dev', license: 'ISC' },
  { name: 'Sonner', description: 'Toast notification component', url: 'https://sonner.emilkowal.ski', license: 'MIT' },
  { name: 'TypeScript', description: 'Typed JavaScript', url: 'https://www.typescriptlang.org', license: 'Apache 2.0' },
];

const photoSources: Attribution[] = [
  { name: 'Unsplash', description: 'All item photos used throughout the site are sourced from Unsplash photographers and used under the Unsplash License, which permits free use for commercial and non-commercial purposes.', url: 'https://unsplash.com', license: 'Unsplash License' },
];

export function AttributionsPage() {
  const { getColor } = useTheme();

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: getColor('bgPrimary') }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
            style={{ backgroundColor: `${getColor('accent1')}20` }}
          >
            <Heart className="h-8 w-8" style={{ color: getColor('accent1') }} />
          </div>
          <h1 className="text-3xl font-bold mb-3" style={{ color: getColor('textPrimary') }}>
            Attributions
          </h1>
          <p className="text-base max-w-2xl mx-auto" style={{ color: getColor('textSecondary') }}>
            This project was built using open-source libraries and freely licensed media. We gratefully acknowledge all contributors below.
          </p>
        </motion.div>

        <div className="space-y-8">

          {/* Photos */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-3 mb-4">
              <Image className="h-5 w-5" style={{ color: getColor('accent2') }} />
              <h2 className="text-xl font-semibold" style={{ color: getColor('textPrimary') }}>
                Photography
              </h2>
            </div>
            {photoSources.map((source) => (
              <Card
                key={source.name}
                className="border rounded-xl"
                style={{ backgroundColor: getColor('bgCard'), borderColor: getColor('border') }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-base hover:underline"
                        style={{ color: getColor('accent1') }}
                      >
                        {source.name}
                      </a>
                      <p className="text-sm mt-1 leading-relaxed" style={{ color: getColor('textSecondary') }}>
                        {source.description}
                      </p>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded whitespace-nowrap"
                      style={{ backgroundColor: getColor('bgSecondary'), color: getColor('textTertiary') }}
                    >
                      {source.license}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Code libraries */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-5 w-5" style={{ color: getColor('accent2') }} />
              <h2 className="text-xl font-semibold" style={{ color: getColor('textPrimary') }}>
                Open-Source Libraries
              </h2>
            </div>
            <Card
              className="border rounded-xl"
              style={{ backgroundColor: getColor('bgCard'), borderColor: getColor('border') }}
            >
              <CardContent className="p-0">
                {codeLibraries.map((lib, i) => (
                  <div
                    key={lib.name}
                    className="flex items-center justify-between px-6 py-4"
                    style={{
                      borderBottom: i < codeLibraries.length - 1 ? `1px solid ${getColor('border')}` : 'none',
                    }}
                  >
                    <div>
                      <a
                        href={lib.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-sm hover:underline"
                        style={{ color: getColor('accent1') }}
                      >
                        {lib.name}
                      </a>
                      <p className="text-xs mt-0.5" style={{ color: getColor('textSecondary') }}>
                        {lib.description}
                      </p>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded"
                      style={{ backgroundColor: getColor('bgSecondary'), color: getColor('textTertiary') }}
                    >
                      {lib.license}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Tools & Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-5 w-5" style={{ color: getColor('accent2') }} />
              <h2 className="text-xl font-semibold" style={{ color: getColor('textPrimary') }}>
                Tools & Services
              </h2>
            </div>
            <Card
              className="border rounded-xl"
              style={{ backgroundColor: getColor('bgCard'), borderColor: getColor('border') }}
            >
              <CardContent className="p-0">
                {[
                  { name: 'Vercel', description: 'Hosting and deployment', url: 'https://vercel.com', license: 'Proprietary (free tier)' },
                ].map((tool, i) => (
                  <div
                    key={tool.name}
                    className="flex items-center justify-between px-6 py-4"
                    style={{ borderBottom: i < 2 ? `1px solid ${getColor('border')}` : 'none' }}
                  >
                    <div>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-sm hover:underline"
                        style={{ color: getColor('accent1') }}
                      >
                        {tool.name}
                      </a>
                      <p className="text-xs mt-0.5" style={{ color: getColor('textSecondary') }}>
                        {tool.description}
                      </p>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded"
                      style={{ backgroundColor: getColor('bgSecondary'), color: getColor('textTertiary') }}
                    >
                      {tool.license}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
