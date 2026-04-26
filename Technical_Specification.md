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
- Usar o módulo Nuxt UI (que já está instalado no pacote package.json) para criar a melhor experiêcia de UX usando sliders, feedback visual para sucesso e erro com as propriedades nativas do Zod e Vee Validate no preenchimento de dados.
- Usar Stepper do Nuxt UI para criar o fluxo de etapas.
- Usar UCard para cada etapa e receber os dados do formulário.

## Detalhamento de cada uma das telas do Wizard

#### Passo 1 de 4: Dados do Animal e Objetivo
- **Título**: "Dados do animal"
- **Subtítulo**: "Características principais e objetivo da dieta"

##### Estrutura de Dados e Inputs
O Passo 1 coleta as informações biométricas essenciais para os cálculos de exigências nutricionais.

1. **Raça do Animal**
   - **Componente**: `USelect`
   - **Opções**: Nelore, Angus, Braford, Charolês, Simental, Guzerá, Tabapuã, Canchim, Pantaneiro, Crioulo, Outra.

2. **Sexo**
   - **Componente**: `USelect`
   - **Opções**: Macho, Fêmea.

3. **Idade**
   - **Componente**: `UInput` (type: number)
   - **Unidade**: Meses.

4. **Peso Vivo (kg)**
   - **Componente**: `UInput` (type: number)
   - **Hint**: "Peso atual do animal".
   - **Validação**: Obrigatório, maior que 0.

##### Objetivo da Dieta
Seleção visual do propósito nutricional usando `WizardSelectionCards`.

- **Mantença**: Equação base para animais em estado de repouso.
- **Ganho de Peso**: Para animais em fase de engorda ou crescimento.
- **Gestação**: Ajuste baseado nos dias de gestação.
- **Lactação**: Baseado na produção diária e gordura do leite.

##### Lógica de Cálculo (Background)
Ao informar o Peso Vivo (PV), o sistema calcula automaticamente no estado global:
- **Peso Metabólico (PV^0.75)**: Base para cálculo de consumo.
- **Energia Líquida de Mantença (ELm)**: Calculada como `Peso Metabólico * 0.077`.

##### Navegação
- **Botão**: Próximo Passo: Sistema de Produção.

**Fim da Tela 1 do wizard**

---
#### Passo 2 de 4: Sistema de Produção e Atividade
- **Título**: "Sistema de produção"
- **Subtítulo**: "Defina o ambiente e nível de atividade do lote"

##### Resumo de Dados (Contexto)
- **Componente**: `UAlert`
- Exibe de forma persistente os dados consolidados do Passo 1 (Peso Vivo e CMS Estimado) para orientar as escolhas do sistema de produção.

##### Sistema de Produção
Seleção do modelo de manejo através de `WizardSelectionCards`.

1. **Pasto Extensivo**: Sistema tradicional em grandes áreas com baixa lotação.
2. **Pasto Rotacionado**: Manejo intensivo de pastagem com divisão de piquetes.
3. **Semi-confinamento**: Suplementação no cocho para animais mantidos a pasto.
4. **Confinamento**: Engorda intensiva com dieta 100% fornecida no cocho.

##### Nível de Atividade
Ajuste da intensidade física para refinamento das exigências de mantença.

- **Baixo**: Pouca movimentação ou repouso.
- **Médio**: Nível moderado de atividade.
- **Alto**: Alta movimentação ou terrenos íngremes.

##### Navegação
- **Botão**: Próximo Passo: Ingredientes.

**Fim da Tela 2 do wizard**

---

#### Passo 3 de 4: Ingredientes e Formulação
- **Título**: "Ingredientes e Formulação da Dieta"
- **Subtítulo**: "Selecione os ingredientes e monte a ração"

##### Resumo Consolidado
- **Componente**: `UAlert`
- Exibe o resumo do animal, CMS e sistema de produção para referência durante a escolha dos ingredientes.

##### Modo de Balanceamento
- **Automático**: O sistema sugere a melhor combinação (processado no backend).
- **Manual**: O usuário seleciona os ingredientes e ajusta as proporções.

##### Fluxo de Seleção Manual (Cesta de Ingredientes)
Interface dinâmica composta por três áreas principais:

1. **Ingredientes Selecionados (Cesta)**
   - Exibe apenas os itens já escolhidos pelo usuário.
   - Permite remoção rápida ao clicar no card ou através do botão "Limpar tudo".

2. **Principais Ingredientes (Sugestões)**
   - Exibe os 10 ingredientes mais comuns (Milhos, Farelos, Silagens) em cards responsivos (flexbox).
   - Cada card exibe: Nome, PB (%), EM, e Custo (R$/Kg).

3. **Busca Inteligente**
   - Campo de input para localizar qualquer item na base de 50+ ingredientes.
   - **Recurso**: Normalização de texto (ignora acentos e maiúsculas/minúsculas).
   - Resultados exibidos em tempo real abaixo da barra de busca.

##### Lógica de Estado
- Os ingredientes selecionados são armazenados no array `step3.selectedIngredients` do composable global, garantindo que os valores nutricionais e custos de cada item estejam disponíveis para o cálculo final no Passo 4.

##### Navegação
- **Botão**: Próximo Passo: Resultado.

**Fim da Tela 3 do wizard**
---

## Algoritmos de Cálculo por Objetivo

### 1. Objetivo: Mantença
Este algoritmo é ativado quando `step1.dietObjective === 'Mantença'`. Ele define as proporções da dieta e realiza o cálculo de eficiência energética.

