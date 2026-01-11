
export const theme = {
  colors: {
    primary: '#FF4433', // Red from design
    primaryDark: '#D91E0E',
    secondary: '#FF6644',
    accent: '#FFB366', // Peachy orange
    background: '#F9F9F9',
    lightPeach: '#FFD4C4', // Light peach background
    text: '#333333',
    textLight: '#666666',
    card: '#FFFFFF',
    error: '#E74C3C',
    success: '#2ECC71',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#CCCCCC',
    darkGray: '#666666',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold' as const },
    h2: { fontSize: 24, fontWeight: 'bold' as const },
    h3: { fontSize: 20, fontWeight: 'bold' as const },
    body: { fontSize: 16 },
    bodySmall: { fontSize: 14 },
    caption: { fontSize: 12 },
  },
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    full: 999,
  }
};
