// ─── Third-party imports ─────────────────────────────────────────────────────
import React, { useEffect, useRef } from 'react';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router';

// ─── Context providers ────────────────────────────────────────────────────────
import { AuthProvider } from '@/app/contexts/AuthContext';
import { ClaimsProvider } from '@/app/contexts/ClaimsContext';
import { ItemsProvider } from '@/app/contexts/ItemsContext';
import { NotificationsProvider } from '@/app/contexts/NotificationsContext';
import { ThemeProvider, useTheme } from '@/app/contexts/ThemeContext';

// ─── Layout components ────────────────────────────────────────────────────────
import { Footer } from '@/app/components/layout/Footer';
import { NavBar } from '@/app/components/layout/NavBar';
import { ScrollToTop } from '@/app/components/layout/ScrollToTop';

// ─── Visual effects ───────────────────────────────────────────────────────────
import { AnimatedBackground } from '@/app/components/effects/AnimatedBackground';
import { FloatingShapes } from '@/app/components/effects/FloatingShapes';
import { UltraBackground } from '@/app/components/effects/UltraBackground';

// ─── Other shared components ──────────────────────────────────────────────────
import { CustomerServiceBot } from '@/app/components/CustomerServiceBot';
import { Toaster } from '@/app/components/ui/sonner';
import { toast } from 'sonner';

// ─── Page components ──────────────────────────────────────────────────────────
import { AccessibilityPage } from '@/app/components/AccessibilityPage';
import { AdminPage } from '@/app/components/AdminPage';
import { ClaimsPage } from '@/app/components/ClaimsPage';
import { FAQPage } from '@/app/components/FAQPage';
import { HelpPage } from '@/app/components/HelpPage';
import { HomePage } from '@/app/components/HomePage';
import { ItemDetailPage } from '@/app/components/ItemDetailPage';
import { ItemsListingPage } from '@/app/components/ItemsListingPage';
import { LoginPage } from '@/app/components/LoginPage';
import { NotificationsPage } from '@/app/components/NotificationsPage';
import { PrivacyPage } from '@/app/components/PrivacyPage';
import { ProfilePage } from '@/app/components/ProfilePage';
import { ProtectedRoute } from '@/app/components/ProtectedRoute';
import { RegisterPage } from '@/app/components/RegisterPage';
import { SecurityPage } from '@/app/components/SecurityPage';
import { SubmitItemPage } from '@/app/components/SubmitItemPage';
import { TermsPage } from '@/app/components/TermsPage';
import { AttributionsPage } from '@/app/components/AttributionsPage';
import { NotFoundPage } from '@/app/components/NotFoundPage';

// ─── Constants ────────────────────────────────────────────────────────────────

const STANDARD_PERFORMANCE_LEVELS = ['low', 'medium', 'high'] as const;

// ─── Layout ───────────────────────────────────────────────────────────────────

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

function Layout() {
  const { getColor, performanceLevel, setPerformanceLevel } = useTheme();
  const keyBuffer = useRef<string[]>([]);
  const performanceLevelRef = useRef(performanceLevel);

  useEffect(() => {
    performanceLevelRef.current = performanceLevel;
  }, [performanceLevel]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keyBuffer.current = [...keyBuffer.current, key].slice(-KONAMI.length);
      if (keyBuffer.current.join(',') === KONAMI.join(',')) {
        keyBuffer.current = [];
        const next = performanceLevelRef.current === 'ultra' ? 'high' : 'ultra';
        setPerformanceLevel(next);
        toast(next === 'ultra' ? '⚡ Ultra mode activated' : 'Ultra mode off', { duration: 2500 });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setPerformanceLevel]);

  const isUltra = performanceLevel === 'ultra';
  const showStandardEffects = STANDARD_PERFORMANCE_LEVELS.includes(
    performanceLevel as typeof STANDARD_PERFORMANCE_LEVELS[number]
  );

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{ backgroundColor: getColor('bgPrimary') }}
    >
      {isUltra && <UltraBackground />}
      {showStandardEffects && (
        <>
          <AnimatedBackground />
          <FloatingShapes />
        </>
      )}

      <ScrollToTop />
      <NavBar />

      <main id="main-content" className="flex-1 relative z-10">
        <Outlet />
      </main>

      <Footer />
      <CustomerServiceBot />
      <Toaster />
    </div>
  );
}

// ─── Providers ────────────────────────────────────────────────────────────────

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationsProvider>
          <ClaimsProvider>
            <ItemsProvider>
              {children}
            </ItemsProvider>
          </ClaimsProvider>
        </NotificationsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Providers>
        <Layout />
      </Providers>
    ),
    children: [
      { index: true,           element: <HomePage /> },
      { path: 'items',         element: <ItemsListingPage /> },
      { path: 'item/:id',      element: <ItemDetailPage /> },
      { path: 'submit',        element: <SubmitItemPage /> },
      { path: 'claims',        element: <ClaimsPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'security',      element: <SecurityPage /> },
      { path: 'login',         element: <LoginPage /> },
      { path: 'register',      element: <RegisterPage /> },
      { path: 'profile',       element: <ProfilePage /> },
      { path: 'help',          element: <HelpPage /> },
      { path: 'faq',           element: <FAQPage /> },
      { path: 'terms',         element: <TermsPage /> },
      { path: 'privacy',       element: <PrivacyPage /> },
      { path: 'accessibility', element: <AccessibilityPage /> },
      { path: 'attributions',   element: <AttributionsPage /> },
      { path: '*',               element: <NotFoundPage /> },
      {
        path: 'admin',
        element: (
          <ProtectedRoute requireAdmin>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return <RouterProvider router={router} />;
}