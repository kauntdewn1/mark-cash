const Web3 = require("web3");

// Altere para sua RPC se quiser — aqui usamos a da Sepolia
const provider = new Web3.providers.HttpProvider("https://rpc.sepolia.org");
const web3 = new Web3(provider);

// Endereço do contrato a verificar
const contrato = "0xe05e9222a5786dc234619be02c1686cb01581628"; // <- substitua se quiser

async function verificarContrato(address) {
  try {
    const code = await web3.eth.getCode(address);

    if (code && code !== "0x") {
      console.log("✅ Contrato válido encontrado!");
      console.log("Bytecode:", code.slice(0, 60) + "...");
    } else {
      console.log("❌ Nenhum contrato encontrado nesse endereço.");
    }
  } catch (err) {
    console.error("Erro ao verificar:", err.message);
  }
}

verificarContrato(contrato);
