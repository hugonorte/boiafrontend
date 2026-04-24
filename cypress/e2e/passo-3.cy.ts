describe('Wizard Passo 3 - Ingredientes', () => {
  beforeEach(() => {
    // 1. Visitar Passo 1 e preencher
    cy.visit('/calc/passo-1/dados-do-animal')
    cy.get('#input-race', { timeout: 15000 }).select('Nelore')
    cy.get('#input-sex').select('macho')
    cy.get('#input-age').type('24')
    cy.get('#input-weight').type('500')
    cy.get('#objective-ganho').click()
    cy.get('button').contains('Próximo Passo').click()

    // 2. Preencher Passo 2
    cy.url({ timeout: 10000 }).should('include', '/calc/passo-2/sistema-de-producao')
    cy.get('#production-system-confinamento').click()
    cy.get('#activity-level-baixo').click()
    cy.get('button').contains('Próximo Passo').click()

    // 3. Chegar no Passo 3
    cy.url({ timeout: 10000 }).should('include', '/calc/passo-3/ingredientes')
    cy.contains('Modo de Balanceamento').should('be.visible')
  })

  it('deve bloquear navegação se nenhum ingrediente for selecionado', () => {
    // Tentar avançar sem selecionar modo ou ingredientes
    cy.get('button').contains('Próximo Passo').click()
    
    // Como o modo de balanceamento também é obrigatório pela lógica implícita do Wizard,
    // vamos selecionar o modo manual primeiro para testar a validação de ingredientes
    cy.contains('Manual').click()
    cy.wait(500)
    
    cy.get('button').contains('Próximo Passo').click()
    
    // Verificar erro de ingredientes
    cy.contains('Selecione pelo menos um ingrediente').should('be.visible')
    cy.url().should('include', '/calc/passo-3/ingredientes')
  })

  it('deve permitir avançar após selecionar o modo manual e 4 ingredientes', () => {
    // 1. Selecionar modo Manual
    cy.contains('Manual').click()
    cy.wait(500)

    // 2. Selecionar os 4 primeiros ingredientes (IDs 1, 2, 3, 4 no fallback)
    cy.get('#ingredient-1').click()
    cy.get('#ingredient-2').click()
    cy.get('#ingredient-3').click()
    cy.get('#ingredient-4').click()

    // 3. Verificar se apareceram na lista de selecionados
    cy.get('.selected-section').should('exist')
    cy.contains('Ingredientes Selecionados (4)').should('be.visible')

    // 4. Avançar para o Resultado (Passo 4)
    cy.get('button').contains('Próximo Passo').click()

    // 5. Validar chegada no Passo 4
    cy.url({ timeout: 15000 }).should('include', '/calc/passo-4/resultado')
    cy.contains('Resultado da Dieta').should('be.visible')
  })
})
