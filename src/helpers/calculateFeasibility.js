export const calculateFeasibility = (dayData = [], dailyNorma) => {
  if (!dayData || dayData.length === 0) return 0;

  let totalValue = 0;
  dayData.forEach(record => {
    totalValue += record.amount;
  });

  const userWaterRate = Number(dailyNorma) * 1000;

  if (totalValue >= userWaterRate) return 100;

  const feasibility = (totalValue / userWaterRate) * 100;

  return Math.round(feasibility);
};
