# Sistema de Agendamento MM

Este é um sistema de agendamento desenvolvido para gerenciar marcações, utentes, colaboradores e serviços. O projeto utiliza **Node.js**, **NestJS**, **React**, **Prisma** e **MySQL**.

---

## ✅ Tecnologias Utilizadas

### 🔧 Backend:
- Node.js
- NestJS
- Prisma ORM
- MySQL

### 🎨 Frontend:
- React
- Vite
- TailwindCSS

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter os seguintes programas instalados:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

---

## 🚀 Passos para Executar o Projeto

### 1. Clone o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd sistema-de-agendamento-mm
```

---

### 2. Configure o Banco de Dados

1. Crie um banco de dados no MySQL com o nome `appointments_db`.

2. Importe o script `appointments_db.session.sql` para o banco de dados:

```bash
mysql -u root -p appointments_db < appointments_db.session.sql
```

> 🔒 Substitua `root` e `appointments_db` pelas credenciais e nome do banco usados no seu ambiente.

---

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `Backend/` com o seguinte conteúdo:

```env
DATABASE_URL="mysql://root:senha@localhost:3306/appointments_db"
JWT_SECRET=seu-segredo-jwt
```

> 🛑 **Nunca** suba esse arquivo para o GitHub. Ele contém dados sensíveis.

---

### 4. Instale as Dependências

#### Backend

```bash
cd Backend
npm install
```

#### Frontend

```bash
cd ../Frontend
npm install
```

---

### 5. Gere o Prisma Client

No diretório `Backend`, execute:

```bash
npx prisma generate
```

---

### 6. Execute o Projeto

#### Backend

```bash
cd Backend
npm run start
```

> O backend será iniciado em: [http://localhost:3000](http://localhost:3000)

#### Frontend

```bash
cd ../Frontend
npm run dev
```

> O frontend será iniciado em: [http://localhost:5173](http://localhost:5173)

---

## 📌 Observações

- Caso altere a porta do banco ou o nome do banco, lembre-se de atualizar a variável `DATABASE_URL` no `.env`.
- Certifique-se de que o MySQL esteja em execução antes de iniciar o sistema.
- O projeto também pode ser executado com Docker, se desejar. Posso adicionar essa seção se quiser.
