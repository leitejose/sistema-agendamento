import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, IconButton, Button, Avatar } from 'react-native-paper';

// COMPONENTES REUTILIZÁVEIS

function HeaderBar({ onBack }) {
  return (
    <View style={styles.headerRow}>
      <IconButton icon="arrow-left" size={28} onPress={onBack} />
      <Text style={styles.headerTitle}>Doctor Details</Text>
      <IconButton icon="heart-outline" size={28} />
    </View>
  );
}

function DoctorCard({ doctor }) {
  return (
    <View style={styles.doctorCard}>
      <View style={styles.doctorInfoRow}>
        <Avatar.Image size={72} source={{ uri: doctor.foto }} />
        <View style={{ marginLeft: 16, flex: 1 }}>
          <Text style={styles.doctorName}>{doctor.nome}</Text>
          <Text style={styles.doctorSpecialty}>{doctor.especialidade}</Text>
          <View style={styles.feeRow}>
            <Text style={styles.fee}>{doctor.valor}</Text>
            <Text style={styles.feeLabel}> Consult Fee</Text>
          </View>
        </View>
      </View>
      <View style={styles.locationRow}>
        <Avatar.Icon size={28} icon="office-building" style={styles.iconCircle} color="#222" />
        <Text style={styles.locationText}>{doctor.local}</Text>
        <View style={{ flex: 1 }} />
        <Avatar.Icon size={32} icon="video" style={styles.iconCircle} color="#222" />
        <Avatar.Icon size={32} icon="phone" style={styles.iconCircle} color="#222" />
        <Avatar.Icon size={32} icon="message" style={styles.iconCircle} color="#222" />
      </View>
    </View>
  );
}

function QuickInfo({ pacientes, experiencia, rating }) {
  return (
    <View style={styles.quickInfoRow}>
      <View style={styles.quickInfoBox}>
        <Text style={styles.quickInfoValue}>{pacientes}+</Text>
        <Text style={styles.quickInfoLabel}>Patients</Text>
      </View>
      <View style={styles.quickInfoBox}>
        <Text style={styles.quickInfoValue}>{experiencia} Year</Text>
        <Text style={styles.quickInfoLabel}>Experience</Text>
      </View>
      <View style={styles.quickInfoBox}>
        <Text style={styles.quickInfoValue}>{rating}</Text>
        <Text style={styles.quickInfoLabel}>Ratings</Text>
      </View>
    </View>
  );
}

function DateSelector({ dias }) {
  return (
    <View style={styles.datesRow}>
      {dias.map((d, idx) => (
        <View key={idx} style={[styles.dateBox, d.ativo && styles.dateBoxActive]}>
          <Text style={[styles.dateDay, d.ativo && styles.dateDayActive]}>{d.dia}</Text>
          <Text style={[styles.dateWeek, d.ativo && styles.dateWeekActive]}>{d.semana}</Text>
        </View>
      ))}
    </View>
  );
}

function TimeSelector({ horarios, horarioSelecionado, onSelect }) {
  return (
    <View style={styles.timesRow}>
      {horarios.map((h, idx) => (
        <Button
          key={idx}
          mode={h === horarioSelecionado ? "contained" : "outlined"}
          style={[
            styles.timeButton,
            h === horarioSelecionado && styles.timeButtonActive
          ]}
          labelStyle={[
            styles.timeButtonLabel,
            h === horarioSelecionado && styles.timeButtonLabelActive
          ]}
          contentStyle={{ height: 36 }}
          buttonColor={h === horarioSelecionado ? "#FFD600" : "#fff"}
          textColor={h === horarioSelecionado ? "#222" : "#222"}
          onPress={() => onSelect(h)}
        >
          {h}
        </Button>
      ))}
    </View>
  );
}

// TELA PRINCIPAL

export default function DoctorDetails({ navigation }) {
  const doctor = {
    nome: 'Dr. Michael Mink',
    especialidade: 'Dental Care Specialist',
    foto: 'https://randomuser.me/api/portraits/men/45.jpg',
    valor: '180$',
    local: 'UK Medical College',
    pacientes: 200,
    experiencia: 8,
    rating: 4.18,
    sobre: 'Dr. Michael Mink is a devoted general dentist at UK Medical College. England, committed to patients cares, community support, enhancing healthy, confident smiles.',
  };

  const dias = [
    { dia: 22, semana: 'S' }, { dia: 23, semana: 'M' }, { dia: 24, semana: 'T' },
    { dia: 25, semana: 'W', ativo: true }, { dia: 26, semana: 'T' }, { dia: 27, semana: 'F' }, { dia: 28, semana: 'S' },
  ];
  const [horarioSelecionado, setHorarioSelecionado] = React.useState('05:00 AM');
  const horarios = [
    '10:00 AM', '02:30 PM', '03:00 PM', '04:30 AM',
    '06:30 AM', '08:00 AM', '12:30 PM', '05:00 AM'
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <HeaderBar onBack={() => navigation.goBack()} />
        <DoctorCard doctor={doctor} />
        <QuickInfo pacientes={doctor.pacientes} experiencia={doctor.experiencia} rating={doctor.rating} />
        <Text style={styles.sectionTitle}>About Doctor</Text>
        <Text style={styles.aboutText}>{doctor.sobre}</Text>
        <Text style={styles.sectionTitle}>Select Date & Time</Text>
        <DateSelector dias={dias} />
        <TimeSelector horarios={horarios} horarioSelecionado={horarioSelecionado} onSelect={setHorarioSelecionado} />
      </ScrollView>
      <Button
        mode="contained"
        style={styles.bookButton}
        labelStyle={styles.bookButtonLabel}
        buttonColor="#C7E664"
        textColor="#222"
        onPress={() => {}}
      >
        Book Appointment
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  doctorCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    margin: 16,
    padding: 16,
  },
  doctorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666',
  },
  feeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  fee: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  feeLabel: {
    fontSize: 14,
    color: '#666',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  iconCircle: {
    backgroundColor: '#e8f5e9',
    marginRight: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  quickInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  quickInfoBox: {
    alignItems: 'center',
    flex: 1,
  },
  quickInfoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickInfoLabel: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 16,
  },
  aboutText: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 16,
    lineHeight: 20,
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginHorizontal: 16,
  },
  dateBox: {
    alignItems: 'center',
    flex: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  dateBoxActive: {
    backgroundColor: '#e1f5fe',
  },
  dateDay: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateWeek: {
    fontSize: 12,
    color: '#666',
  },
  timeButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  timeButtonActive: {
    backgroundColor: '#ffd600',
  },
  timeButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeButtonLabelActive: {
    color: '#222',
  },
  bookButton: {
    margin: 16,
    borderRadius: 8,
  },
  bookButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

