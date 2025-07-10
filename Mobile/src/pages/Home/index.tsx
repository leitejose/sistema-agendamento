import * as React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, TextInput, Card, Avatar, IconButton } from 'react-native-paper';
import BottomMenu from '../../components/BottomMenu';

const agendamentos = [
  { 
    id: '1', 
    nome: 'Dr. Melva Austin', 
    especialidade: 'Heart Surgeon', 
    destaque: true, 
    foto: 'https://randomuser.me/api/portraits/women/65.jpg' 
  },
  { 
    id: '2', 
    nome: 'Dr. Marian Harmon', 
    especialidade: 'Kidney Surgeon', 
    destaque: false, 
    foto: 'https://randomuser.me/api/portraits/women/66.jpg' 
  },
  { 
    id: '3', 
    nome: 'Dr. Kerry Horton', 
    especialidade: 'Stomach Surgeon', 
    destaque: false, 
    foto: 'https://randomuser.me/api/portraits/men/67.jpg' 
  },
];

export default function Home({ navigation }) {
  const userName = 'Tessa Francis';
  const [menuIndex, setMenuIndex] = React.useState(0);

  const handleLogout = () => {
    navigation.replace('Login');
  };

  const handleDoctorPress = (doctor) => {
    navigation.navigate('DoctorDetails', { doctor });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleDoctorPress(item)}>
      <Card style={[styles.card, item.destaque && styles.cardDestaque]}>
        <View style={styles.cardContent}>
          <Avatar.Image 
            size={48} 
            source={{ uri: item.foto }} 
            style={item.destaque ? styles.avatarDestaque : styles.avatarNormal}
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.cardTitle, item.destaque && styles.cardTitleDestaque]}>{item.nome}</Text>
            <Text style={[styles.cardSubtitle, item.destaque && styles.cardSubtitleDestaque]}>{item.especialidade}</Text>
          </View>
          <IconButton icon="chevron-right" size={28} color={item.destaque ? "#fff" : "#222"} />
        </View>
        <View style={styles.cardActions}>
          <Avatar.Icon size={32} icon="video" style={item.destaque ? styles.iconDestaque : styles.iconNormal} color={item.destaque ? "#fff" : "#222"} />
          <Avatar.Icon size={32} icon="message" style={item.destaque ? styles.iconDestaque : styles.iconNormal} color={item.destaque ? "#fff" : "#222"} />
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Avatar.Image size={40} source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.hello}>👋 Hello,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <IconButton
          icon="logout"
          size={28}
          color="#222"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      </View>
      <TextInput
        placeholder="Search for doctor"
        mode="flat"
        style={styles.search}
        left={<TextInput.Icon icon="magnify" color="#222" />}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        placeholderTextColor="#888"
        selectionColor="#222"
      />
      <FlatList
        data={agendamentos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <BottomMenu navigation={navigation} index={menuIndex} setIndex={setMenuIndex} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
    marginLeft: 24,
    marginRight: 16,
    marginBottom: 8,
  },
  hello: {
    fontSize: 18,
    color: '#222',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  search: {
    marginHorizontal: 24,
    marginVertical: 12,
    backgroundColor: '#f3f3f3',
    borderRadius: 16,
    elevation: 0,
    color: '#222',
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  card: {
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: '#ededed',
    padding: 16,
  },
  cardDestaque: {
    backgroundColor: '#222',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarDestaque: {
    backgroundColor: '#444',
  },
  avatarNormal: {
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  cardTitleDestaque: {
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  cardSubtitleDestaque: {
    color: '#fff',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
  },
  iconDestaque: {
    backgroundColor: '#444',
    marginRight: 12,
  },
  iconNormal: {
    backgroundColor: '#fff',
    marginRight: 12,
  },
  logoutButton: {
    marginLeft: 'auto',
  },
});