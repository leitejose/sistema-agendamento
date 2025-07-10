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