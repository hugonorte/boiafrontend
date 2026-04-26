<script setup lang="ts">
/**
 * Step 4: Resultados / Análise
 * High-fidelity replication from Stitch Design
 */

const { state } = useWizardState()

const results = [
  { name: 'Milho Grão', percentage: 45, mn: 4.5 },
  { name: 'Farelo de Soja', percentage: 15, mn: 1.5 },
  { name: 'Silagem de Milho', percentage: 38, mn: 12.0 },
  { name: 'Suplemento', percentage: 2, mn: 0.2 }
]

const nutrients = [
  { name: 'Proteína Bruta (PB)', unit: '%', goal: 12.0, actual: 12.1, status: 'ok' },
  { name: 'Energia (NDT)', unit: '%', goal: 65.0, actual: 66.2, status: 'ok' },
  { name: 'FDN', unit: '%', goal: 45.0, actual: 44.5, status: 'ok' },
  { name: 'FDA', unit: '%', goal: 25.0, actual: 24.2, status: 'ok' }
]
</script>

<template>
  <div class="step-results-fidelity">
    <!-- Header with MN Highlight -->
    <header class="step-header mb-8 flex justify-between items-end">
      <div>
        <h2 class="title">Resultado Final</h2>
        <p class="subtitle">Confira a composição e análise nutricional da dieta.</p>
      </div>
      <div class="mass-highlight">
        <span class="label">MASSA TOTAL (MN)</span>
        <span class="value">18,2 <small>kg/dia</small></span>
      </div>
    </header>

    <div class="results-container space-y-8">
      <!-- 1. Composition List -->
      <section class="composition-section">
        <label class="group-label">Composição da Ração (% MS)</label>
        <div class="composition-grid grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div v-for="res in results" :key="res.name" class="comp-card">
            <div class="comp-info">
              <span class="name">{{ res.name }}</span>
              <span class="mn-val">{{ res.mn }} kg MN</span>
            </div>
            <div class="comp-percentage">
              <span class="val">{{ res.percentage }}%</span>
              <div class="mini-bar"><div class="fill" :style="{ width: res.percentage + '%' }" /></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Nutritional Table -->
      <section class="analysis-section">
        <label class="group-label">Análise Nutricional</label>
        <div class="nutritional-table mt-4">
          <div class="table-header">
            <span>Nutriente</span>
            <span>Meta</span>
            <span>Alcançado</span>
            <span>Status</span>
          </div>
          <div v-for="nut in nutrients" :key="nut.name" class="table-row">
            <span class="nut-name">{{ nut.name }}</span>
            <span class="nut-goal">{{ nut.goal }} {{ nut.unit }}</span>
            <span class="nut-actual" :class="{ 'text-green-600': nut.status === 'ok' }">{{ nut.actual }} {{ nut.unit }}</span>
            <span class="nut-status">
              <UIcon v-if="nut.status === 'ok'" name="i-heroicons-check-circle" class="text-green-600" />
            </span>
          </div>
        </div>
      </section>

      <!-- 3. AI Insights -->
      <section class="insights-section">
        <div class="ai-insights-card">
          <header class="card-header">
            <UIcon name="i-heroicons-sparkles" class="text-amber-500" />
            <span>INSIGHTS DO ASSISTENTE BOIA</span>
          </header>
          <ul class="insights-list space-y-2 mt-4">
            <li class="insight-item">
              <UIcon name="i-heroicons-check" />
              <span>A relação volumoso:concentrado está ideal para o ganho de peso pretendido.</span>
            </li>
            <li class="insight-item">
              <UIcon name="i-heroicons-light-bulb" />
              <span>Dica: Verifique a qualidade da silagem, pois ela representa 38% da dieta.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- 4. Secondary Actions -->
      <div class="export-actions flex gap-4">
        <UButton color="gray" variant="soft" icon="i-heroicons-printer" block>Imprimir PDF</UButton>
        <UButton color="gray" variant="soft" icon="i-heroicons-share" block>Compartilhar</UButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.step-results-fidelity {
  .mass-highlight {
    text-align: right;
    background-color: #1e293b;
    padding: 0.75rem 1.25rem;
    border-radius: 16px;
    color: white;

    .label {
      display: block;
      font-size: 0.65rem;
      font-weight: 800;
      color: #94a3b8;
      letter-spacing: 0.05em;
    }
    .value {
      font-size: 1.5rem;
      font-weight: 900;
      color: #22c55e;

      small { font-size: 0.8rem; color: #94a3b8; font-weight: 500; }
    }
  }

  .group-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
    margin-bottom: 0.75rem;
  }

  .comp-card {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name { font-weight: 800; font-size: 0.85rem; color: #1e293b; display: block; }
    .mn-val { font-size: 0.7rem; color: #64748b; font-weight: 600; }

    .comp-percentage {
      text-align: right;
      width: 80px;

      .val { font-weight: 900; font-size: 1rem; color: #16a34a; }
      .mini-bar {
        height: 4px;
        background-color: #e2e8f0;
        border-radius: 2px;
        margin-top: 0.25rem;
        overflow: hidden;
        .fill { height: 100%; background-color: #22c55e; }
      }
    }
  }

  .nutritional-table {
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    overflow: hidden;

    .table-header {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 0.5fr;
      padding: 0.75rem 1rem;
      background-color: #f1f5f9;
      font-size: 0.7rem;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
    }

    .table-row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 0.5fr;
      padding: 1rem;
      border-bottom: 1px solid #f1f5f9;
      font-size: 0.85rem;
      align-items: center;

      &:last-child { border-bottom: none; }

      .nut-name { font-weight: 700; color: #334155; }
      .nut-goal { color: #64748b; }
      .nut-actual { font-weight: 800; }
    }
  }

  .ai-insights-card {
    background-color: #fffbeb;
    border: 1px solid #fef3c7;
    border-radius: 20px;
    padding: 1.5rem;

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 900;
      font-size: 0.75rem;
      color: #92400e;
      letter-spacing: 0.05em;
    }

    .insight-item {
      display: flex;
      gap: 0.75rem;
      font-size: 0.85rem;
      color: #92400e;
      font-weight: 500;
      line-height: 1.4;

      .icon { margin-top: 0.15rem; flex-shrink: 0; }
    }
  }
}
</style>
