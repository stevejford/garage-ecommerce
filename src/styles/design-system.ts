// Design System Constants
export const colors = {
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3', // Accent Color: Blue (Tailwind 500)
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  background: '#f5f5f4', // Background Color: Stone (Tailwind 100)
  surface: '#ffffff',
  border: '#e5e7eb', // Border Color: Gray (Tailwind 200)
  text: {
    primary: '#1f2937', // Gray 800
    secondary: '#4b5563', // Gray 600
    disabled: '#9ca3af', // Gray 400
  },
};

export const typography = {
  fontFamily: {
    heading: 'Inter, sans-serif',
    body: 'Geist, sans-serif',
  },
  fontSize: {
    h1: '2rem', // 32px
    h2: '1.75rem', // 28px
    h3: '1.5rem', // 24px
    h4: '1.25rem', // 20px
    subtitle1: '1.25rem', // 20px
    subtitle2: '1rem', // 16px
    body1: '1.125rem', // 18px
    body2: '1rem', // 16px
    button: '0.875rem', // 14px
    caption: '0.75rem', // 12px
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  letterSpacing: {
    normal: 'normal',
    wide: '0.025em',
  },
};

export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  xxl: '3rem', // 48px
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Shadow: Medium (shadow-md)
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem', // 2px
  md: '0.25rem', // 4px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  full: '9999px',
};

// Tailwind CSS class utilities based on our design system
export const tailwindClasses = {
  // Text styles
  headingLarge: 'font-inter text-3xl font-semibold text-gray-900 tracking-normal',
  headingMedium: 'font-inter text-2xl font-semibold text-gray-900 tracking-normal',
  headingSmall: 'font-inter text-xl font-semibold text-gray-900 tracking-normal',
  subheadingLarge: 'font-inter text-xl font-medium text-gray-800 tracking-normal',
  subheadingSmall: 'font-inter text-base font-medium text-gray-800 tracking-normal',
  bodyLarge: 'font-geist text-lg text-gray-700',
  bodyMedium: 'font-geist text-base text-gray-700',
  bodySmall: 'font-geist text-sm text-gray-600',
  
  // Component styles
  card: 'bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden',
  cardHeader: 'px-6 py-4 border-b border-gray-200 bg-stone-50',
  cardBody: 'p-6',
  cardFooter: 'px-6 py-4 border-t border-gray-200 bg-stone-50',
  
  // Button styles
  buttonPrimary: 'inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  buttonSecondary: 'inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  buttonOutline: 'inline-flex items-center justify-center px-4 py-2 border border-blue-500 rounded-md text-sm font-medium text-blue-500 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  buttonText: 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-600 focus:outline-none',
  
  // Form styles
  formLabel: 'block text-sm font-medium text-gray-700 mb-1',
  formInput: 'block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
  formSelect: 'block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
  formCheckbox: 'h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded',
  formRadio: 'h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300',
  
  // Table styles
  table: 'min-w-full divide-y divide-gray-200',
  tableHeader: 'bg-stone-50',
  tableHeaderCell: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
  tableRow: 'bg-white border-b border-gray-100 hover:bg-stone-50',
  tableRowAlt: 'bg-stone-50 border-b border-gray-100 hover:bg-stone-100',
  tableCell: 'px-6 py-4 whitespace-nowrap text-sm text-gray-700',
  
  // Layout styles
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-6',
  pageHeader: 'py-6 md:flex md:items-center md:justify-between',
  pageHeaderTitle: 'font-inter text-3xl font-semibold text-gray-900 tracking-normal',
  
  // Background colors
  bgPrimary: 'bg-stone-100',
  bgSurface: 'bg-white',
  bgAccent: 'bg-blue-500',
  
  // Border colors
  borderDefault: 'border-gray-200',
  borderAccent: 'border-blue-500',
  
  // Shadow
  shadowDefault: 'shadow-md',
};

export default {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  tailwindClasses,
};
