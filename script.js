// Configuração do Supabase
const SUPABASE_URL = "https://oeckyjkklkioerzqzqm.supabase.co";
const SUPABASE_KEY = "sb_publishable_7K5Nq7AhHgcqrjGovbgf9Q_Tyz-aBYz";

const _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let cidadeAtual = "";
let climaAtual = "";

// Função para buscar o clima da cidade
async function buscarDados(cidade) {
  const area = document.getElementById("resultado");
  area.innerHTML = "<p>Carregando...</p>";

  try {
    const urlGeo = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;
    const respGeo = await fetch(urlGeo);
    const dadosGeo = await respGeo.json();

    if (!dadosGeo.results || dadosGeo.results.length === 0) {
      area.innerHTML = "<p class='erro'>⚠️ Cidade não encontrada. Tente novamente.</p>";
      return;
    }

    const { latitude, longitude, name, country } = dadosGeo.results[0];
    const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const respClima = await fetch(urlClima);
    const dadosClima = await respClima.json();
    const clima = dadosClima.current_weather;

    area.innerHTML = `
      <h2>${name}, ${country}</h2>
      <div class="temp-principal">${clima.temperature}°C</div>
      <p><strong>Vento:</strong> ${clima.windspeed} km/h</p>
      <p><strong>Direção do Vento:</strong> ${clima.winddirection}°</p>
    `;

    // Atualiza variaveis da cidade buscada
    cidadeAtual = name;
    climaAtual = `${clima.temperature}°C - Vento: ${clima.windspeed} km/h`;

    // Exibe o botao favoritar
    const btnFavoritar = document.getElementById('btn-favoritar');
    if (btnFavoritar) btnFavoritar.style.display = 'inline-block';

  } catch (erro) {
    area.innerHTML = "<p class='erro'>⚠️ Erro ao buscar os dados da cidade.</p>";
  }
}

// Funções para falar com o Supabase
async function listarFavoritos() {
  const { data, error } = await _supabase
    .from('favoritos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Erro ao listar favoritos:", error);
    return;
  }

  const listaEl = document.getElementById('lista-favoritos');
  if (!listaEl) return;
  listaEl.innerHTML = '';

  data.forEach(item => {
    const li = document.createElement('li');
    li.style.margin = "8px 0";
    li.innerHTML = `
      <strong>${item.nome_item}</strong> (${item.dados_extra || 'Sem dados'})
      <button onclick="removerFavorito(${item.id})" style="margin-left: 10px; color: red;">Excluir</button>
    `;
    listaEl.appendChild(li);
  });
}

async function salvarFavorito() {
  if (!cidadeAtual) return;

  const { error } = await _supabase
    .from('favoritos')
    .insert([{ nome_item: cidadeAtual, dados_extra: climaAtual }]);

  if (error) {
    alert("Erro ao favoritar: " + error.message);
  } else {
    listarFavoritos();
  }
}

window.removerFavorito = async function(id) {
  const { error } = await _supabase
    .from('favoritos')
    .delete()
    .eq('id', id);

  if (error) {
    alert("Erro ao remover: " + error.message);
  } else {
    listarFavoritos();
  }
};

// Eventos dos botoes
document.getElementById('botao-buscar').addEventListener('click', () => {
  const termo = document.getElementById('campo-busca').value.trim();
  if (termo) buscarDados(termo);
});

document.getElementById('btn-favoritar').addEventListener('click', salvarFavorito);

// Carrega a lista quando a pagina abre
window.addEventListener('DOMContentLoaded', listarFavoritos);