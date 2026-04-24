# Especificação Técnica: Plataforma de Cálculo de Ração para Bovinos de Corte (Boia App)

## Resumo Executivo
- Esse projeto é um frontend do site web "https://boia.app.br" que ajudará Zootecnistas, Veterinários e produtores rurais a formularem uma ração para bovinos de corte. 
- Esse site será responsável por receber os dados de entrada do usuário, processá-los e retornar uma ração balanceada para bovinos de corte. 
- Após receber os dados de entrada, são necessários de 4 a 7 equações para calcular a ração balanceada para bovinos de corte (que serão calculados no backend que está em um outro repositório). 
- O site lidará com o cálculo dessas equações em nível básico, como Consumo de Matéria Seca (CMS), Necessidade Energética (NDT ou EM), Balanceamento da Ração (Mistura de ingredientes), Proteína Bruta (PB), Conversão alimentar
Energia líquida (mantença e ganho) FDN (fibra detergente neutro) → controle de consumo, FDA (digestibilidade), Taxa de passagem ruminal, Exigências por fase (NRC), entre outras equações. 
- Para as telas onde o usuário irá inserir os dados, a UX do site deverá ser em modelo Wizard, ou seja, o usuário irá preencher os dados em etapas, com um botão de avançar e voltar.
- Na tela de resultado final da ração já calculada, haverá um botão "Salvar Ração" que salvará a ração calculada no backend, e uma rota para listar as rações salvas anteriormente pelo usuário.

## Modelo de UX do tipo Wizard
- Usar o módulo Nuxt UI (que já está instalado no pacote package.json) para criar a melhor experiência de UX usando sliders, feedback visual para sucesso e erro com as propriedades nativas do Zod e Vee Validate no preenchimento de dados.
- Usar Stepper do Nuxt UI para criar o fluxo de etapas.
- Usar UCard para cada etapa e receber os dados do formulário.

## Detalhamento de cada uma das telas do Wizard


#### Passo 1 de 4
- **No topo da tela**  use o Stepper do Nuxt UI para mostrar o desenrolar das etapas.

##### Equações para alcançar o valor de CMS 
**Equação 1 - Mantença**
- Variável: Peso Vivo (PC) - Ex: 500kg

**Equação 2 - Ganho de Peso (g/dia)**
- Variável1 Variável: Ganho de Peso médio diário (g/dia) - Ex: 800g
- Variável2: Peso Vivo (PC) - Ex: 500kg

**Equação 3 - Gestação**
- Variável1: Peso Vivo (PC) - Ex: 500kg
- Variável2: Dias de Gestação - Ex: 150

**Equação 4 - Lactação**
- Variável1: Peso Vivo (PC) - Ex: 500kg
- Variável2: Produção de Leite (L/dia) - Ex: 10
- Variável3: Percentual de gordura - Ex: 3.5



Título:
👉 “Consumo de Matéria Seca (CMS)”
Subtítulo:
👉 “Informe os dados do animal para estimar o consumo diário”

##### Input 1 — Raça do Animal
- **Componente do NUXT UI a ser usado**: USelect
- Opções: 
    - Nelore
    - Angus
    - Braford
    - Charolês
    - Simental
    - Guzerá
    - Tabapuã
    - Canchim
    - Pantaneiro
    - Crioulo
    - Outra

##### Input 2 — Peso Vivo
- **Componente do NUXT UI a ser usado**: UInput

- Tipo: number
- Label:
👉 Peso vivo (kg)
- Placeholder:
👉 "Ex: 450"
- Hint (muito importante):
👉 “Peso atual do animal”

##### Input 3 — % do Peso Vivo (CMS)
- **Componente do NUXT UI a ser usado**: URadioGroup
- Opções: 
    - 🔘 Baixo consumo (1.8%)
    - 🔘 Médio (2.2%)
    - 🔘 Alto (2.5%)
    - 🔘 Personalizado

- **Importante**: Ao marcar personalizado, o usuário poderá informar o valor desejado.
- Intervalo: 1% a 3%
- Valor padrão: 2.0%
- Hint: 👉 “Valor típico: 2% a 2,5%”

