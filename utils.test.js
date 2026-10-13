// Funções de validação e formatação
function validarCidade(cidade) {
  if (!cidade || cidade.trim() === "") return false;
  return true;
}

function formatarNomeCidade(nome) {
  if (!nome) return "";
  return nome.trim().toUpperCase();
}

function ehTemperaturaValida(temp) {
  return typeof temp === 'number' && !isNaN(temp);
}

// 3 Testes Automatizados exigidos pela Etapa 3
test("1. Rejeita nome de cidade vazio", () => {
  expect(validarCidade("")).toBe(false);
});

test("2. Formata nome da cidade em maiúsculas", () => {
  expect(formatarNomeCidade("são paulo")).toBe("SÃO PAULO");
});

test("3. Valida se a temperatura é um número", () => {
  expect(ehTemperaturaValida(25)).toBe(true);
});