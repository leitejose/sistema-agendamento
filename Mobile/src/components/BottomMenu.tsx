import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export default function BottomMenu({ navigation, index, setIndex }) {
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home', focusedIcon: 'home' },
    { key: 'marcacoes', title: 'Marcações', icon: 'calendar-check', focusedIcon: 'calendar-check' },
    { key: 'add', title: 'Novo', icon: 'plus-circle', focusedIcon: 'plus-circle' },
    { key: 'estatisticas', title: 'Estatísticas', icon: 'chart-bar', focusedIcon: 'chart-bar' },
    { key: 'definicoes', title: 'Definições', icon: 'cog', focusedIcon: 'cog' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => <View />,
    marcacoes: () => <View />,
    add: () => null,
    estatisticas: () => <View />,
    definicoes: () => <View />,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={i => {
        if (routes[i].key === 'add') {
          // lógica para adicionar agendamento
        } else {
          setIndex(i);
        }
      }}
      renderScene={renderScene}
      barStyle={styles.bottomBar}
      shifting={false}
      labeled={true}
      activeColor="#fff"
      inactiveColor="#888"
      activeIndicatorStyle={{ backgroundColor: 'transparent' }} // Remove o fundo roxo do item selecionado
    />
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: '#000', // fundo preto no menu
  },
});
