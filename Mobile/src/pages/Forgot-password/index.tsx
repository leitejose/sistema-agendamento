import * as React from 'react';
import { StyleSheet, View, Image, Animated, Easing } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

export default function ForgotPassword() {
  const [email, setEmail] = React.useState('');
  const slideAnim = React.useRef(new Animated.Value(100)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSend = () => {
    // Lógica para enviar recuperação de senha
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <Image
        source={require('../../../assets/LogoMM.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.info}>
        Informe seu e-mail cadastrado para receber as instruções de recuperação.
      </Text>
      <TextInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button mode="contained" onPress={handleSend} style={styles.button}>
        Enviar
      </Button>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  info: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#555',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#000',
  },
});