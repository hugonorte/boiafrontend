export const useCalculations = () => {
  const calculateCMS = (weight: number, percentage: number) => {
    return (weight * percentage) / 100
  }

  const getCMSStatus = (percentage: number) => {
    if (percentage < 2.0) return { label: 'Consumo adequado', color: 'green' }
    if (percentage <= 2.2) return { label: 'Consumo moderado', color: 'yellow' }
    return { label: 'Consumo alto (alerta)', color: 'red' }
  }

  return {
    calculateCMS,
    getCMSStatus
  }
}