- **Validação Antes de avançar**:
    - Peso > 0
    - % entre 1 e 3

##### Resultado do cálculo do CMS (calculado no passo anterior)
Mostrar:

- 👉 Consumo estimado: Exemplo → CMS = 10,0 kg/dia
- **Gravar o resultado numérico do CMS em um composable**
- 👉 Com destaque visual (use UBadge ou texto grande)
    - 🟢 Consumo adequado
    - 🟡 Consumo moderado
    - 🔴 Consumo alto (alerta)

💬 Abaixo dessa informação, exibir um Pequeno bloco explicativo contendo:
- Texto: 👉 “O consumo de matéria seca representa a quantidade de alimento que o animal ingere diariamente, desconsiderando a água.”
- **Componente do NUXT UI a ser usado**: UCard

##### Botão de próximo passo
👉 **EXIGÊNCIAS NUTRICIONAIS**

**Fim da Tela 1 do wizard**

---
#### Passo 2 de 4
- **No topo da tela**  use o Stepper do Nuxt UI para mostrar o passo 2 no desenrolar das etapas.

- **Título**:
👉 “Exigências Nutricionais”
- **Subtítulo**:
👉 “Defina os níveis de proteína e energia da dieta”

- **Use um UAlert mostrando o resultado do cálculo executado no passo anterior**:
Exemplo do que deverá ser mostrado:
  - Peso: 500 kg
  - CMS: 10 kg/dia
  - Esses resultados virão do passo anterior CMS (Gravado em um composable)

- Use um URadioGroup para definir o objetivo da dieta com as seguintes opções:
  - 🔘 Mantença
  - 🔘 Cria
  - 🔘 Recria
  - 🔘 Terminação
  - 🔘 Reprodução
  - 🔘 Ganho intensivo
  - 🔘 Personalizado

- **Importante**: Após o usuário selecionar uma das opções acima, o sistema deverá mostrar a seguinte tabela automaticamente

| Objetivo  | PB  | NDT | FDN |
| --------- | --- | --- | --- |
| Mantença  | 10% | 55% | 50% |
| Moderado  | 12% | 60% | 55% |
| Intensivo | 14% | 65% | 60% |

- Os valores da tabela acima, variarão de acordo com o que está especificado na tabela NRC para cada raça. Essa tabela está em um arquivo no backend.
- Caso o usuário selecione "Personalizado", o sistema deverá mostrar um input para que o usuário informe o valor desejado.
- Os valores da tabela acima deverão ser gravados no composable de resultados do passo 2.



##### Botão de próximo passo
👉 **INGREDIENTES DISPONÍVEIS**

**Fim da Tela 2 do wizard**

---

#### Passo 3 de 4
- **No topo da tela**  use o Stepper do Nuxt UI para mostrar o passo 3 no desenrolar das etapas.

- **Título**:
👉 “Ingredientes e Formulação da Dieta”
- **Subtítulo**:
👉 “Selecione os ingredientes e monte a ração”

- Use o componente **UCard** da Nuxt UI para exibir os dados das etapas anteriores, que ficaram gravados no composable, por exemplo:
    - Animal selecionado: Nelore, macho, 500kg
    - CMS: 10 kg/dia
    - PB necessária: 1,2 kg/dia
    - Energia: 6,5 kg NDT/dia

##### Tipo de escolha de ingredientes
- Use o componente **URadioGroup** da Nuxt UI para definir o modo de balanceamento da ração.
- **Opções**:
- 🔘 Manual (voltado para técnicos)
- 🔘 Automático (voltado para usuários iniciantes)

###### Escolha automática de ingredientes (fluxo iniciante)
- Caso o usuário escolha "Automático", na tela deverá aparecer outros dois componentes **URadioGroup** exibindo as seguintes opções:

- **Opções**:
- 🔘 Quero escolher os ingredientes
- 🔘 Escolha os ingredientes por mim

- **Importante**: Caso o usuário escolha "Quero escolher os ingredientes", o sistema deverá mostrar uma tabela com duas colunas. Uma coluna contendo um componente **UChec** (simular usando **UCheckbox**) para marcação e outra coluna com os ingredientes disponíveis, por exemplo: (esses ingredientes deverão vir do banco de dados, podendo ser cadastrados pelo usuário)

