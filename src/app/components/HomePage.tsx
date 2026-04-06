import { Link } from 'react-router';
import { Search, Package, MessageSquare, TrendingUp, Clock, CheckCircle, ArrowRight, BarChart3, Shield, Eye } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';
import { useItems } from '@/app/contexts/ItemsContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { NeonEffects } from '@/app/components/NeonEffects';
import { AuroraEffect } from '@/app/components/AuroraEffect';
import { MatrixRainEffect } from '@/app/components/MatrixRainEffect';
import { LightningEffect } from '@/app/components/LightningEffect';
import { ChromaticAberration } from '@/app/components/ChromaticAberration';
import { UltraParticleTrails } from '@/app/components/UltraParticleTrails';
import { UltraHolographicPrism } from '@/app/components/UltraHolographicPrism';
import { UltraEnergyField } from '@/app/components/UltraEnergyField';
import { UltraModeIndicator } from '@/app/components/UltraModeIndicator';

// ─── Constants ────────────────────────────────────────────────────────────────

const AVG_RETURN_TIME_DAYS = 2.5;

// ─── Component ────────────────────────────────────────────────────────────────

export function HomePage() {
  const { items } = useItems();
  const { theme, getColor, performanceLevel } = useTheme();

  const approvedItems = items.filter((i) => i.status === 'approved');
  const claimedItems  = items.filter((i) => i.status === 'claimed');
  const successRate   = items.length > 0
    ? Math.round((claimedItems.length / items.length) * 100)
    : 0;

  const isDark  = theme === 'dark';
  const isUltra = performanceLevel === 'ultra';

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
                <motion.div 
                  className="text-[12rem] leading-none font-black opacity-10"
                  style={{ color: getColor('accent1') }}
                  initial={{ opacity: 0, rotate: -10 }}
                  animate={{ opacity: 0.1, rotate: 0 }}
                  transition={{ duration: 1.5 }}
                >
                  01
                </motion.div>
                
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
                    The most advanced lost-and-found platform designed specifically for schools. 
                    <span className="font-bold" style={{ color: getColor('accent2') }}> Real-time tracking</span>, 
                    <span className="font-bold" style={{ color: getColor('accent3') }}> instant notifications</span>, 
                    and zero hassle.
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-5 items-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Link to="/items">
                      <motion.div
                        whileHover={{ x: 10, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div 
                          className="px-12 py-6 font-bold text-xl text-white relative overflow-hidden group"
                          style={{ background: getColor('accent1') }}
                        >
                          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"
                            style={{ background: getColor('accent1Dark') }}
                          />
                          <span className="relative flex items-center gap-3">
                            <Search className="h-6 w-6" />
                            Search Items
                            <ArrowRight className="h-6 w-6" />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                    
                    <Link to="/submit">
                      <motion.div
                        whileHover={{ x: 10, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
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
        
        {/* Impact stats */}
        <div className="relative py-32" style={{ backgroundColor: getColor('bgSecondary') }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <motion.div 
              className="mb-20 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl md:text-7xl font-black mb-5" style={{ color: getColor('textPrimary') }}>
                Our Impact
              </div>
              <div className="text-2xl max-w-3xl mx-auto" style={{ color: getColor('textSecondary') }}>
                Real numbers from real students finding their lost belongings
              </div>
            </motion.div>
            
            {/* Big Impact Stats */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* Success Rate - Featured */}
              <motion.div
                className="relative overflow-hidden p-12 rounded-3xl"
                style={{ 
                  background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <TrendingUp className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-white">
                      <div className="text-sm opacity-80 font-semibold uppercase tracking-wide">Success Rate</div>
                      <div className="text-7xl font-black">{successRate}%</div>
                    </div>
                  </div>
                  <div className="text-white text-lg opacity-90">
                    Items successfully returned to their rightful owners. Our community-driven approach works!
                  </div>
                </div>
                
                {/* Decorative element */}
                <div className="absolute -bottom-10 -right-10 text-white/10 text-[15rem] font-black leading-none">
                  {successRate}
                </div>
              </motion.div>
              
              {/* Total Items - Featured */}
              <motion.div
                className="relative overflow-hidden p-12 border-[5px] rounded-3xl"
                style={{ 
                  borderColor: getColor('accent3'),
                  backgroundColor: getColor('bgCard')
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{ background: `${getColor('accent3')}20` }}
                    >
                      <Package className="h-10 w-10" style={{ color: getColor('accent3') }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: getColor('textSecondary') }}>
                        Total Items
                      </div>
                      <div className="text-7xl font-black" style={{ color: getColor('accent3') }}>
                        {items.length}
                      </div>
                    </div>
                  </div>
                  <div className="text-lg" style={{ color: getColor('textSecondary') }}>
                    Items processed through our platform this semester. Join thousands of students who trust us.
                  </div>
                </div>
                
                <div className="absolute -bottom-10 -right-10 text-[15rem] font-black leading-none opacity-5"
                  style={{ color: getColor('accent3') }}
                >
                  {items.length}
                </div>
              </motion.div>
            </motion.div>
            
            {/* Smaller Stats Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="p-8 rounded-2xl border-2 group hover:translate-y-[-8px] transition-all"
                style={{ 
                  borderColor: getColor('border'),
                  backgroundColor: getColor('bgCard')
                }}
                whileHover={{ borderColor: getColor('accent1') }}
              >
                <CheckCircle className="h-12 w-12 mb-5" style={{ color: getColor('accent2') }} />
                <div className="text-5xl font-black mb-2" style={{ color: getColor('accent2') }}>
                  {claimedItems.length}
                </div>
                <div className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: getColor('textSecondary') }}>
                  Items Returned
                </div>
                <div className="text-sm" style={{ color: getColor('textTertiary') }}>
                  Happy reunions with lost belongings
                </div>
              </motion.div>
              
              <motion.div
                className="p-8 rounded-2xl border-2 group hover:translate-y-[-8px] transition-all"
                style={{ 
                  borderColor: getColor('border'),
                  backgroundColor: getColor('bgCard')
                }}
                whileHover={{ borderColor: getColor('accent1') }}
              >
                <Clock className="h-12 w-12 mb-5" style={{ color: getColor('accent1') }} />
                <div className="text-5xl font-black mb-2" style={{ color: getColor('accent1') }}>
                  {AVG_RETURN_TIME_DAYS}d
                </div>
                <div className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: getColor('textSecondary') }}>
                  Avg. Return Time
                </div>
                <div className="text-sm" style={{ color: getColor('textTertiary') }}>
                  Fast reunions, minimal waiting
                </div>
              </motion.div>
              
              <motion.div
                className="p-8 rounded-2xl border-2 group hover:translate-y-[-8px] transition-all"
                style={{ 
                  borderColor: getColor('border'),
                  backgroundColor: getColor('bgCard')
                }}
                whileHover={{ borderColor: getColor('accent1') }}
              >
                <Eye className="h-12 w-12 mb-5" style={{ color: getColor('accent3') }} />
                <div className="text-5xl font-black mb-2" style={{ color: getColor('accent3') }}>
                  {approvedItems.length}
                </div>
                <div className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: getColor('textSecondary') }}>
                  Currently Available
                </div>
                <div className="text-sm" style={{ color: getColor('textTertiary') }}>
                  Waiting to be claimed right now
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Features */}
        <div className="relative py-32" style={{ backgroundColor: getColor('bgPrimary') }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <motion.div 
              className="mb-24 flex items-end justify-between border-b-5 pb-6"
              style={{ borderColor: getColor('border') }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div>
                <div className="text-7xl md:text-8xl font-black" style={{ color: getColor('textPrimary') }}>
                  Features
                </div>
                <div className="text-2xl mt-2" style={{ color: getColor('textSecondary') }}>
                  Everything you need to reunite with lost items
                </div>
              </div>
              <div className="text-9xl font-black opacity-10" style={{ color: getColor('accent1') }}>
                02
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
                        <div className="inline-block px-5 py-2 mb-6 border-2 text-sm font-bold"
                          style={{ borderColor: getColor('accent1'), color: getColor('accent1') }}
                        >
                          MOST POPULAR
                        </div>
                        <h3 className="text-5xl md:text-6xl font-black mb-6 leading-tight" style={{ color: getColor('textPrimary') }}>
                          Smart<br />Search<br />Engine
                        </h3>
                        <p className="text-xl max-w-md" style={{ color: getColor('textSecondary') }}>
                          Advanced filters, real-time results, and AI-powered matching to find your items instantly.
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xl font-bold group-hover:translate-x-5 transition-transform"
                        style={{ color: getColor('accent1') }}
                      >
                        Explore Feature
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
                      Found something? Report it in under 60 seconds with photo upload.
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
                      Secure verification process ensures items reach rightful owners.
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
                      Live Tracking
                    </h3>
                    <p className="text-lg text-white opacity-90 max-w-md">
                      Track trends, success rates, and hot spots in real-time across campus.
                    </p>
                    
                    <div className="absolute bottom-8 left-8 text-white font-bold text-xl group-hover:translate-x-2 transition-transform">
                      Explore System →
                    </div>
                  </div>
                </Link>
              </motion.div>
              
            </div>
          </div>
        </div>
        
        {/* How it works */}
        <div className="relative py-32" style={{ backgroundColor: getColor('bgSecondary') }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
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
                Three simple steps to reunite with your lost items
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { num: '01', icon: Search, title: 'Search', desc: 'Browse our database of found items using smart filters and real-time search', colorKey: 'accent1' as const },
                { num: '02', icon: MessageSquare, title: 'Claim', desc: 'Found your item? Submit a claim with verification details through our secure portal', colorKey: 'accent2' as const },
                { num: '03', icon: CheckCircle, title: 'Retrieve', desc: 'Get notified when approved and pick up your item from the designated location', colorKey: 'accent3' as const }
              ].map((step, idx) => (
                <motion.div
                  key={step.num}
                  className="relative p-10 border-2 rounded-2xl group hover:translate-y-[-8px] transition-all"
                  style={{ 
                    borderColor: getColor('border'),
                    backgroundColor: getColor('bgCard')
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  whileHover={{ borderColor: getColor(step.colorKey) }}
                >
                  <div className="absolute -top-6 left-10 text-7xl font-black opacity-10" style={{ color: getColor(step.colorKey) }}>
                    {step.num}
                  </div>
                  <step.icon className="h-16 w-16 mb-6" style={{ color: getColor(step.colorKey) }} />
                  <h3 className="text-3xl font-black mb-5" style={{ color: getColor('textPrimary') }}>
                    {step.title}
                  </h3>
                  <p className="text-lg leading-relaxed" style={{ color: getColor('textSecondary') }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="relative py-40" style={{ backgroundColor: getColor('bgPrimary') }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-7xl md:text-8xl font-black mb-12 leading-tight" style={{ color: getColor('textPrimary') }}>
                Ready to Find<br />
                <span style={{ color: getColor('accent1') }}>Your Lost Item?</span>
              </div>
              
              <Link to="/items">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div 
                    className="inline-block px-16 py-8 text-2xl font-black text-white relative overflow-hidden group"
                    style={{ background: getColor('accent1') }}
                  >
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"
                      style={{ background: getColor('accent2') }}
                    />
                    <span className="relative flex items-center gap-5">
                      Start Searching Now
                      <ArrowRight className="h-8 w-8" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
        
      </div>
    </div>
  );
}