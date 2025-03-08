import React from 'react';

interface ProfileCardProps {
  service: string;
  amount: number;
}

const DataService: React.FC<ProfileCardProps> = ({ service, amount }) => {
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
        <h2>{service}</h2>
      </div>
      <div
        style={{
          textAlign: 'center',
          minWidth: '50px',
        }}
      >
        <h2>{amount + " €"}</h2>
      </div>
    </div>
  );
};

export default DataService;









