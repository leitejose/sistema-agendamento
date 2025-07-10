import * as React from 'react';
import { View, StyleSheet, Image, Animated, Easing, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';


export default function Login({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const slideAnim = React.useRef(new Animated.Value(100)).current; // Começa 100px abaixo

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
   navigation.navigate('Home'); // Navega para a tela Home após o login
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <Image
        source={require('../../../assets/LogoMM.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgot}>Esqueceu a senha?</Text>
      </TouchableOpacity>
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Entrar
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
  input: {
    marginBottom: 16,
    backgroundColor: '#fff'
  },
  forgot: {
    color: '#000000',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: -8,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#000',
  },
});