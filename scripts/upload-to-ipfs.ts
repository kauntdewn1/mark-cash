require('dotenv').config({ path: '.env.local' });
const { Web3Storage } = require('web3.storage')
const fs = require('fs')
const path = require('path')

function getAccessToken(): string {
  const token = process.env.WEB3_STORAGE_TOKEN
  if (!token) throw new Error("⚠️ Token Web3.Storage não encontrado em WEB3_STORAGE_TOKEN")
  return token
}

function getFilesRecursive(dir: string): File[] {
  const files: File[] = []

  function walk(currentPath: string, basePath = dir) {
    const items = fs.readdirSync(currentPath)

    for (const item of items) {
      const fullPath = path.join(currentPath, item)
      const relativePath = path.relative(basePath, fullPath)

      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath, basePath)
      } else {
        const content = fs.readFileSync(fullPath)
        files.push(new File([content], relativePath))
      }
    }
  }

  walk(dir)
  return files
}

async function main() {
  const token = getAccessToken()
  const client = new Web3Storage({ token })

  console.log("📦 Lendo arquivos da pasta /out...")
  const files = getFilesRecursive('./out')

  console.log(`🚀 Enviando ${files.length} arquivos para IPFS via Web3.Storage...`)
  const cid = await client.upload(files, {
    name: 'mks-project',
    maxRetries: 3,
    wrapWithDirectory: false
  })

  console.log(`✅ Upload completo! CID: ${cid}`)
  console.log(`🌐 Gateway URL: https://${cid}.ipfs.w3s.link`)
  console.log(`🌍 ENS (após registro): https://markcash.eth.limo`)
}

main().catch((error) => {
  console.error("❌ Erro no upload:", error)
  process.exit(1)
})
