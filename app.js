
function calc() {
  const sal = parseFloat(document.getElementById('salary').value) || 0;
  const hrs = parseFloat(document.getElementById('hoursPerWk').value) || 40;
  const wks = parseFloat(document.getElementById('paidWeeks').value) || 52;
  const ot = parseFloat(document.getElementById('overtimeHrs').value) || 0;

  const totalAnnualHrs = hrs * wks;
  const hourly = totalAnnualHrs > 0 ? (sal / totalAnnualHrs) : 0;
  const otHourly = hourly * 1.5;

  const weeklyBase = hourly * hrs;
  const weeklyOT = otHourly * ot;
  const totalWeekly = weeklyBase + weeklyOT;

  const biweekly = totalWeekly * 2;
  const monthly = (sal / 12) + (weeklyOT * 4.333);
  const totalAnnualWithOT = sal + (weeklyOT * wks);

  // FICA tax 7.65% (Social Security 6.2% + Medicare 1.45%)
  const ficaDeductionMonthly = monthly * 0.0765;

  document.getElementById('hourlyRate').innerText = '$' + hourly.toFixed(2) + '/hr';
  document.getElementById('otRate').innerText = '$' + otHourly.toFixed(2) + '/hr';
  document.getElementById('biweeklyGross').innerText = '$' + Math.round(biweekly).toLocaleString();
  document.getElementById('monthlyGross').innerText = '$' + Math.round(monthly).toLocaleString();

  document.getElementById('salarySummary').innerHTML = 
    `A salary of <strong>$${sal.toLocaleString()}/yr</strong> corresponds to <strong>$${hourly.toFixed(2)}/hour</strong> for a standard ${hrs}-hour workweek.<br><br>` +
    `Working <strong>${ot} hours of weekly overtime</strong> at the time-and-a-half rate ($${otHourly.toFixed(2)}/hr) boosts your total annual earnings to <strong>$${Math.round(totalAnnualWithOT).toLocaleString()}</strong> (+${Math.round(weeklyOT * wks).toLocaleString()} in overtime). Approx Federal FICA deduction: ~$${Math.round(ficaDeductionMonthly)}/month.`;
}

['salary', 'hoursPerWk', 'paidWeeks', 'overtimeHrs'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    if (id === 'salary' && document.getElementById('salaryRange')) {
      document.getElementById('salaryRange').value = document.getElementById('salary').value;
    }
    calc();
  });
});

document.getElementById('salaryRange').addEventListener('input', (e) => {
  document.getElementById('salary').value = e.target.value;
  calc();
});

calc();
