async function consulteCNPJ() {
  const cnpj = document.getElementById("cnpj").value.replace(/\D/g, "");
  const result = document.getElementById("result");

  if (cnpj.length !== 14) {
    result.innerHTML = `<div class="alert alert-danger fw-bold" role="alert">Por favor, insira um CNPJ válido!</div>`;
    return;
  }

  result.innerHTML = `
      <div class="text-center my-3">
         <div class="spinner-border text-primary" role="status">
         </div>
        <div class="mt-2">
          <i class="arrow-repeat fs-3 text-primary"></i>
        </div>
      </div>
    `;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = await fetch(
      `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`
    );
    if (!response.ok) throw new Error("CNPJ não encontrado.");
    const data = await response.json();

    result.innerHTML = `
        <form id="cnpjForm" style="background-color: #c1d1e0;
                    padding: 20px;
  border-radius: 10px;
  border: 1px solid #e0d6d6; margin-bottom: 100px;">
          <div class="mb-3">
            <label for="nome_fantasia" class="nome_fantasia"><strong>Nome</strong></label>
            <input type="text" class="form-control" id="nome_fantasia" value="${
              data.nome_fantasia
            }" />
          </div>

          <div class="mb-3">
            <label for="razao_social" class="form-label"><strong>Razão social</strong></label>
            <input type="text" class="form-control" id="razao_social" value="${
              data.razao_social
            }" />
            </div>

            <div class="mb-3">
            <label for="data_situacao_cadastral" class="form-label"><strong>Data de abertura</strong></label>
            <input type="text" class="form-control" id="data_situacao_cadastral" value="${
              data.data_situacao_cadastral
            }" />
            </div>

            <div class="mb-3">
            <label for="descricao_situacao_cadastral" class="form-label"><strong>Situação</strong></label>
            <input type="text" class="form-control" id="descricao_situacao_cadastral" value="${
              data.descricao_situacao_cadastral
            }" />
          </div>
            <div class="mb-3">
            <label for="cnae_fiscal_descricao" class="form-label"><strong>Atividade principal</strong></label>
            <input type="text" class="form-control" id="cnae_fiscal_descricao" value="${
              data.cnae_fiscal_descricao
            }" />
          </div>
          <div class="mb-3">
          <label for="endereco" class="form-label"><strong>Endereço</strong></label>
          <input type="text" class="form-control" id="endereco" value="${
            data.logradouro
          }, ${data.numero} - ${data.municipio}, ${data.uf}" />
            </div>
            <div class="mb-3">
            <label for="telefone" class="form-label"><strong>Telefone</strong></label>
            <input type="text" class="form-control" id="telefone" value="${
              data.telefone || "N/A"
            }" />
          </div>
            <div class="mb-3">
              <label for="email" class="form-label"><strong>Email</strong></label>
              <input type="email" class="form-control" id="email" value="${
                data.email || "N/A"
              }" />
            </div>
          <button type="button" class="btn btn-success fw-bold" onclick="saveData()">Salvar Alterações</button>
        </form>
      `;
  } catch (error) {
    console.log("error", error)
    result.innerHTML = `<div class="alert alert-danger" role="alert">${error.message}</div>`;
  }
}

function saveData() {
  const form = document.getElementById("cnpjForm");

  const nomeFantasia = form.nome_fantasia.value;
  const razaoSocial = form.razao_social.value;
  const dataCadastral = form.data_situacao_cadastral.value;
  const descricaoCadastral = form.descricao_situacao_cadastral.value;
  const endereco = form.endereco.value;
  const telefone = form.telefone.value;
  const email = form.email.value;
  const atividade = form.cnae_fiscal_descricao.value;

  const result = document.getElementById("result");

  result.innerHTML = `
      <div class="alert alert-success" role="alert">Dados editados com sucesso!</div>
      <div style="background-color: #c1d1e0;
                    padding: 20px;
  border-radius: 10px;
  border: 1px solid #e0d6d6; margin-bottom: 100px;">
      <h5>Nome: ${nomeFantasia}</h5>
      <p>Razão social: ${razaoSocial}</p>
      <p>Data de abertura: ${descricaoCadastral}</p>
      <p>Situação: ${dataCadastral}</p>
      <p><strong>Atividade Principal:</strong> ${atividade}</p>
      <p><strong>Endereço completo:</strong> ${endereco}</p>
      <p><strong>Telefone:</strong> ${telefone}</p>
      <p><strong>E-mail:</strong> ${email}</p>
    </div>
      `;
}
