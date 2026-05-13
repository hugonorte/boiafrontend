describe('Wizard Passo 1 - Dados do Animal', () => {
  beforeEach(() => {
    cy.visit('/calc/passo-1/dados-do-animal')
    // Garantir que a hidratação terminou
    cy.get('h1', { timeout: 20000 }).should('be.visible')
    cy.wait(5000) 
  })

  it('deve preencher todos os campos do Passo 1 e avançar para o Passo 2', () => {
    // 1. Raça
    cy.get('select#input-race', { timeout: 15000 })
      .should('be.visible')
      .select('Nelore', { force: true })

    // 2. Sexo
    cy.get('select#input-sex')
      .should('be.visible')
      .select('macho', { force: true })

    // 3. Idade
    cy.get('#input-age').clear().type('24').blur()

    // 4. Peso Vivo
    cy.get('#input-weight').clear().type('500').blur()
    
    // Pequena espera para o estado sincronizar
    cy.wait(1000)

    // 5. Objetivo
    cy.contains('Mantença').scrollIntoView().click({ force: true })

    // 6. CMS Preset
    cy.contains('MÉDIO 2.2%').scrollIntoView().click({ force: true })
    
    // Verificando o resultado do cálculo
    cy.contains('kg/dia', { timeout: 20000 }).should('be.visible')
    cy.contains('11.00').should('be.visible')

    // 7. Avançar
    cy.get('button').contains(/Próximo passo/i).scrollIntoView().click({ force: true })

    // 8. Validar Passo 2
    cy.url({ timeout: 20000 }).should('include', '/calc/passo-2/sistema-de-producao')
  })

  it('deve mostrar erros de validação se campos obrigatórios estiverem vazios', () => {
    cy.get('button').contains(/Próximo passo/i).scrollIntoView().click({ force: true })
    cy.contains('Obrigatório', { timeout: 15000 }).should('be.visible')
    cy.url().should('include', '/calc/passo-1/dados-do-animal')
  })
})
