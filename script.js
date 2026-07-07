// Acordeão do FAQ
document.querySelectorAll('.faq-item').forEach(function (item) {
  var question = item.querySelector('.faq-question');
  question.addEventListener('click', function () {
    var wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
      openItem.classList.remove('open');
    });
    if (!wasOpen) item.classList.add('open');
  });
});

// Calculadora - estimativa aproximada de recuperação do IR de 25%
// Tabela progressiva mensal (referência aproximada, vigente 2024/2025)
var FAIXAS = [
  { ate: 2259.20, aliquota: 0, deducao: 0 },
  { ate: 2826.65, aliquota: 0.075, deducao: 169.44 },
  { ate: 3751.05, aliquota: 0.15, deducao: 381.44 },
  { ate: 4664.68, aliquota: 0.225, deducao: 662.77 },
  { ate: Infinity, aliquota: 0.275, deducao: 896.00 }
];

function calcularImpostoProgressivo(valor) {
  for (var i = 0; i < FAIXAS.length; i++) {
    if (valor <= FAIXAS[i].ate) {
      var imposto = valor * FAIXAS[i].aliquota - FAIXAS[i].deducao;
      return Math.max(imposto, 0);
    }
  }
  return 0;
}

document.getElementById('calcularBtn').addEventListener('click', function () {
  var valor = parseFloat(document.getElementById('valorBeneficio').value);
  var anos = parseInt(document.getElementById('anosRecebendo').value, 10);
  var resultado = document.getElementById('resultado');

  if (!valor || valor <= 0) {
    alert('Preencha o valor bruto mensal da aposentadoria para calcular.');
    return;
  }

  var impostoRetido25 = valor * 0.25;
  var impostoProgressivo = calcularImpostoProgressivo(valor);
  var diferencaMensal = Math.max(impostoRetido25 - impostoProgressivo, 0);
  var totalEstimado = diferencaMensal * 12 * anos;

  document.getElementById('resAnos').textContent = anos;
  document.getElementById('resValor').textContent = totalEstimado.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  resultado.hidden = false;
  resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Formulário de contato (Netlify Forms, envio via AJAX)
var leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(leadForm);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString()
    })
      .then(function () {
        leadForm.hidden = true;
        document.getElementById('leadSuccess').hidden = false;
      })
      .catch(function () {
        alert('Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.');
      });
  });
}