| ✓ | Ingrediente    
|---|-----------    
|   | Milho          
|   | Farelo de soja 
|   | Silagem        
|   | Capim          
|   | Núcleo mineral 

Caso o usuário escolha “Escolha os ingredientes por mim”, o sistema fará (no backend) a escolha dos ingredientes com base no perfil do animal e dos objetivos da dieta marcados nos passos anteriores (que ficaram salvos no composable). 

###### Escolha customizada de ingredientes (fluxo técnico)

- O sistema deverá mostrar uma tabela com duas colunas. Uma coluna contendo um componente **UChec** (simular usando **UCheckbox**) para marcação e outra coluna com os ingredientes disponíveis, por exemplo: (esses ingredientes deverão vir do banco de dados, podendo ser cadastrados pelo usuário)

| ✓ | Ingrediente    
|---|-----------    
|   | Milho          
|   | Farelo de soja 
|   | Silagem        
|   | Capim          
|   | Núcleo mineral 

##### Seletor de modo
- Após escolher os ingredientes na tabela acima, o usuário exibirá uma tabela completa com o título **"Composição da Dieta"** mostrando os ingredientes selecionados e os valores nutricionais (PB, NDT, FDN, FDA, MS) e o custo (R$/kg) (baseados na tabela NRC)

| Ingrediente   | PB (%) | NDT (%) | FDN (%) | FDA (%) | MS (%) | Custo (R$/kg) |
| ------ | ------- | ------- | ------- | ------ | ------------- |
| 8      | 85      | 10      | 2       | 88     | 1.0           |
| 45     | 75      | 15      | 5       | 90     | 2.0           |
| 8      | 60      | 50      | 30      | 35     | 0.5           |
| 10     | 55      | 60      | 35      | 25     | 0.3           |
| 0      | 0       | 0       | 0       | 100    | 5.0           |



- Dados adicionais (avançado)

- PB mínima (%)
- NDT mínimo (%)
- FDN mínima (%)
- FDA mínima (%)
- MS mínima (%)
- Limite de concentrado (%)
- Fibra mínima (%)
- Restrição de ingredientes

**Importante** - Nessa opção, a tabela será editável pelo usuário, que poderá aumentar ou diminuir a quantidade de cada ingrediente, e o sistema deverá recalcular os valores nutricionais e o custo total da ração, em tempo real.
- Caso o usuário edite qualquer valor na tabela, deverá aparecer automaticamente um botão de "de "Reset"" para que ele possa resetar os valores para os valores originais.
- Após preenchidos os valores, o sistema deverá mostrar uma tabela com o resultado do balanceamento, mostrando os ingredientes selecionados e os valores nutricionais (PB, NDT, FDN, FDA, MS) e o custo (R$/kg) (baseados na tabela NRC)
- Caso exista algum desbalanceamento entre os ingredientes, o sistema deverá mostrar alertas em tempo real
- Exemplo de alertas:
    - 🔴 “Proteína insuficiente”
    - 🟡 “Excesso de concentrado”
    - 🔴 “Risco de acidose”



##### Botão de próximo passo
👉 **RESULTADOS**

**Fim da Tela 3 do wizard**

---
#### Passo 4 de 4
- **No topo da tela**  use o Stepper do Nuxt UI para mostrar o passo 4 no desenrolar das etapas.

- **Título**:
👉 “Resultado da Dieta”
- **Subtítulo**:
👉 “Análise nutricional e econômica da formulação”

##### Status Geral
- Use o componente **UBadge** da Nuxt UI para mostrar o status geral da dieta, por exemplo:
    - ✅ Dieta aprovada
    - 🟡 Dieta em análise
    - 🔴 Dieta reprovada

##### RESULTADO DA DIETA
- Use o componente **UCard** da Nuxt UI para exibir os dados das etapas anteriores, que ficaram gravados no composable, por exemplo:
    - Animal selecionado: Nelore, macho, 500kg
    - CMS: 10 kg/dia
    - PB PB atingida: 1,2 kg (100%)
    - Energia: 6,5 kg NDT/dia (100%)
    - FDN atingida: 50% (100%)
    - FDA atingida: 25% (100%)
    - MS atingida: 100% (100%)
    - Custo: R$ 10,00/dia

