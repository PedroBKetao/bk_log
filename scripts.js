document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.includes("formulario.html")) {
    // Se estiver na página de formulário, carrega os dados do localStorage
    carregarLista();
  }
});

function toggleTheme() {
  const body = document.getElementById('body');
  const toggleButton = document.getElementById('toggleTheme');

  if (body.classList.contains('dark')) {
    // Se o tema atual for escuro, muda para claro
    body.classList.remove('dark');
    toggleButton.textContent = 'Escuro';
  } else {
    // Se o tema atual for claro, muda para escuro
    body.classList.add('dark');
    toggleButton.textContent = 'Claro';
  }
}

// Restante do seu código...
document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.includes("formulario.html")) {
    // Se estiver na página de formulário, carrega os dados do localStorage
    carregarLista();
  }
});

function adicionarAbastecimento() {
  // Obter os valores dos campos do formulário
  const data = document.getElementById('data').value;
  const cavalo = document.getElementById('cavalo').value;
  const kmAnterior = parseFloat(document.getElementById('kmAnterior').value);
  const kmAtual = parseFloat(document.getElementById('kmAtual').value);

  // Verificar se todos os campos obrigatórios foram preenchidos
  if (!data || !cavalo || isNaN(kmAnterior) || isNaN(kmAtual)) {
    exibirMensagemErro('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // Calcular a diferença entre "Km atual" e "Km anterior"
  const kmRodado = kmAtual - kmAnterior;

  // Adicione os campos adicionais conforme necessário

  // Criar um objeto com os dados do abastecimento
  const abastecimento = {
    "Data": data,
    "Cavalo": cavalo,
    "Km anterior": kmAnterior,
    "Km atual": kmAtual,
    "Km rodado": kmRodado,
    // Adicione outros campos conforme necessário
  };

  // Verificar se já existem dados no localStorage
  let abastecimentosLocalStorage = localStorage.getItem('abastecimentos');
  abastecimentosLocalStorage = abastecimentosLocalStorage ? JSON.parse(abastecimentosLocalStorage) : [];

  // Adicionar o novo abastecimento à lista
  abastecimentosLocalStorage.push(abastecimento);

  // Armazenar a lista atualizada no localStorage
  localStorage.setItem('abastecimentos', JSON.stringify(abastecimentosLocalStorage));

  // Limpar o formulário após adicionar o abastecimento
  limparFormulario();

  // Exibir mensagem de sucesso
  exibirMensagemSucesso('Parabéns, seus dados foram incluídos com sucesso!');

  // Recarregar a lista na página lista.html
  if (window.location.pathname.includes("formulario.html")) {
    carregarLista();
  }
}

function limparFormulario() {
  // Limpar os valores dos campos do formulário
  document.getElementById('data').value = '';
  document.getElementById('cavalo').value = '';
  document.getElementById('kmAnterior').value = '';
  document.getElementById('kmAtual').value = '';
  // Limpar outros campos conforme necessário
}

function carregarLista() {
  // Obter a tabela na página lista.html
  const table = document.getElementById('abastecimentoTable');

  // Verificar se a tabela está presente
  if (!table) {
    console.error('Elemento com ID "abastecimentoTable" não encontrado na página.');
    return;
  }

  // Limpar a tabela antes de adicionar os dados
  table.innerHTML = '';

  // Obter os dados do localStorage
  let abastecimentosLocalStorage = localStorage.getItem('abastecimentos');
  abastecimentosLocalStorage = abastecimentosLocalStorage ? JSON.parse(abastecimentosLocalStorage) : [];

  // Verificar se há dados no localStorage
  if (abastecimentosLocalStorage.length === 0) {
    console.log('Nenhum dado encontrado no localStorage');
    return;
  }

  // Cabeçalho da tabela
  const headerRow = table.insertRow(0);
  const campos = [
    "Data", "Cavalo", "Km anterior", "Km atual", "Km rodado",
    // Adicione outros campos conforme necessário
  ];

  campos.forEach((campo) => {
    const th = document.createElement('th');
    th.textContent = campo;
    headerRow.appendChild(th);
  });

  // Adicionar as linhas com os dados
  abastecimentosLocalStorage.forEach((abastecimento) => {
    const tr = table.insertRow();
    campos.forEach((campo) => {
      const cell = tr.insertCell();
      cell.textContent = abastecimento[campo] || ''; // Se o campo estiver vazio, exibe uma string vazia
    });
  });

  console.log('Lista carregada com sucesso:', abastecimentosLocalStorage);
}

// Função para exibir mensagem de sucesso (pode personalizar conforme necessário)
function exibirMensagemSucesso(mensagem) {
  alert(mensagem);
}

// Função para exibir mensagem de erro (pode personalizar conforme necessário)
function exibirMensagemErro(mensagem) {
  alert('Erro: ' + mensagem);
}

// Função para filtrar a lista por Cavalo
function filtrarPorCavalo() {
  const filtroCavalo = document.getElementById('filtroCavalo').value.toUpperCase();
  const table = document.getElementById('abastecimentoTable');
  const rows = table.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    const cavaloCell = rows[i].getElementsByTagName('td')[1]; // Assumindo que a coluna "Cavalo" está na posição 1
    if (cavaloCell) {
      const cavaloText = cavaloCell.textContent || cavaloCell.innerText;
      if (cavaloText.toUpperCase().indexOf(filtroCavalo) > -1) {
        rows[i].style.display = '';
      } else {
        rows[i].style.display = 'none';
      }
    }
  }
}
