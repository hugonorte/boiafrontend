describe('Wizard Passo 1 - Dados do Animal', () => {
  beforeEach(() => {
    cy.visit('/calc/passo-1/dados-do-animal')
  })

  it('deve preencher todos os campos do Passo 1 e avançar para o Passo 2', () => {
    // Aguardar o título
    cy.get('h1', { timeout: 15000 }).should('exist')
    
    // 1. Selecionar Raça
    cy.get('#input-race').select('Nelore')

    // 2. Selecionar Sexo
    cy.get('#input-sex').select('macho')

    // 3. Preencher Idade
    cy.get('#input-age').clear().type('24')

    // 4. Preencher Peso Vivo
    cy.get('#input-weight').clear().type('500')

    // 5. Selecionar Objetivo
    cy.get('#objective-ganho').click()

    // 6. Avançar
    cy.get('button').contains('Próximo Passo').click()

    // 7. Validar Passo 2
    cy.url({ timeout: 10000 }).should('include', '/calc/passo-2/sistema-de-producao')
  })

  it('deve mostrar erros de validação se campos obrigatórios estiverem vazios', () => {
    // Tentar avançar sem preencher nada
    cy.get('button').contains('Próximo Passo').click()
    
    // Verificar se mensagens de erro aparecem
    cy.contains('Obrigatório').should('be.visible')
    
    // Verificar se permanecemos na mesma página
    cy.url().should('include', '/calc/passo-1/dados-do-animal')
  })
})