###### Ingredientes com percentual
Mostrar em uma tabela os ingredientes e o total em Kg/dia

| Ingrediente   | % | Kg/dia
| ------ | ------ | ------
| Milho   | 50% | 5
| Farelo de soja   | 30% | 3
| Silagem   | 20% | 2
| Capim   | 10% | 1
| Núcleo mineral   | 0.5

Mostrar em tempo real:
- Alertas
- Sugestões
- Elogios
- Recomendações
    - 🔴 “Proteína insuficiente”
    - 🟡 “Excesso de concentrado”
    - 🔴 “Risco de acidose”

#### Relatório final detalhado 

###### Ingredientes com percentual
- Use o componente **UProgress** da Nuxt UI para mostrar o % ideal calculado para cada ingrediente, mostrando em uma linha o nome do ingrediente e a barra com o percentual por exemplo:
    - Ingrediente 1: 50% ✅
    - Ingrediente 2: 30% 🟡
    - Ingrediente 3: 20% 🔴

- Abaixo, deve aparecer um botão contendo o seguinte label: "Ver tabela completa"

Cso o usuário clique no botão acima, o sistema deverá mostrar uma tabela completa contendo as colunas:

- Ingrediente
- %
- kg/dia
- PB contribuída
- Energia contribuída
- Custo

###### Resumo Nutricional

Mostrar uma tabela com 3 colunas mostrando as seguintes informações:

| Nutriente | % Ideal | Atingido |
|-----------|---------|----------|
| PB        | 12%     | 14% ✅   |
| NDT       | 65%     | 60% 🟡   |
| FDN       | 35%     | 40% 🔴   |

###### Resumo Econômico

Mostrar uma tabela com 3 colunas mostrando as seguintes informações:

| Custo | R$/dia | R$/kg |
|-------|--------|-------|
| Custo | R$ 10,00 | R$ 1,00 |

Caso algum dos itens acima esteja fora do ideal, o sistema deverá mostrar um alerta em tempo real (ex: 🔴 PB insuficiente, 🟡 NDT insuficiente, 🔴 FDN insuficiente) e mostrar algumas recomendações, como por exemplo:
- Aumentar farelo de soja para elevar proteína
- Adicionar fonte de fibra
- Reduzir concentrado para evitar acidose

###### Exportar Relatório

- Botão para gerar PDF
- Botão para gerar Excel

👉 **SALVAR DIETA**

**Fim da Tela 4 do wizard**

---

- Nuxt 4 (Versão atualizada)
- Nuxt UI v4 (Configurado com Tailwind v4)
- pnpm
- TypeScript
- SCSS (Estilização primária)
- tailwindcss v4
- vee-validate
- zod
- Gerenciamento de estado do frontend com composables
- Repositório de código - Github (poderá ser acessado através de um server MCP)
- Hospedagem: Hostinger (Servidor Compartilhado)
- PHP (em outro repositório)
- Laravel (em outro repositório)
- Sail (em outro repositório)
- MySQL (em outro repositório)

### Arquitetura resumida:
- Frontend (Nuxt)
   ↓
- API (Laravel Controller)
   ↓
-Service (Nutrition Engine)
   ↓
-Cálculo (PHP / Solver)
   ↓
-Resposta JSON
   ↓
-Frontend renderiza

## Requisitos Funcionais (Fluxo de Cadastro e Pagamento)
1. **Input de dados no modelo Wizard**: cada dado informado pelo usuário será validado pelo Zod e Vee Validate.
2. **Gerenciamento de estado**: A cada passo do wizard, os dados informados pelo usuário serão armazenados em um estado global usando composables.


## Requisitos Não-Funcionais
- **Hospedagem**: Build SSG (`pnpm run generate`) compatível com Hostinger (via FTP).
- **Responsividade**: Totalmente adaptado para Mobile, Tablet e Desktop.
- **Metodologia**: Uso rigoroso de TDD (Test Driven Development) e filosofia DRY.
- **Idioma**: Interface em Português-BR, código (variáveis/funções) em Inglês.


