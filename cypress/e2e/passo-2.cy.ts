describe('Wizard Passo 2 - Sistema de Produção', () => {
  beforeEach(() => {
    cy.visit('/calc/passo-1/dados-do-animal')
    
    // Preencher Passo 1 com esperas explícitas
    cy.get('#input-race').select('Nelore')
    cy.get('#input-sex').select('macho')
    cy.get('#input-age').clear().type('24')
    cy.get('#input-weight').clear().type('500')
    cy.get('#objective-ganho').click()
    
    cy.wait(500)
    cy.get('button').contains('Próximo Passo').click()
    
    // Aguardar transição para passo 2
    cy.url({ timeout: 15000 }).should('include', '/calc/passo-2/sistema-de-producao')
    cy.contains('Sistema de Produção').should('be.visible')
  })

  it('deve mostrar erros de validação se nada for selecionado no Passo 2', () => {
    // Tentar avançar sem preencher nada
    cy.get('button').contains('Próximo Passo').click()
    
    // Verificar se mensagens de erro aparecem
    cy.contains('Obrigatório').should('be.visible')
    
    // Verificar se permanecemos na mesma página
    cy.url().should('include', '/calc/passo-2/sistema-de-producao')
  })

  it('deve avançar para o Passo 3 após selecionar sistema e atividade', () => {
    // 1. Selecionar Sistema de Produção
    cy.get('#production-system-confinamento').click()
    cy.get('#production-system-confinamento').should('have.class', 'border-primary-500')

    // 2. Selecionar Nível de Atividade
    cy.get('#activity-level-baixo').click()
    cy.get('#activity-level-baixo').should('have.class', 'border-primary-500')

    cy.wait(500)

    // 3. Avançar
    cy.get('button').contains('Próximo Passo').click()

    // 4. Validar Passo 3 (Ingredientes)
    cy.url({ timeout: 15000 }).should('include', '/calc/passo-3/ingredientes')
    cy.contains('Modo de Balanceamento').should('be.visible')
  })
})
