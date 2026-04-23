# DESIGN.md

## Resumo Executivo
- Esse projeto é um frontend do site web BOIA "https://boia.app.br" que ajudará Zootecnistas, Veterinários e produtores rurais a formularem uma ração para bovinos de corte. 
- Esse site será responsável por receber os dados de entrada do usuário, processá-los e retornar uma ração balanceada para bovinos de corte. 
- Após receber os dados de entrada, são necessários de 4 a 7 equações para calcular a ração balanceada para bovinos de corte (que serão calculados no backend que está em um outro repositório). 
- O site lidará com o cálculo dessas equações em nível básico, como Consumo de Matéria Seca (CMS), Necessidade Energética (NDT ou EM), Balanceamento da Ração (Mistura de ingredientes), Proteína Bruta (PB), Conversão alimentar
Energia líquida (mantença e ganho) FDN (fibra detergente neutro) → controle de consumo, FDA (digestibilidade), Taxa de passagem ruminal, Exigências por fase (NRC), entre outras equações. 
- Para as telas onde o usuário irá inserir os dados, a UX do site deverá ser em modelo Wizard, ou seja, o usuário irá preencher os dados em etapas, com um botão de avançar e voltar.
- Na tela de resultado final da ração já calculada, haverá um botão "Salvar Ração" que salvará a ração calculada no backend, e uma rota para listar as rações salvas anteriormente pelo usuário.

## 🌟 Atmosfera e Princípios de Design

O **Boia App** deve transmitir uma sensação de **"Agro-Premium"**. Isso significa uma combinação de robustez agrícola com precisão tecnológica moderna.
- **Confiança e Precisão**: Interface limpa e dados bem estruturados.
- **Modernidade**: Uso de glassmorphism, sombras suaves e animações fluidas.
- **Intuitividade**: Fluxo Wizard claro que guia o usuário sem sobrecarregá-lo.
- **Limpeza de Código**: Separação clara entre estrutura (HTML) e estilo (SCSS), evitando a poluição do template com classes utilitárias excessivas.

---

## 🎨 Paleta de Cores

### Cores Primárias (Verde Agro)
Utilizamos uma escala de verdes que remete ao campo e ao crescimento:
- **Primary-500**: `#22c55e` (Base)
- **Primary-600**: `#16a34a` (Destaque principal)
- **Primary-700**: `#15803d` (Hover e estados ativos)

### Cores Neutras e Superfície
- **Background**: `#f8fafc` (Slate 50 - Fundo limpo e leve)
- **Surface**: `rgba(255, 255, 255, 0.8)` (Branco translúcido com blur)
- **Text Primary**: `#1e293b` (Slate 800 - Leitura confortável)
- **Text Secondary**: `#64748b` (Slate 500 - Legendas e hints)

### Cores de Feedback
- **Success**: `#10b981` (Esmeralda)
- **Warning**: `#f59e0b` (Âmbar)
- **Error**: `#ef4444` (Vermelho)

---

## Typography ✍️

- **Principal**: [Inter](https://fonts.google.com/specimen/Inter)
- **Cabeçalhos**: Inter (Black/Bold para impacto tecnológico)
- **Hierarquia**:
  - `H1`: 3rem (48px), Black, Tracking Tight.
  - `Body`: 1rem (16px), Regular.
  - `Label`: 0.875rem (14px), Medium.

---

## 📐 Espaçamento e Layout

### Sistema de Grid
- Layout responsivo baseado em colunas do Tailwind/Nuxt UI.
- Desktop: Sidebar de navegação (1/4) e Área de conteúdo (3/4).
- Mobile: Coluna única com Stepper horizontal no topo.

### Bordas e Sombras
- **Border Radius**: `20px` para cards principais (Premium look).
- **Shadows**: `0 10px 15px -3px rgba(0, 0, 0, 0.1)` (Profundidade suave).

---

## 🧩 Componentes Customizados

### Premium Card
- **Estilo**: Glassmorphism (`backdrop-filter: blur(12px)`).
- **Interação**: Elevação suave no hover (`translateY(-4px)`).
- **Uso**: Container principal de cada passo do Wizard.

### Wizard Stepper
- **Posicionamento**: Sticky na sidebar em desktop.
- **Estilo**: Ícones claros e labels descritivas.
- **Feedback**: Cores de destaque para passos completados e atual.

---

## 🎞️ Animações e Transições

- **SlideUp**: Transição de entrada para o conteúdo dos passos do Wizard (`slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)`).
- **Hover States**: Transições suaves de 0.3s para todos os elementos interativos.

---

## 🎨 Metodologia de Estilização

### SCSS (Prioridade Total)
A estilização deve ser feita via arquivos SCSS (ou blocos `<style lang="scss">` scoped nos componentes). Isso visa:
- Manter o HTML semântico e legível.
- Facilitar a reutilização de variáveis e mixins.
- Centralizar a lógica visual fora dos templates.

### Tailwind CSS (Exceções)
O uso de Tailwind é restrito a:
- Ajustes pontuais e excepcionais.
- Customização de propriedades internas de componentes do **Nuxt UI** através do atributo `ui`.
- Prototipagem rápida que será posteriormente refatorada para SCSS.

---

## 🛠️ Regras para IA (Stitch Context)
Ao gerar novas telas ou componentes:
1. Sempre utilize componentes do **Nuxt UI** como base.
2. **Priorize SCSS** para qualquer customização visual.
3. Utilize Tailwind apenas para props de componentes UI ou em casos de extrema simplicidade.
4. Aplique a classe `.premium-card` para containers de dados.
5. Mantenha os textos em **Português Brasileiro** e o código em **Inglês**.
6. Garanta que a validação (Vee-Validate/Zod) tenha feedback visual imediato seguindo as cores de erro definidas.