## Gerenciamento de Estado
O fluxo de dados será centralizado em composables nativos do Nuxt (`app/composables/`), permitindo que as informações do candidato persistam durante a navegação entre a confirmação do plano e o formulário final.

## Segurança e Validação
- **VeeValidate + Zod**: Obrigatório para todos os formulários. O schema Zod deve validar:
    - Cadastro: Nome (mínimo 5, apenas caracteres alfabéticos e espaços), Email (formato), Nascimento (data válida), Celular (exatamente 10 dígitos: 2 de DDD + 8 do telefone).
    - Comprovante: Tipo de arquivo (mimetype) e tamanho máximo.
- **Validação Imediata**: As mensagens de erro do `vee-validate` e `zod` devem ser exibidas imediatamente abaixo do input correspondente em tempo real (on input).
- **v-model com VeeValidate**: Para evitar erros de "readonly" em objetos reativos do vee-validate (como `form.values`), deve-se utilizar obrigatoriamente a função `defineField` do `useForm` para gerar referências mutáveis compatíveis com `v-model`.
- **Restrição de Mídia**: O sistema não deve gerar arquivos de imagem, vídeo ou áudio. Deve apenas referenciar as imagens estáticas existentes em `app/assets/img/`.
- **Proteção contra Bots**: Sugestão de Cloudflare Turnstile para prevenir cadastros automatizados.
- **LGPD**: Checkbox obrigatório de consentimento.
- **Sanitização**: Limpeza de inputs antes do envio à API.

## Gerenciador de pacotes
- pnpm

## Backend
- O backend será desenvolvido em Laravel com Sail
- O frontend de cadastro enviará os dados através de REST API

## Banco de dados
- O banco de dados será desenvolvido em MySQL

## Metodologia de desenvolvimento
- Aplicar, sempre que posssível a petodologia TDD, ou seja, primeiro criar um teste, rodá-lo, criar o código principal, rodar novamente o teste e se o teste passar, encerrar a tarefa.

## Estilos CSS e Framework UI
- **Nuxt UI v4**: Base para componentes acessíveis. Utiliza o novo motor do Tailwind v4.
- **SCSS (Primário)**: A estilização do projeto será definida majoritariamente e primeiramente em SCSS. O objetivo é manter o código HTML limpo, separando a estrutura do estilo para garantir maior organização e facilidade de manutenção (Filosofia de separação de interesses).
- **Tailwind CSS v4**: Será utilizado apenas em momentos excepcionais e focado em ajustes finos em elementos específicos do módulo Nuxt UI. Deve-se evitar o uso excessivo de classes utilitárias no HTML.

## Configurações Críticas de UI (Padrão Nuxt UI v4)
Para garantir que os estilos sejam aplicados corretamente e sigam o padrão do projeto em caso de reinicialização:

1. **Importação Obrigatória no CSS Global**:
   - No arquivo de entrada CSS (ex: `app/assets/css/app.css`), é obrigatório incluir:
     ```css
     @import "tailwindcss";
     @import "@nuxt/ui";
     ```
   - Sem a importação do `@nuxt/ui`, os componentes não carregarão seus estilos base.

2. **Configuração de Tema (`app.config.ts`)**:
   - O tema deve ser definido no `app.config.ts` para alinhar com a identidade Agro-Premium:
     ```typescript
     export default defineAppConfig({
       ui: {
         primary: 'green',
         gray: 'slate'
       }
     })
     ```

3. **Wrapper Global (`app.vue`)**:
   - Todos os componentes devem estar dentro do wrapper `<UApp>` para que os estilos e feedbacks visuais funcionem corretamente.

4. **Padrão de Propriedades de Componentes (v4)**:
   - **UStepper**: Utilizar a propriedade `title` para o título de cada etapa (não use `label`, que foi depreciado ou alterado na v4).
   - **Icons**: Utilizar o prefixo `i-` (ex: `i-heroicons-leaf`).

## Plano de Verificação
- Verificação visual em múltiplos breakpoints.
- Simulação de erros de API para garantir mensagens amigáveis ao usuário.

