import React from 'react';

interface ProfileCardProps {
  name: string;
  specialty: string;
  amount: number;
}

const DataDoctor: React.FC<ProfileCardProps> = ({ name, specialty, amount }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px 0',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div style={{ flex: 1 }}>
        <h2>{name}</h2>
        <p>{specialty}</p>
      </div>
      <div
        style={{
          textAlign: 'center',
          minWidth: '50px',
        }}
      >
        <h2>{amount}</h2>
      </div>
    </div>
  );
};

export default DataDoctor;









