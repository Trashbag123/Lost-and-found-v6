import { Link } from 'react-router';
import { Package2 } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';

export function Footer() {
  const { getColor } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="relative border-t-2 z-10"
      style={{ 
        backgroundColor: getColor('bgCard'),
        borderColor: `${getColor('accent1')}40`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="p-3 rounded-xl text-white"
                style={{ 
                  background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})` 
                }}
              >
                <Package2 className="h-6 w-6" />
              </div>
              <div>
                <div className="font-black text-xl" style={{ color: getColor('textPrimary') }}>
                  Lost & Found
                </div>
                <div className="text-xs font-semibold" style={{ color: getColor('textTertiary') }}>
                  School Portal
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: getColor('textSecondary') }}>
              Helping students reunite with lost belongings across campus.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="font-black text-lg mb-6" style={{ color: getColor('textPrimary') }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/items', label: 'Browse Items' },
                { to: '/submit', label: 'Report Item' },
                { to: '/claims', label: 'Claims Portal' }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to}
                    className="text-sm hover:translate-x-2 inline-block transition-transform"
                    style={{ color: getColor('textSecondary') }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-black text-lg mb-6" style={{ color: getColor('textPrimary') }}>
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/help', label: 'Help Center' },
                { to: '/faq', label: 'FAQs' },
                { to: '/terms', label: 'Terms of Service' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/accessibility', label: 'Accessibility' },
                { to: '/attributions', label: 'Attributions' }
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.to}
                    className="text-sm hover:translate-x-2 inline-block transition-transform"
                    style={{ color: getColor('textSecondary') }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-black text-lg mb-6" style={{ color: getColor('textPrimary') }}>
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: getColor('textSecondary') }}>
              <li>Main Office — Administration Building</li>
              <li>Contact the front office</li>
              <li>lostandfound@school.edu</li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom bar */}
        <div 
          className="pt-8 border-t-2 flex flex-col md:flex-row justify-between items-center gap-5"
          style={{ borderColor: `${getColor('border')}50` }}
        >
          <div className="text-sm" style={{ color: getColor('textTertiary') }}>
            © {currentYear} School Lost & Found. All rights reserved.
          </div>
          
          <div className="flex gap-6 text-sm">
            <Link
              to="/terms"
              className="hover:opacity-70 transition-opacity"
              style={{ color: getColor('textTertiary') }}
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="hover:opacity-70 transition-opacity"
              style={{ color: getColor('textTertiary') }}
            >
              Privacy
            </Link>
            <Link
              to="/accessibility"
              className="hover:opacity-70 transition-opacity"
              style={{ color: getColor('textTertiary') }}
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}