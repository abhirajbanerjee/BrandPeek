import { StyleSheet } from 'react-native';

export const colors = {
  gradientCenter: '#0B6CFF',
  gradientMid: '#083D9A',
  gradientEdge: '#01010A',
  primary: '#FFFFFF',
  secondary: '#E0E0E0',
  accent: '#0B6CFF',
  cardBackground: 'rgba(255, 255, 255, 0.1)',
  cardBorder: 'rgba(255, 255, 255, 0.2)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  headerLarge: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  headerMedium: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  
  safeContainer: {
    flex: 1,
    paddingTop: 50,
  },
  
  contentContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  
  headerTitle: {
    ...typography.headerLarge,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  
  subtitle: {
    ...typography.subtitle,
    color: colors.secondary,
    textAlign: 'center',
    opacity: 0.8,
  },
  
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: spacing.md,
    marginVertical: spacing.sm,
    marginHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  cardContent: {
    alignItems: 'center',
  },
  
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: spacing.sm,
  },
  
  cardTitle: {
    ...typography.headerMedium,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  
  cardSubtitle: {
    ...typography.body,
    color: colors.secondary,
    textAlign: 'center',
  },
  
  button: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  
  buttonText: {
    ...typography.subtitle,
    color: colors.primary,
    fontWeight: '600',
  },
  
  listContainer: {
    flex: 1,
    paddingTop: spacing.md,
  },
  
  listContent: {
    paddingBottom: spacing.xl,
  },
  
  detailContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
  },
  
  backButton: {
    position: 'absolute',
    top: spacing.xl,
    left: spacing.md,
    zIndex: 10,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  detailContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  
  detailImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: spacing.lg,
  },
  
  detailTitle: {
    ...typography.headerLarge,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  
  detailTagline: {
    ...typography.subtitle,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontStyle: 'italic',
  },
  
  detailDescription: {
    ...typography.body,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    ...typography.body,
    color: colors.secondary,
    marginTop: spacing.md,
  },
  
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  
  errorText: {
    ...typography.body,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
});

export default styles;