#### A. Seleção e Categorização (Passo 3 para 4)
Ao tentar avançar para o Passo 4, o sistema deve:
1. **Categorizar** os ingredientes em `step3.selectedIngredients` nas categorias: `Volumoso`, `Energético` e `Proteico`.
2. **Regra de Seleção Única**: Se houver mais de um ingrediente na mesma categoria, o sistema selecionará automaticamente o de **menor custo** (`custo`) para os cálculos.
3. **Bloqueio de Navegação**: Caso faltem ingredientes em qualquer uma das três categorias, o sistema deve impedir o avanço para o Passo 4 e exibir um alerta no Passo 3.

#### B. Estimativa de Quantidades (MS)
As quantidades baseadas na estimativa inicial (`initialCMSEstimate`) are:
- **Volumoso**: `initialCMSEstimate * 0.6` (Kg MS)
- **Energético**: `initialCMSEstimate * 0.3` (Kg MS)
- **Proteico**: `initialCMSEstimate * 0.1` (Kg MS)

#### C. Sequência de Cálculos Nutricionais (Passo 4)
Os resultados devem ser armazenados em `step4`:

1. **EMDieta (Energia Metabolizável da Dieta)**:
   - `EmVolumoso = EM_volumoso * 0.7`
   - `EmEnergetico = EM_energetico * 0.2`
   - `EmProteico = EM_proteico * 0.1`
   - `step4.EMdieta = EmVolumoso + EmEnergetico + EmProteico`

2. **EBDieta (Energia Bruta da Dieta)**:
   - `EbVolumoso = EB_volumoso * 0.7`
   - `EbEnergetico = EB_energetico * 0.2`
   - `EbProteico = EB_proteico * 0.1`
   - `step4.EBDieta = EbVolumoso + EbEnergetico + EbProteico`

3. **Eficiência Energética (Q e Km)**:
   - `step4.Q = EMdieta / EBDieta`
   - `step4.Km = (0.35 * Q) + 0.503`

4. **Necessidade e Consumo Real**:
   - `step4.EMm = EnergiaLiquidaMantenca / Km`
   - `step4.cmsReal = EMm / EMdieta`

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

#### 4. Passo 4: Resultado da Seleção
Esta tela apresenta um resumo detalhado de todos os ingredientes selecionados no passo anterior, permitindo que o usuário valide as informações nutricionais antes de prosseguir para o cálculo final ou salvar a dieta.

###### Elementos da Interface (Fase 1: Resumo da Seleção)
- **Título da Etapa:** "Resumo da Seleção"
- **Descrição:** "Confira abaixo os ingredientes selecionados e seus respectivos valores nutricionais."
- **Tabela de Resultados (UTable):**
  - **Colunas:**
    - `Ingrediente`: Nome do alimento (exibido em negrito).
    - `MS (%)`: Matéria Seca.
    - `PB (%)`: Proteína Bruta (exibida com um `UBadge` verde).
    - `FDN (%)`: Fibra em Detergente Neutro.
    - `EM (Mcal)`: Energia Metabolizável.
    - `Custo (R$/kg)`: Preço informado ou padrão.
- **Estado Vazio (Empty State):** Caso nenhum ingrediente tenha sido selecionado, exibe uma mensagem de alerta com um ícone e um botão para retornar ao Passo 3.

###### Relatório Final (Fase 2: Após Cálculo)
*(Implementação futura baseada no backend)*
- Exibição de gráficos de barra para percentuais de inclusão.
- Alertas nutricionais (ex: "Proteína insuficiente", "Risco de acidose").
- Botões para exportar PDF/Excel.
- Opção "Salvar Dieta".

---

## Metodologia e Garantia de Qualidade (QA)

### Testes E2E (Cypress)
O projeto utiliza Cypress para garantir a integridade dos fluxos críticos.
- **Suite Validada:** `cypress/e2e/passo-1.cy.ts`
- **Cobertura:** Validação de inputs numéricos, seleção de cards agro-premium e navegação entre etapas.
- **Padrão de Seletores:** Priorizar seletores resilientes baseados em labels e no atributo `[data-slot="root"]` do Nuxt UI v4 para evitar quebras por alterações estruturais do framework.

### Metodologia de Desenvolvimento
- **TDD (Test Driven Development)**: Sempre que possível, criar o teste antes da funcionalidade.
- **Filosofia DRY**: Uso extensivo de composables (ex: `useWizardState`) para evitar duplicação de lógica.
- **Responsividade**: Mobile-first, garantindo que o Wizard seja utilizável em smartphones no campo.

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
### Nuxt UI v4 Implementation Patterns

### Nuxt UI v4 Implementation Patterns (TanStack Table)

#### UTable Requirements
Nuxt UI v4 `UTable` is powered by TanStack Table. To ensure correct data mapping and reactivity:
- **Column Definitions**: Use `accessorKey` for data mapping and `header` for the column label. 
- **Slot Pattern**: Customizing cells requires the `#<accessorKey>-cell` slot. The slot scope provides a `cell` object; use `cell.getValue()` to access the data.
- **SSR/Hydration**: Always wrap `UTable` in `<ClientOnly>` when dealing with client-side state (like Wizard state) to prevent hydration mismatches.
- **Empty State**: Use the `#empty` slot to handle cases with no data gracefully.

Example:
```typescript
const columns = [
    { accessorKey: 'nome', header: 'Ingrediente' },
    { accessorKey: 'ms', header: 'MS (%)' }
]
```

Slot Example:
```vue
<template #nome-cell="{ cell }">
  <span>{{ cell.getValue() }}</span>
</template>
```
