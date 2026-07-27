# ImuniData Acessível

Projeto completo com backend Spring Boot e frontend React, incluindo:

- leitura em voz alta opcional com Web Speech API;
- navegação e atalhos de teclado;
- foco visível;
- labels associados aos campos;
- mensagens anunciadas por leitores de tela;
- tabela, paginação e gráfico com alternativa textual;
- banco H2 pronto para demonstração;
- perfil opcional para MySQL.

## Execução rápida

### Requisitos
- Java 21
- Node.js 20 ou superior

### 1. Backend

No Windows:

```bash
cd api-imunidata
mvnw.cmd spring-boot:run
```

No Linux/macOS:

```bash
cd api-imunidata
chmod +x mvnw
./mvnw spring-boot:run
```

Sem Maven Wrapper, use:

```bash
mvn spring-boot:run
```

API: http://localhost:8080
Console H2: http://localhost:8080/h2-console

- JDBC URL: `jdbc:h2:file:./data/imunidata`
- usuário: `sa`
- senha: deixe vazia

### 2. Frontend

Em outro terminal:

```bash
cd frontend-imunidata
npm install
npm run dev
```

Abra http://localhost:5173

## Atalhos
- Alt + L: ligar/desligar leitura
- Alt + P: parar leitura
- Alt + 1: formulário
- Alt + 2: filtros
- Alt + 3: histórico
- Tab e Shift + Tab: navegar

## MySQL opcional

Crie o banco `imunidata`, ajuste usuário e senha em `application-mysql.properties` e execute:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```
