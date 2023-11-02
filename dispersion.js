const form = document.getElementById('userData');
const mxOut = document.getElementById('mxEq');
const dxOut = document.getElementById('dxEq');
const sigmaxOut = document.getElementById('sigmaxEq');
const ctxPolygon = document.getElementById('polygon');
const ctxStairs = document.getElementById('stairs');
const ctxPie = document.getElementById('pie');
const ctxBar = document.getElementById('bar');
let count = 0;
let polychart, stairsChart, pieChart, barChart;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let mx = 0;
  let dx = 0;
  let sigmax = 0;
  let xi = form[0].value.split(',');
  let pi = form[1].value.split(',');
  pi = pi.map((e) => eval(e));
  console.log(pi);

  if (xi.length == pi.length) {
    for (let i = 0; i < xi.length; i++) {
      mx += xi[i] * pi[i];
    }

    for (let j = 0; j < xi.length; j++) {
      dx += Number(Math.pow(xi[j] - mx, 2)) * Number(pi[j]);
    }

    sigmax = Math.sqrt(dx);
    mxOut.textContent = mx.toPrecision(5);
    dxOut.textContent = dx.toPrecision(5);
    sigmaxOut.textContent = sigmax.toPrecision(5);
    increment();
    drawPolygon(pi);
    drawStairs(pi);
    drawPie(pi);
    drawBar(pi);
  }
});

function drawPolygon(pi) {
  if (count > 1) {
    polyChart.destroy();
  }
  const chartLabels = form[0].value.split(',');
  polyChart = new Chart(ctxPolygon, {
    type: 'line',
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: 'Многоугольник',
          data: pi,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
    layout: {
      autoPadding: true,
    },
  });
}

function drawStairs(pi) {
  if (count > 1) {
    stairsChart.destroy();
  }
  const stairsData = [];
  const chartLabels = form[0].value.split(',');
  const sums = pi.reduce((a, b) => {
    stairsData.push(+a);
    return Number(a) + Number(b);
  });
  stairsData.push(sums, 1);
  stairsChart = new Chart(ctxStairs, {
    type: 'line',
    data: {
      labels: [...chartLabels, +chartLabels[chartLabels.length - 1] * 15],
      datasets: [
        {
          label: 'Ступеньки',
          data: [...stairsData, 1],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      elements: {
        line: {
          stepped: true,
        },
      },
    },
  });
}

function drawPie(pi) {
  if (count > 1) {
    pieChart.destroy();
  }
  const chartLabels = form[0].value.split(',');
  pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: 'Кружок',
          data: pi,
          borderWidth: 1,
        },
      ],
    },
    tooltip: {
      enabled: true,
    },
    layout: {
      autoPadding: true,
    },
  });
}

function drawBar(pi) {
  if (count > 1) {
    barChart.destroy();
  }
  const chartLabels = form[0].value.split(',');
  barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: 'Гистограмма',
          data: pi,
          barPercentage: 1.0,
          categoryPercentage: 1.0,
          borderWidth: 1,
        },
      ],
    },
    tooltip: {
      enabled: true,
    },
    layout: {
      autoPadding: true,
    },
  });
}

function increment() {
  ++count;
}
