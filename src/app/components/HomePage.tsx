import { Link } from 'react-router';
import { Search, Package, ArrowRight, BarChart3, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { MatrixRainEffect } from '@/app/components/effects/MatrixRainEffect';
import { LightningEffect } from '@/app/components/effects/LightningEffect';
import { UltraParticleTrails } from '@/app/components/effects/UltraParticleTrails';
import { UltraHolographicPrism } from '@/app/components/effects/UltraHolographicPrism';
import { UltraModeIndicator } from '@/app/components/effects/UltraModeIndicator';
import { ActivityTicker } from '@/app/components/ActivityTicker';


export function HomePage() {
  const { getColor, performanceLevel } = useTheme();

  return (
    <div className="relative min-h-screen">
      {/* Ultra-mode exclusive visual effects */}
      {performanceLevel === 'ultra' && (
        <>
          <MatrixRainEffect />
          <LightningEffect />
          <UltraParticleTrails />
          <UltraHolographicPrism />
          <UltraModeIndicator />
        </>
      )}

      <div className="relative" style={{ zIndex: 1 }}>

        {/* Hero */}
        <div className="relative overflow-hidden" style={{ minHeight: '90vh' }}>
          <div className="absolute inset-0" style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
            background: `linear-gradient(135deg, ${getColor('accent1')}15, ${getColor('accent2')}10)`,
          }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              className="pt-32 pb-16"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <div className="flex items-start gap-12 mb-16">
                <div className="flex-1 pt-8">
                  <motion.div
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="h-0.5 w-12" style={{ background: getColor('accent1') }} />
                    <span className="text-sm font-bold tracking-widest uppercase" style={{ color: getColor('accent1') }}>
                      School Lost & Found System
                    </span>
                  </motion.div>

                  <motion.h1
                    className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8"
                    style={{ color: getColor('textPrimary') }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Lost<br />
                    <span style={{ color: getColor('accent1') }}>Something?</span><br />
                    <span className="text-5xl md:text-6xl" style={{ color: getColor('textSecondary') }}>
                      We'll Find It.
                    </span>
                  </motion.h1>

                  <motion.p
                    className="text-xl md:text-2xl max-w-2xl leading-relaxed mb-12"
                    style={{ color: getColor('textSecondary') }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Browse items that have been turned in, report something you found, or submit a claim to get your stuff back.
                    <span className="font-bold" style={{ color: getColor('accent2') }}> Check your notifications</span> when your claim is approved.
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-5 items-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Link to="/items">
                      <motion.div whileHover={{ x: 10, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <div
                          className="px-12 py-6 font-bold text-xl text-white relative overflow-hidden group"
                          style={{ background: getColor('accent1') }}
                        >
                          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"
                            style={{ background: getColor('accent1Dark') }}
                          />
                          <span className="relative flex items-center gap-3">
                            <Search className="h-6 w-6" aria-hidden="true" />
                            Search Items
                            <ArrowRight className="h-6 w-6" />
                          </span>
                        </div>
                      </motion.div>
                    </Link>

                    <Link to="/submit">
                      <motion.div whileHover={{ x: 10, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <div
                          className="px-12 py-6 font-bold text-xl border-[5px] relative overflow-hidden group"
                          style={{
                            borderColor: getColor('accent2'),
                            color: getColor('accent2'),
                            backgroundColor: 'transparent'
                          }}
                        >
                          <div className="absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"
                            style={{ background: getColor('accent2') }}
                          />
                          <span className="relative flex items-center gap-3 group-hover:text-white transition-colors">
                            <Package className="h-6 w-6" />
                            Report Item
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Live activity ticker */}
        <ActivityTicker />

        {/* Features */}
        <section aria-label="Features" style={{ backgroundColor: getColor('bgPrimary') }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">

            <motion.div
              className="mb-24 pb-6 border-b-4"
              style={{ borderColor: getColor('border') }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-7xl md:text-8xl font-black" style={{ color: getColor('textPrimary') }}>
                Features
              </div>
              <div className="text-2xl mt-2" style={{ color: getColor('textSecondary') }}>
                Everything you need to reunite with lost items
              </div>
            </motion.div>

            {/* Asymmetric Grid */}
            <div className="grid grid-cols-12 gap-6">

              {/* Large Feature 1 */}
              <motion.div
                className="col-span-12 lg:col-span-7"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Link to="/items">
                  <div
                    className="relative h-[500px] overflow-hidden group border-[5px]"
                    style={{
                      borderColor: getColor('accent1'),
                      backgroundColor: getColor('bgCard')
                    }}
                  >
                    <div className="absolute inset-0 opacity-5" style={{
                      backgroundImage: `repeating-linear-gradient(45deg, ${getColor('accent1')} 0, ${getColor('accent1')} 1px, transparent 0, transparent 50%)`,
                      backgroundSize: '10px 10px'
                    }} />

                    <div className="relative h-full p-12 flex flex-col justify-between">
                      <div>
                        <h3 className="text-5xl md:text-6xl font-black mb-6 leading-tight" style={{ color: getColor('textPrimary') }}>
                          Smart<br />Search<br />Engine
                        </h3>
                        <p className="text-xl max-w-md" style={{ color: getColor('textSecondary') }}>
                          Filter by category, location, and date to find what you're looking for.
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-xl font-bold group-hover:translate-x-5 transition-transform"
                        style={{ color: getColor('accent1') }}
                      >
                        Browse Items
                        <ArrowRight className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Small Feature 1 */}
              <motion.div
                className="col-span-12 lg:col-span-5"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link to="/submit">
                  <div
                    className="h-[500px] p-8 border-[5px] group relative overflow-hidden"
                    style={{
                      borderColor: getColor('accent2'),
                      background: `linear-gradient(135deg, ${getColor('accent2')}10, transparent)`
                    }}
                  >
                    <Package className="h-20 w-20 mb-6" style={{ color: getColor('accent2') }} />
                    <h3 className="text-5xl font-black mb-5" style={{ color: getColor('textPrimary') }}>
                      Quick Report
                    </h3>
                    <p className="text-lg mb-8" style={{ color: getColor('textSecondary') }}>
                      Found something? Fill in a quick form and add a photo so the owner can identify it.
                    </p>

                    <div className="absolute bottom-8 left-8 text-lg font-bold group-hover:translate-x-2 transition-transform"
                      style={{ color: getColor('accent2') }}
                    >
                      Submit Item →
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Small Feature 2 */}
              <motion.div
                className="col-span-12 md:col-span-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link to="/claims">
                  <div
                    className="h-[400px] p-8 border-[5px] relative overflow-hidden group"
                    style={{
                      borderColor: getColor('accent3'),
                      backgroundColor: getColor('bgCard')
                    }}
                  >
                    <Shield className="h-16 w-16 mb-5" style={{ color: getColor('accent3') }} />
                    <h3 className="text-3xl font-black mb-5" style={{ color: getColor('textPrimary') }}>
                      Verified Claims
                    </h3>
                    <p className="text-base" style={{ color: getColor('textSecondary') }}>
                      Claims are reviewed before items are released — so things go back to who they belong to.
                    </p>

                    <div className="absolute bottom-8 left-8 font-bold group-hover:translate-x-2 transition-transform"
                      style={{ color: getColor('accent3') }}
                    >
                      View Claims →
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Small Feature 3 */}
              <motion.div
                className="col-span-12 md:col-span-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link to="/items">
                  <div
                    className="h-[400px] p-8 relative overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
                    }}
                  >
                    <BarChart3 className="h-16 w-16 mb-5 text-white" />
                    <h3 className="text-5xl font-black mb-5 text-white">
                      Stats & Trends
                    </h3>
                    <p className="text-lg text-white opacity-90 max-w-md">
                      See how many items are available, what's been claimed, and where things tend to get left behind.
                    </p>

                    <div className="absolute bottom-8 left-8 text-white font-bold text-xl group-hover:translate-x-2 transition-transform">
                      View Listings →
                    </div>
                  </div>
                </Link>
              </motion.div>

            </div>
          </div>
        </section>

        {/* How it works */}
        <section aria-label="How it works" style={{ backgroundColor: getColor('bgSecondary') }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">

            <motion.div
              className="mb-20 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl md:text-7xl font-black mb-5" style={{ color: getColor('textPrimary') }}>
                How It Works
              </div>
              <div className="text-2xl max-w-3xl mx-auto" style={{ color: getColor('textSecondary') }}>
                Here's how to get your stuff back
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { num: '01', title: 'Search',  desc: 'Browse the items that have been turned in. Filter by category, location, or date to narrow it down.', colorKey: 'accent1' as const },
                { num: '02', title: 'Claim',   desc: 'Spot your item? Submit a claim with a description of the item to prove it belongs to you.',          colorKey: 'accent2' as const },
                { num: '03', title: 'Pick Up', desc: "Once your claim is approved you'll get a notification. Head to the main office to collect it.",       colorKey: 'accent3' as const },
              ].map((step, idx) => (
                <motion.div
                  key={step.num}
                  className="p-10 border-2 rounded-2xl"
                  style={{ borderColor: getColor('border'), backgroundColor: getColor('bgCard') }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <div className="text-4xl font-black mb-4" style={{ color: getColor(step.colorKey) }}>
                    {step.num}
                  </div>
                  <h3 className="text-2xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: getColor('textSecondary') }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section aria-label="Call to action" style={{ backgroundColor: getColor('bgPrimary') }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-40 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-7xl md:text-8xl font-black mb-12 leading-tight" style={{ color: getColor('textPrimary') }}>
                Missing something?<br />
                <span style={{ color: getColor('accent1') }}>It might be here.</span>
              </div>

              <Link to="/items">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <div
                    className="inline-block px-16 py-8 text-2xl font-black text-white relative overflow-hidden group"
                    style={{ background: getColor('accent1') }}
                  >
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"
                      style={{ background: getColor('accent2') }}
                    />
                    <span className="relative flex items-center gap-5">
                      Browse Found Items
                      <ArrowRight className="h-8 w-8" aria-hidden="true" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
}
