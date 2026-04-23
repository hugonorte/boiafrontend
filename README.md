# Boia App - Plataforma de Cálculo de Ração para Bovinos de Corte

Este é o frontend da plataforma **Boia App**, desenvolvida para auxiliar Zootecnistas, Veterinários e produtores rurais na formulação de rações balanceadas para bovinos de corte. O sistema utiliza um fluxo de interface do tipo **Wizard (Passo a Passo)** para coletar dados e fornecer resultados precisos.

## 🚀 Tech Stack

O projeto utiliza as tecnologias mais modernas do ecossistema Vue/Nuxt para garantir performance, segurança e uma experiência de usuário premium:

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3)
- **UI Framework**: [Nuxt UI](https://ui.nuxt.com/) (Componentes acessíveis e modernos)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/) (Tipagem estática para maior segurança)
- **Estilização**: [SCSS](https://sass-lang.com/) (Customização avançada de estilos)
- **Gerenciador de Pacotes**: [pnpm](https://pnpm.io/) (Rápido e eficiente)
- **Validação de Formulários**: [Vee-Validate](https://vee-validate.logaretm.com/v4/) + [Zod](https://zod.dev/)
- **Testes**: [Vitest](https://vitest.dev/) (Test Driven Development - TDD)

---

## 🛠️ Como rodar o projeto (Passo a Passo)

Este guia foi feito pensando em quem está começando. Siga os passos abaixo para configurar seu ambiente de desenvolvimento local.

### 1. Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:
- **Node.js**: Versão LTS (Recomendamos a 20.x ou superior). [Baixe aqui](https://nodejs.org/).
- **pnpm**: Nosso gerenciador de pacotes. Se não tiver, instale rodando:
  ```bash
  npm install -g pnpm
  ```

### 2. Clonar o Repositório

Abra o seu terminal e rode o comando para baixar o código:

```bash
git clone git@github.com:hugonorte/boiafrontend.git
cd boiafrontend
```

### 3. Instalar as Dependências

Dentro da pasta do projeto, baixe todas as bibliotecas necessárias:

```bash
pnpm install
```

### 4. Executar o Servidor de Desenvolvimento

Agora, inicie o projeto para visualizar no navegador:

```bash
pnpm dev
```

Após rodar o comando, o terminal mostrará um link (geralmente `http://localhost:3000`). Abra-o no seu navegador.

---

## 🧪 Testes e Qualidade

Nós seguimos a metodologia **TDD (Test Driven Development)**. Para rodar os testes unitários e garantir que tudo está funcionando corretamente:

```bash
pnpm test
```

---

## 🏗️ Estrutura do Projeto (Wizard)

O formulário de cadastro é dividido em 4 etapas principais:
1. **CMS**: Cálculo do Consumo de Matéria Seca baseado no peso vivo e raça.
2. **Exigências**: Definição dos níveis de proteína (PB) e energia (NDT).
3. **Ingredientes**: Seleção e balanceamento da mistura.
4. **Resultados**: Análise nutricional e econômica detalhada.

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).
