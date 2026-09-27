import { Pressable, StyleSheet, Text, View } from 'react-native';

type HeaderProps = {
  onBackPress: () => void;
  canGoBack: boolean;
};

export default function Header({ onBackPress, canGoBack }: HeaderProps) {
  return (
    <View
      style={styles.container}
      accessibilityRole='header'
      accessibilityLabel='Koxinha e Keebs'
    >
      <Pressable
        style={[styles.backButton, !canGoBack && styles.backButtonDisabled]}
        onPress={onBackPress}
        disabled={!canGoBack}
        accessibilityRole='button'
        accessibilityLabel='Voltar'
        accessibilityHint={canGoBack ? 'Retorna para a tela anterior' : 'Não há tela anterior'}
        accessibilityState={{ disabled: !canGoBack }}
      >
        <Text style={styles.backButtonText}>‹</Text>
        {/*<Text style={styles.backButtonLabel}>Voltar</Text>*/}
      </Pressable>

      <Text style={styles.logo}>
        KOXINHA&KEEBS
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  backButton: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  backButtonDisabled: {
    opacity: 0.45,
  },

  backButtonText: {
    marginTop: -6,
    fontSize: 32,
    lineHeight: 32,
  },

  backButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },

  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    flexShrink: 1,
  },
});
