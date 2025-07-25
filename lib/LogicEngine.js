export async function evaluateLead(form1, form2) {
  const res = await fetch('/api/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scopeOfWork: form2.scopeOfWork }),
  });

  const data = await res.json();
  const aiScore = data.score;

  const zip = form1.locationZone || '';
  const ownsProperty = form2.ownership === 'own';
  const budget = form1.budgetRange;
  const timeline = form2.timeline;

  let leadType = 'Bad Lead';

  if (
    ['coral_gables', 'miami_beach'].includes(zip) &&
    ownsProperty &&
    ['150k_400k', 'over_400k'].includes(budget) &&
    ['0_2_months', '2_6_months'].includes(timeline) &&
    aiScore > 7
  ) {
    leadType = 'Great Lead';
  } else if (
    ['coconut_grove', 'north_miami'].includes(zip) &&
    ['50k_150k', '150k_400k'].includes(budget) &&
    ownsProperty &&
    aiScore >= 5 &&
    aiScore <= 7
  ) {
    leadType = 'OK Lead';
  } else if (
    zip === 'other' &&
    budget === 'under_50k' &&
    aiScore >= 3 &&
    aiScore < 5
  ) {
    leadType = 'Delegate';
  } else if (
    zip === 'other' &&
    !form2.address &&
    budget === 'under_50k' &&
    aiScore < 3
  ) {
    leadType = 'Bad Lead';
  }

  return { score: aiScore, leadType };
}
