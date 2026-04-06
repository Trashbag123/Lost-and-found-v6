import { Link } from 'react-router';
import { Package2, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Github } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';

export function Footer() {
  const { getColor } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer 
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
            <p className="text-sm leading-relaxed mb-6" style={{ color: getColor('textSecondary') }}>
              Connecting students with their lost belongings through innovative technology and community trust.
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Github, label: 'Github' }
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ 
                    backgroundColor: `${getColor('accent1')}20`,
                    color: getColor('textSecondary')
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
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
                { to: '/accessibility', label: 'Accessibility' }
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
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: getColor('accent1') }} />
                <span className="text-sm" style={{ color: getColor('textSecondary') }}>
                  123 Campus Drive<br />
                  University Hall, Room 105<br />
                  City, ST 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0" style={{ color: getColor('accent2') }} />
                <span className="text-sm" style={{ color: getColor('textSecondary') }}>
                  (555) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0" style={{ color: getColor('accent3') }} />
                <span className="text-sm" style={{ color: getColor('textSecondary') }}>
                  lostandfound@school.edu
                </span>
              </li>
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
            <a 
              href="#" 
              className="hover:opacity-70 transition-opacity"
              style={{ color: getColor('textTertiary') }}
            >
              Terms
            </a>
            <a 
              href="#" 
              className="hover:opacity-70 transition-opacity"
              style={{ color: getColor('textTertiary') }}
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="hover:opacity-70 transition-opacity"
              style={{ color: getColor('textTertiary') }}
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}