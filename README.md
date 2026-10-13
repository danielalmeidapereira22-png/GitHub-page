# ⛅ Painel do Clima — Etapa 03 (Projeto Final)

Aplicação web para consulta do clima em tempo real e gestão de cidades favoritas, integrada com **Supabase**, empacotada em **Docker** e com integração contínua (**GitHub Actions**).

---

## 👥 Integrantes do Time

| Nome | Usuário GitHub | Responsabilidade | Pull Request |
| :--- | :--- | :--- | :--- |
| **Daniel Almeida** | `@danielalmeidapereira22-png` | Frontend, Supabase, Docker, CI/CD e Testes | [PR #1](https://github.com/danielalmeidapereira22-png/GitHub-page/pull/1) |

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (Fetch API)
- **API Externa:** Open-Meteo API
- **Banco de Dados / Persistência:** Supabase (PostgreSQL)
- **Containerização:** Docker (Nginx/Alpine)
- **CI/CD:** GitHub Actions com Jest (`utils.test.js`)

---

## 🤖 Testes e Integração Contínua (CI)

O repositório está configurado com **GitHub Actions** em `.github/workflows/ci.yml`.  
A cada Pull Request para a branch `main`, 3 testes unitários automatizados em Jest são executados automaticamente:

1. `validarCidade`: Rejeita strings vazias ou nulas.
2. `formatarNomeCidade`: Converte o texto para maiúsculas.
3. `ehTemperaturaValida`: Confirma se o valor recebido é numérico.

---

## 🚀 Como Executar com Docker

Para baixar e rodar a imagem diretamente do Docker Hub:

```bash
docker run -d -p 8080:80 --name painel-clima danielalmeida22/bootcamp2-app:1.0