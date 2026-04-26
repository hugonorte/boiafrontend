<script setup lang="ts">
/**
 * Step 2: Exigências Nutricionais
 * High-fidelity replication from Stitch Design
 */

const { state } = useWizardState()
const { calculateCMS } = useCalculations()

const objectives = [
  { id: 'Manutenção', title: 'Manutenção', icon: 'i-heroicons-home', description: 'Manter o peso atual sem ganho.' },
  { id: 'Crescimento', title: 'Crescimento', icon: 'i-heroicons-chart-bar', description: 'Ganho de peso moderado para animais jovens.' },
  { id: 'Engorda', title: 'Engorda', icon: 'i-heroicons-fire', description: 'Ganho rápido para terminação.' },
  { id: 'Reprodução', title: 'Reprodução', icon: 'i-heroicons-heart', description: 'Foco em fertilidade e saúde reprodutiva.' }
]

const cmsResult = computed(() => {
  const percentage = state.value.step1.cmsPercentage === 0
    ? (state.value.step1.cmsCustomValue || 0)
    : state.value.step1.cmsPercentage
  return calculateCMS(state.value.step1.liveWeight, percentage)
})

const selectObjective = (id: string) => {
  state.value.step2.dietObjective = id
}
</script>

<template>
  <div class="step-requirements-fidelity">
    <!-- Summary Header -->
    <header class="step-header mb-8">
      <div class="summary-pill mb-4">
        <span class="label">ANIMAL:</span>
        <span class="value">{{ state.step1.animalRace }} | {{ state.step1.liveWeight }}kg | CMS: {{ cmsResult.toFixed(1) }}kg</span>
      </div>
      <h2 class="title">
        Exigências Nutricionais
      </h2>
      <p class="subtitle">
        Defina o objetivo da dieta para estabelecer os níveis ideais.
      </p>
    </header>

    <div class="form-container space-y-8">
      <!-- 1. Objective Grid -->
      <section class="form-group">
        <label class="group-label">Objetivo da Dieta</label>
        <div class="objective-grid">
          <div
            v-for="obj in objectives"
            :key="obj.id"
            class="objective-card"
            :class="{ active: state.step2.dietObjective === obj.id }"
            @click="selectObjective(obj.id)"
          >
            <div class="card-icon">
              <UIcon :name="obj.icon" />
            </div>
            <div class="card-text">
              <h3 class="card-title">{{ obj.title }}</h3>
              <p class="card-desc">{{ obj.description }}</p>
            </div>
            <div v-if="state.step2.dietObjective === obj.id" class="check-icon">
              <UIcon name="i-heroicons-check-circle" />
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Nutritional Sliders/Inputs -->
      <section class="form-group">
        <div class="nutritional-controls grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="control-item">
            <div class="control-header">
              <label class="group-label">Proteína Bruta (PB %)</label>
              <span class="control-value">{{ state.step2.pb }}%</span>
            </div>
            <URange v-model="state.step2.pb" :min="5" :max="25" color="primary" />
          </div>

          <div class="control-item">
            <div class="control-header">
              <label class="group-label">Energia (NDT %)</label>
              <span class="control-value">{{ state.step2.ndt }}%</span>
            </div>
            <URange v-model="state.step2.ndt" :min="40" :max="90" color="primary" />
          </div>

          <div class="control-item">
            <div class="control-header">
              <label class="group-label">FDA (%)</label>
              <span class="control-value">{{ state.step2.fda }}%</span>
            </div>
            <UInput v-model="state.step2.fda" type="number" size="lg" class="mt-2" />
          </div>

          <div class="control-item">
            <div class="control-header">
              <label class="group-label">FDN (%)</label>
              <span class="control-value">{{ state.step2.fdn }}%</span>
            </div>
            <UInput v-model="state.step2.fdn" type="number" size="lg" class="mt-2" />
          </div>
        </div>
      </section>

      <!-- 3. Reference Table -->
      <section class="reference-section mt-8">
        <div class="ref-table-card">
          <header class="ref-header">
            <UIcon name="i-heroicons-table-cells" />
            <span>TABELA DE REFERÊNCIA (NRC)</span>
          </header>
          <div class="ref-body">
            <div class="ref-row header">
              <span>Fase</span>
              <span>PB %</span>
              <span>NDT %</span>
            </div>
            <div class="ref-row">
              <span>Recria</span>
              <span>14-16%</span>
              <span>68-72%</span>
            </div>
            <div class="ref-row">
              <span>Terminação</span>
              <span>12-14%</span>
              <span>75-82%</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
.step-requirements-fidelity {
  .summary-pill {
    display: inline-flex;
    gap: 0.5rem;
    background-color: #f1f5f9;
    padding: 0.5rem 1rem;
    border-radius: 99px;
    font-size: 0.75rem;
    font-weight: 700;

    .label { color: #64748b; }
    .value { color: #1e293b; }
  }

  .title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }
  .subtitle {
    color: #64748b;
    font-size: 0.95rem;
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

  .objective-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }

    .objective-card {
      background-color: white;
      border: 2px solid #f1f5f9;
      border-radius: 16px;
      padding: 1.25rem;
      cursor: pointer;
      display: flex;
      gap: 1rem;
      align-items: center;
      position: relative;
      transition: all 0.2s ease;

      &:hover {
        border-color: #e2e8f0;
        background-color: #f8fafc;
      }

      &.active {
        border-color: #22c55e;
        background-color: rgba(34, 197, 94, 0.05);

        .card-icon {
          background-color: #22c55e;
          color: white;
        }
      }

      .card-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background-color: #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: #64748b;
        flex-shrink: 0;
      }

      .card-title {
        font-weight: 800;
        font-size: 0.9rem;
        color: #1e293b;
      }

      .card-desc {
        font-size: 0.75rem;
        color: #64748b;
        margin-top: 0.15rem;
      }

      .check-icon {
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: #22c55e;
        font-size: 1.25rem;
      }
    }
  }

  .nutritional-controls {
    .control-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;

      .control-value {
        font-weight: 900;
        color: #16a34a;
        font-size: 1.1rem;
      }
    }
  }

  .ref-table-card {
    background-color: #f8fafc;
    border-radius: 16px;
    padding: 1rem;
    border: 1px solid #e2e8f0;

    .ref-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 800;
      font-size: 0.7rem;
      color: #64748b;
      margin-bottom: 1rem;
      letter-spacing: 0.05em;
    }

    .ref-body {
      .ref-row {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        padding: 0.5rem 0;
        font-size: 0.8rem;
        border-bottom: 1px solid #f1f5f9;

        &:last-child { border-bottom: none; }

        &.header {
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          font-size: 0.65rem;
        }

        span { color: #334155; }
      }
    }
  }
}
</style>
