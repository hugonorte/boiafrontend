describe('Wizard Passo 2 - Sistema de Produção', () => {
  beforeEach(() => {
    // Para testar o passo 2 diretamente, precisamos preencher o estado do passo 1 ou navegar até lá
    // Mas como o estado é global e SPA, podemos tentar navegar.
    // No entanto, o ideal é testar o fluxo completo para garantir que os dados do passo 1 persistem.
    cy.visit('/calc/passo-1/dados-do-animal')
    cy.get('h1', { timeout: 20000 }).should('be.visible')
    cy.wait(3000)

    // Preencher Passo 1 rapidamente
    cy.get('select#input-race').select('Nelore', { force: true })
    cy.get('select#input-sex').select('macho', { force: true })
    cy.get('#input-age').clear().type('24').blur()
    cy.get('#input-weight').clear().type('500').blur()
    cy.contains('Mantença').click({ force: true })
    cy.contains('MÉDIO 2.2%').click({ force: true })
    
    cy.get('button').contains(/Próximo passo/i).click({ force: true })
    
    // Validar que chegou no Passo 2
    cy.url({ timeout: 15000 }).should('include', '/calc/passo-2/sistema-de-producao')
  })

  it('deve preencher os campos do Passo 2 e avançar para o Passo 3', () => {
    // 1. Verificar Resumo do Passo 1
    cy.contains('Peso Vivo: 500kg').should('be.visible')
    cy.contains('CMS Estimado: 11.00 kg/dia').should('be.visible')

    // 2. Selecionar Sistema de Produção
    cy.get('#production-system-confinamento').scrollIntoView().click({ force: true })
    cy.get('#production-system-confinamento').should('have.class', 'active')

    // 3. Selecionar Nível de Atividade
    cy.get('#activity-level-baixo').scrollIntoView().click({ force: true })
    cy.get('#activity-level-baixo').should('have.class', 'active')

    // 4. Avançar
    cy.get('button').contains(/Próximo passo/i).scrollIntoView().click({ force: true })

    // 5. Validar Passo 3
    cy.url({ timeout: 15000 }).should('include', '/calc/passo-3/ingredientes')
  })

  it('deve mostrar erros de validação se campos obrigatórios do Passo 2 estiverem vazios', () => {
    // O Passo 2 já carrega com campos vazios (se não clicarmos)
    cy.get('button').contains(/Próximo passo/i).scrollIntoView().click({ force: true })
    
    cy.contains('Obrigatório', { timeout: 10000 }).should('be.visible')
    cy.url().should('include', '/calc/passo-2/sistema-de-producao')
  })
})
