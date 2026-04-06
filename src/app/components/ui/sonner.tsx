import { Toaster as Sonner, ToasterProps } from "sonner";
import { useTheme } from '@/app/contexts/ThemeContext';

const Toaster = ({ ...props }: ToasterProps) => {
  const { getColor } = useTheme();

  return (
    <Sonner
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        style: {
          background: getColor('bgCard'),
          color: getColor('textPrimary'),
          border: `1px solid ${getColor('border')}`,
          opacity: '1 !important',
          backdropFilter: 'none',
        },
        classNames: {
          toast: 'opacity-100 shadow-lg',
          title: 'font-semibold',
          description: 'opacity-90',
          success: 'border-green-500',
          error: 'border-red-500',
          warning: 'border-yellow-500',
          info: 'border-blue-500',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
