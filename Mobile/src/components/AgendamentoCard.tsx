// src/components/AgendamentoCard.tsx
import React from 'react';
import { Card, Avatar, Text } from 'react-native-paper';

export default function AgendamentoCard({ titulo, data, hora, status }) {
  return (
    <Card style={{ marginBottom: 12 }}>
      <Card.Title
        title={titulo}
        subtitle={`${data} às ${hora}`}
        left={props => <Avatar.Icon {...props} icon="calendar" />}
      />
      <Card.Content>
        <Text>Status: {status}</Text>
      </Card.Content>
    </Card>
  );
}