import * as React from 'react';
import { StyleSheet, View, Image, Animated, Easing } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

export default function NewPassword() {
  const [senha, setSenha] = React.useState('');
  const [confirmarSenha, setConfirmarSenha] = React.useState('');
  const slideAnim = React.useRef(new Animated.Value(100)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  const handleChangePassword = () => {
    // Lógica para alterar a senha
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <Image
        source={require('../../../assets/LogoMM.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Nova Senha</Text>
      <Text style={styles.info}>
        Digite sua nova senha e confirme para redefinir o acesso.
      </Text>
      <TextInput
        label="Nova Senha"
        value={senha}
        onChangeText={setSenha}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        label="Confirmar Nova Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleChangePassword} style={styles.button}>
        Alterar Senha
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
  