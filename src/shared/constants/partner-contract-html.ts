import type { GenerateContractProps } from "../../application/contracts/services/contract";

export const PARTNER_CONTRACT_PDF = (props: GenerateContractProps) => `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Contrato de Prestação de Serviços - Hubeleza</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 40px;
          max-width: 900px;
        }
        h1, h2, h3 {
          color: #1B67AD;
        }
        hr {
          border: none;
          border-top: 1px solid #ccc;
          margin: 30px 0;
        }
        strong {
          color: #000;
        }
      </style>
    </head>
    <body>

      <h1>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h1>
      <h2>PLATAFORMA HUBELEZA</h2>

      <p>Pelo presente instrumento particular, de um lado:</p>

      <p>
        <strong>AGENCIA DO LEO PUBLICIDADE E MARKETING LTDA</strong>, pessoa jurídica inscrita no CNPJ sob o nº 54.842.684/0001-06, estabelecida na Rua Coronel Sodré 600 sobreloja, Centro, Vila Velha – ES, CEP: 29100-080, atuante como plataforma de divulgação digital de serviços estéticos denominada HUBELEZA, doravante denominada <strong>CONTRATADA</strong>;
      </p>

      <p>
        E, de outro lado, ${props.client_name}, CPF nº ${props.cpf}, residente em ${props.city}, ${props.state}, responsável pela empresa ${props.company_name}, doravante denominada <strong>CONTRATANTE</strong>;
      </p>

      <p>Têm entre si, justo e contratado, o seguinte:</p>

      <hr>

      <h3>CLÁUSULA 1 – OBJETO</h3>
      <p>1.1. O presente contrato tem por objeto a disponibilização, pela CONTRATADA, de uma plataforma online de divulgação de serviços estéticos, via anúncios patrocinados e orgânicos, para captação de leads (potenciais clientes), os quais serão repassados à CONTRATANTE mediante validação de interesse e geolocalização.</p>
      <p>1.2. A Hubeleza não realiza vendas diretas, apenas atua como intermediadora na geração de leads qualificados, sendo a negociação final e a prestação do serviço integralmente de responsabilidade da CONTRATANTE.</p>

      <hr>

      <h3>CLÁUSULA 2 – PREÇO DOS SERVIÇOS DIVULGADOS</h3>
      <p>2.1. Fica terminantemente proibido à CONTRATANTE alterar, por qualquer meio (verbal, escrito ou digital), o valor do serviço ofertado nos anúncios veiculados pela Hubeleza, seja no atendimento ao lead ou em qualquer comunicação.</p>
      <p>2.2. O valor anunciado deverá ser integralmente honrado pela CONTRATANTE, conforme exibido na campanha ativa na plataforma.</p>
      <p>2.3. O descumprimento desta cláusula implicará em rescisão imediata do contrato, sem necessidade de aviso prévio, e aplicação de multa no valor correspondente a 20 (vinte) salários mínimos vigentes, independentemente de perdas e danos.</p>

      <hr>

      <h3>CLÁUSULA 2-A – FORMA DE CONTRATAÇÃO E ALTERAÇÃO DE PREÇOS DOS SERVIÇOS</h3>
      <p>2.A.1. A contratação dos serviços da Hubeleza será realizada mediante preenchimento de formulário eletrônico pela CONTRATANTE (...)</p>
      <p>2.A.2. Após o envio do formulário, o sistema da Hubeleza gerará um <strong>código PIX</strong> para pagamento da recarga inicial no valor de <strong>R$300,00</strong> (...) bônus adicional de <strong>R$300,00</strong> (...) saldo inicial de <strong>R$600,00</strong> (...)</p>
      <p>2.A.3. Após o pagamento, a Hubeleza disponibilizará este contrato no WhatsApp da CONTRATANTE (...) como <strong>ANEXO 1</strong>.</p>
      <p>2.A.4. Caso a CONTRATANTE não receba nenhum lead dentro de <strong>30 (trinta) dias</strong> (...) devolução integral de <strong>R$300,00</strong> (...) prazo máximo de <strong>10 (dez) dias úteis</strong>, via PIX.</p>
      <p>2.A.5 ao 2.A.7 (...)</p>

      <hr>

      <h3>CLÁUSULA 3 – ATIVAÇÃO E RECARGAS</h3>
      <p>3.1. O contrato é firmado por prazo indeterminado, sem fidelidade (...)</p>
      <p>3.2. Cada lead enviado será debitado <strong>R$15,00</strong> da carteira digital da CONTRATANTE.</p>
      <p>3.3. e 3.4 (...)</p>

      <hr>

      <h3>CLÁUSULA 4 – ACESSO E RELATÓRIOS</h3>
      <p>4.1. A CONTRATANTE terá acesso completo ao dashboard da plataforma (...) total transparência (...)</p>

      <hr>

      <h3>CLÁUSULA 5 – SUPORTE E ATENDIMENTO</h3>
      <p>5.1. A Hubeleza disponibiliza um Gerente de Contas (...) atendimento de segunda a sexta-feira, das 9h às 18h (...)</p>

      <hr>

      <h3>CLÁUSULA 6 – RESPONSABILIDADE DAS PARTES</h3>
      <p>6.1 a 6.3 (...)</p>

      <hr>

      <h3>CLÁUSULA 7 – ALTERAÇÕES DE PREÇOS E CONDIÇÕES</h3>
      <p>7.1 a 7.3 (...)</p>

      <hr>

      <h3>CLÁUSULA 8 – ACEITE DO CONTRATO</h3>
      <p>8.1. Este contrato é automaticamente aceito no momento em que a CONTRATANTE realiza o cadastro (...)</p>

      <p><strong>E, por estarem assim justas e contratadas, as partes consideram este instrumento válido e eficaz a partir do aceite digital e recarga inicial prevista.</strong></p>

      <hr>

      <h2>ANEXO 1 – SERVIÇOS ESCOLHIDOS E PREÇOS DECLARADOS PELA CONTRATANTE</h2>
      <p>Este anexo faz parte integrante do Contrato de Prestação de Serviços Hubeleza e conterá:</p>
      <ul>
        <li>Dados da CONTRATANTE (pessoais e da clínica) informados no formulário de adesão;</li>
        <li>Lista dos serviços selecionados pela CONTRATANTE;</li>
        <li>Preços praticados e declarados pela CONTRATANTE;</li>
        <li>Confirmação de aceite dos Termos de Uso e Política de Privacidade;</li>
        <li>Envio do contrato completo (com este anexo) para o WhatsApp da CONTRATANTE.</li>
      </ul>

    </body>
</html>
`