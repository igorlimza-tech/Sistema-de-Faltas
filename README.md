# 🎓 Sistema de Faltas

<p align="center">
  Sistema acadêmico para controle e acompanhamento de frequência, desenvolvido como projeto do curso de Análise e Desenvolvimento de Sistemas.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow">
  <img src="https://img.shields.io/badge/Projeto-Acadêmico-blue">
  <img src="https://img.shields.io/badge/Front--end-Concluído-brightgreen">
</p>

---

## 🌐 Demonstração

🔗 **Acesse o sistema online:** https://igorlimza-tech.github.io/Sistema-de-Faltas/

Para testar, use as contas de exemplo abaixo ou crie a sua na tela de cadastro.

| Perfil | RA / Registro | Senha |
|---|---|---|
| 👨‍🏫 Professor | `prof1` | `123` |
| 🎓 Aluno | `1001` | `123` |

> 💡 Na versão atual os dados ficam salvos no próprio navegador (`localStorage`). Por isso, contas e chamadas criadas em um computador não aparecem em outro. Isso muda quando o back-end for integrado.

---

## 📖 Sobre o projeto

O **Sistema de Faltas** foi desenvolvido com o objetivo de facilitar o controle e o acompanhamento da frequência dos alunos.

A plataforma possui dois tipos de usuários: **professores e alunos**.

Os professores acessam suas disciplinas, visualizam suas turmas e realizam chamadas, registrando a presença ou falta dos alunos.

Os alunos acompanham suas disciplinas, consultam a quantidade de faltas, verificam o limite permitido e acompanham sua situação durante o semestre.

Além disso, o sistema possui **alertas de frequência**, que avisam o aluno quando ele está próximo de atingir o limite de faltas de uma disciplina.

---

## 👨‍🏫 Professor

O painel do professor permite:

- 🔐 Acessar o sistema através de login
- 📚 Visualizar suas disciplinas
- 👥 Visualizar os alunos cadastrados
- ✅ Registrar presenças
- ❌ Registrar faltas
- 📋 Realizar e salvar chamadas por data (com busca de alunos e marcação em massa)
- 🕒 Consultar a data da última chamada e o total de aulas de cada disciplina
- 📊 Consultar a frequência individual dos alunos *(em breve)*

---

## 🎓 Aluno

O aluno pode:

- 📝 Criar sua conta
- 🔐 Fazer login no sistema
- 📚 Visualizar suas disciplinas
- 📊 Consultar suas faltas, aulas e frequência
- ⚠️ Visualizar o limite de faltas com barra de progresso
- 🔔 Ver alertas de situação: **Regular**, **Atenção** e **Limite atingido**
- 📅 Consultar as datas em que faltou em cada disciplina

---

## 💻 Tecnologias

| Tecnologia | Utilização |
|---|---|
| HTML | Estrutura das páginas |
| CSS | Estilização da interface e responsividade |
| JavaScript | Lógica do front-end: login, cadastro, chamada e cálculo de faltas |
| Java | Back-end e regras de negócio *(planejado)* |
| MySQL | Armazenamento e gerenciamento dos dados *(planejado)* |

### Tecnologias utilizadas no projeto

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
</p>

---

## 🗄️ Banco de dados

O **MySQL** será utilizado para armazenar e organizar as informações necessárias para o funcionamento do sistema, incluindo:

- Alunos
- Professores
- Usuários
- Cursos
- Disciplinas
- Turmas
- Presenças
- Faltas
- Notificações

Essas informações serão utilizadas pelo back-end em Java para realizar as regras de negócio do sistema.

---

## 🔔 Sistema de alertas

Uma das funcionalidades do projeto é o acompanhamento preventivo das faltas.

O sistema verifica a quantidade de faltas registradas em cada disciplina e compara esse valor com o limite permitido (**10 faltas por disciplina**).

| Situação | Quando aparece |
|---|---|
| ✅ Regular | Menos de 7 faltas |
| ⚠️ Atenção | A partir de 7 faltas |
| 🚫 Limite atingido | 10 faltas ou mais |

Dessa forma, o aluno acompanha sua situação antes de atingir uma quantidade crítica de faltas. Na próxima etapa, esses alertas serão enviados como **notificações** geradas pelo back-end.

---

## 🖥️ Telas do sistema

- 🔐 Login
- 📝 Cadastro (aluno ou professor)
- 👨‍🏫 Painel do professor
- ✅ Realização de chamada
- 🎓 Painel do aluno (faltas, frequência e alertas)

---

## ▶️ Como executar

1. Clone o repositório:
```bash
git clone https://github.com/igorlimza-tech/Sistema-de-Faltas.git
```
2. Abra a pasta no **VS Code**.
3. Abra o `index.html` com a extensão **Live Server** (ou dê dois cliques no arquivo).
4. Entre com uma das contas de exemplo ou crie uma nova.

> Não é necessário instalar nada além de um navegador.

---

## 📁 Estrutura do projeto

```text
Sistema-de-Faltas/
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
├── index.html        (login)
├── cadastro.html
├── professor.html
├── chamada.html
├── aluno.html
│
└── README.md
```

A estrutura será atualizada conforme novas funcionalidades forem desenvolvidas.

---

## 🚧 Status do projeto

O front-end está **concluído** e o projeto segue **em desenvolvimento**, com o back-end e o banco de dados como próximas etapas.

### Progresso

- [x] Estrutura inicial do projeto
- [x] Tela de login
- [x] Painel do professor
- [x] Estilização com CSS
- [x] Tela de cadastro
- [x] Tela de chamada
- [x] Painel do aluno
- [x] Alertas de limite de faltas no painel do aluno
- [x] JavaScript (versão com dados salvos no navegador)
- [ ] Notificações automáticas
- [ ] Back-end em Java
- [ ] Banco de dados MySQL
- [ ] Integração entre front-end e back-end
- [ ] Testes finais

---

## 🎯 Objetivo

Desenvolver um sistema simples e organizado que permita aos professores controlar a frequência das turmas e aos alunos acompanhar suas faltas durante o semestre.

O sistema também busca tornar esse acompanhamento mais preventivo através de alertas quando o aluno estiver próximo de atingir o limite de faltas de uma disciplina.

Além da aplicação prática, o projeto tem como objetivo aplicar os conhecimentos adquiridos durante o curso em **desenvolvimento front-end, programação Java, banco de dados e integração entre sistemas**.

---

## 👥 Equipe

Projeto desenvolvido pelos alunos:

- **Igor Diniz Lima**
- **Giovanna Carvalho dos Reis**
- **João Carlos Nascimento de Menezes**
- **Priscila de Assis**

🎓 **Curso:** Análise e Desenvolvimento de Sistemas

---

<p align="center">
  Desenvolvido para fins acadêmicos 📚
</p>
