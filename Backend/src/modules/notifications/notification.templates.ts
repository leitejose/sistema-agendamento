export const NotificationTemplates = {
  agendamentoCriado: (agendamento: any) => ({
    subject: '📅 Sua consulta foi agendada com sucesso!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <div style="text-align: center; padding: 20px 0;">
          <img src="http://localhost:5173/LogoMM.png" alt="Logo da Clínica" style="height: 60px;" />
        </div>
        <h2 style="color: #2c3e50;">Detalhes da Consulta</h2>
        <p><strong>Data:</strong> ${agendamento.data}</p>
        <p><strong>Hora:</strong> ${agendamento.hora}</p>
        <p><strong>Profissional:</strong> ${agendamento.colaborador?.nome ?? 'Não informado'}</p>
        <p><strong>Serviço:</strong> ${agendamento.servico?.nome ?? 'Não informado'}</p>
        <h3 style="margin-top: 30px; color: #2c3e50;">Informações de Contato</h3>
        <p>Telefone: <a href="tel:+351239841100">239 841 100</a></p>
        <p>Email: <a href="mailto:geral@medicinadamulher.pt">geral@medicinadamulher.pt</a></p>
        <h3 style="margin-top: 30px; color: #2c3e50;">Localização</h3>
        <p>Edifício Cruzeiro<br>
        Av. Calouste Gulbenkian, nº 4 - 1º Andar, Sala 14<br>
        3000-090 Coimbra</p>
        <div style="text-align: center; margin: 10px 0;">
          <a href="https://www.google.com/maps?q=Av.+Calouste+Gulbenkian,+nº+4,+Coimbra" target="_blank">
            <img src="https://maps.googleapis.com/maps/api/staticmap?center=Av.+Calouste+Gulbenkian,+nº+4,+Coimbra&zoom=15&size=600x300&key=SUA_GOOGLE_MAPS_API_KEY" 
                 alt="Mapa da localização" style="width: 100%; max-width: 500px; border-radius: 8px;" />
          </a>
        </div>
        <hr style="margin: 40px 0;" />
        <p style="font-size: 12px; color: #777;">Por favor, entre em contato se tiver dúvidas sobre sua consulta.</p>
      </div>
    `,
  }),
  agendamentoAlterado: (agendamento: any) => ({
    subject: '✏️ Consulta Alterada',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <div style="text-align: center; padding: 20px 0;">
          <img src="Logo" alt="Logo da Clínica" style="height: 60px;" />
        </div>
        <h2 style="color: #2c3e50;">Sua consulta foi alterada</h2>
        <p><strong>Nova Data:</strong> ${agendamento.data}</p>
        <p><strong>Nova Hora:</strong> ${agendamento.hora}</p>
        <p><strong>Profissional:</strong> ${agendamento.colaborador?.nome ?? 'Não informado'}</p>
        <p><strong>Serviço:</strong> ${agendamento.servico?.nome ?? 'Não informado'}</p>
        <h3 style="margin-top: 30px; color: #2c3e50;">Informações de Contato</h3>
        <p>Telefone: <a href="tel:+351239841100">239 841 100</a></p>
        <p>Email: <a href="mailto:geral@medicinadamulher.pt">geral@medicinadamulher.pt</a></p>
        <h3 style="margin-top: 30px; color: #2c3e50;">Localização</h3>
        <p>Edifício Cruzeiro<br>
        Av. Calouste Gulbenkian, nº 4 - 1º Andar, Sala 14<br>
        3000-090 Coimbra</p>
        <div style="text-align: center; margin: 10px 0;">
          <a href="https://www.google.com/maps?q=Av.+Calouste+Gulbenkian,+nº+4,+Coimbra" target="_blank">
            <img src="https://maps.googleapis.com/maps/api/staticmap?center=Av.+Calouste+Gulbenkian,+nº+4,+Coimbra&zoom=15&size=600x300&key=SUA_GOOGLE_MAPS_API_KEY" 
                 alt="Mapa da localização" style="width: 100%; max-width: 500px; border-radius: 8px;" />
          </a>
        </div>
        <hr style="margin: 40px 0;" />
        <p style="font-size: 12px; color: #777;">Por favor, entre em contato se tiver dúvidas sobre sua consulta.</p>
      </div>
    `,
  }),
  agendamentoCancelado: (agendamento: any) => ({
    subject: '❌ Consulta Cancelada',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <div style="text-align: center; padding: 20px 0;">
          <img src="Logo" alt="Logo da Clínica" style="height: 60px;" />
        </div>
        <h2 style="color: #c0392b;">Sua consulta foi cancelada</h2>
        <p>Sua consulta marcada para <strong>${agendamento.data}</strong> às <strong>${agendamento.hora}</strong> foi cancelada.</p>
        <p>Se desejar, <a href="URL_PARA_NOVA_MARCACAO">clique aqui para remarcar</a>.</p>
        <h3 style="margin-top: 30px; color: #2c3e50;">Informações de Contato</h3>
        <p>Telefone: <a href="tel:+351239841100">239 841 100</a></p>
        <p>Email: <a href="mailto:geral@medicinadamulher.pt">geral@medicinadamulher.pt</a></p>
        <h3 style="margin-top: 30px; color: #2c3e50;">Localização</h3>
        <p>Edifício Cruzeiro<br>
        Av. Calouste Gulbenkian, nº 4 - 1º Andar, Sala 14<br>
        3000-090 Coimbra</p>
        <div style="text-align: center; margin: 10px 0;">
          <a href="https://www.google.com/maps?q=Av.+Calouste+Gulbenkian,+nº+4,+Coimbra" target="_blank">
            <img src="https://maps.googleapis.com/maps/api/staticmap?center=Av.+Calouste+Gulbenkian,+nº+4,+Coimbra&zoom=15&size=600x300&key=SUA_GOOGLE_MAPS_API_KEY" 
                 alt="Mapa da localização" style="width: 100%; max-width: 500px; border-radius: 8px;" />
          </a>
        </div>
        <hr style="margin: 40px 0;" />
        <p style="font-size: 12px; color: #777;">Por favor, entre em contato se tiver dúvidas.</p>
      </div>
    `,
  }),
  agendamentoConcluido: (agendamento: any) => ({
    subject: '✅ Consulta Concluída',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <div style="text-align: center; padding: 20px 0;">
          <img src="Logo" alt="Logo da Clínica" style="height: 60px;" />
        </div>
        <h2 style="color: #27ae60;">Consulta Concluída</h2>
        <p>Obrigado por comparecer à sua consulta em <strong>${agendamento.data}</strong> às <strong>${agendamento.hora}</strong>.</p>
        <p>Se desejar, <a href="URL_PARA_NOVA_MARCACAO">clique aqui para agendar uma nova consulta</a>.</p>
        <h3 style="margin-top: 30px; color: #2c3e50;">Informações de Contato</h3>
        <p>Telefone: <a href="tel:+351239841100">239 841 100</a></p>
        <p>Email: <a href="mailto:geral@medicinadamulher.pt">geral@medicinadamulher.pt</a></p>
        <h3 style="margin-top: 30px; color: #2c3e50;">Localização</h3>
        <p>Edifício Cruzeiro<br>
        Av. Calouste Gulbenkian, nº 4 - 1º Andar, Sala 14<br>
        3000-090 Coimbra</p>
        <div style="text-align: center; margin: 10px 0;">
          <a href="https://www.google.com/maps?q=Av.+Calouste+Gulbenkian,+nº+4,+Coimbra" target="_blank">
            <img src="https://maps.googleapis.com/maps/api/staticmap?center=Av.+Calouste+Gulbenkian,+nº+4,+Coimbra&zoom=15&size=600x300&key=SUA_GOOGLE_MAPS_API_KEY" 
                 alt="Mapa da localização" style="width: 100%; max-width: 500px; border-radius: 8px;" />
          </a>
        </div>
        <hr style="margin: 40px 0;" />
        <p style="font-size: 12px; color: #777;">Por favor, entre em contato se tiver dúvidas.</p>
      </div>
    `,
  }),
};
