async function buscarDados(cidade) {
  const area = document.getElementById("resultado");
  area.innerHTML = "<p>Carregando clima...</p>";

  try {
    // 1. Busca latitude e longitude da cidade
    const urlGeo = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;
    const respGeo = await fetch(urlGeo);
    const dadosGeo = await respGeo.json();

    if (!dadosGeo.results || dadosGeo.results.length === 0) {
      throw new Error("Cidade não encontrada");
    }

    const { latitude, longitude, name, country } = dadosGeo.results[0];

    // 2. Busca o clima atual usando as coordenadas
    const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const respClima = await fetch(urlClima);
    const dadosClima = await respClima.json();

    const clima = dadosClima.current_weather;

    // 3. Exibe as informações (Cumpre os requisitos de no mínimo 3 informações exibidas)
    area.innerHTML = `
      <h2>${name}, ${country}</h2>
      <div class="temp-principal">${clima.temperature}°C</div>
      <p><strong>Vento:</strong> ${clima.windspeed} km/h</p>
      <p><strong>Direção do Vento:</strong> ${clima.winddirection}°</p>
    `;
    // Ativa o botão de favoritar no Supabase para esta cidade
 // Ativa o botão de favoritar no Supabase para esta cidade
if (window.atualizarCidadeAtual) {
  window.atualizarCidadeAtual(name, `${clima.temperature}°C - Vento: ${clima.windspeed} km/h`);
}
  } catch (erro) {
    // Tratamento de erro amigável
    area.innerHTML = "<p class='erro'>⚠️️ Cidade não encontrada. Tente digitar novamente.</p>";
  }
}

document.getElementById("botao-buscar").addEventListener("click", () => {
  const termo = document.getElementById("campo-busca").value.trim();
  if (termo) {
    buscarDados(termo);
  }
});