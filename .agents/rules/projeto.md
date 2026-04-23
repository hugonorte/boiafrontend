---
trigger: always_on
---

# Descrição geral do projeto
## O que é o projeto
- Frontend de uma plataforma de cadastro de membros apoiadores do site https://boia.app.br


## Passo a passo de uso do usuário
1. O usuário chegará a esse site através do link https://boia.app.br
2. O site será consumido pelo usuário através de um formulário do tipo "Wizard" de acordo com o que está especificado no documento `Technical_Specification.md`


### Observações sobre o passo a passo
- O cadastro (input de dados) deverá ser feito em etapas. Em um formulário do tipo "Wizard"

## Motivação principal do usuário
- Receber o resultado do cálculo contendo as proporções ótimas de cada inrgediente para uma ração que contenha os valores nutricionais ideais para o seu animal, de acordo com um objetivo específico.

## Framework de desenvolvimento
- Nuxt 

### Módulo principal para os templates
- Nuxt UI

## Backend
- O backend será desenvolvido em Laravel
- O frontend de cadastro enviará os dados através de REST API


## Metodologia de desenvolvimento
- Aplicar, sempre que posssível a petodologia TDD, ou seja, primeiro criar um teste, rodá-lo, criar o código principal, rodar novamente o teste e se o teste passar, encerrar a tarefa.

## Premissas
- Proporcionar uma interface atraente e intuitiva
- O visual deve ser moderno e agradável
- Os scripts relativos aos formulários devem ser seguros
- Seguir os padrões recomendados pela comunidade Javascript quando for criar nome de variáveis e constantes
- Semrpe Preferir usar código .SCSS para estilos em vez de códigos e classes Tailwind
- Seguir a filosofia DRY "don't repeat yourself" nas sugestões de código e sempre sugerir funções helper ou services para não ter que repetir funções, métodos e variáveis
- Usar o idioma inglês para nomear variáveis, constantes e funções
- Usar o idioma português brasileiro para os textos que serão exibidos aos usuários.
- O site tem que ser responsivo e ficar com visualização adaptada para smartphones, tablets, notebooks e desktops
- Realizar, sempre que possível, pequenas releases
- Trabalhar com integração contínua
- A medida que o projeto for crescendo, refatorar o código quando necessário, e quando refatorar, refazer o teste correspondente à refatoração e rodar o teste para ter certeza que tudo continua funcionando.
- Separar partes do código em componentes para que possam ser reutilizados.
- o layout deve utilizar os componentes e scripts do módulo Nuxt UI https://ui.nuxt.com/
- Ao usar `vee-validate`, deve-se obrigatoriamente utilizar a função `defineField` do `useForm` para gerar referências mutáveis compatíveis com `v-model`, evitando erros de "readonly" em `form.values`.
- As respostas no chat do agente devem sempre ser escritas em português brasileiro.