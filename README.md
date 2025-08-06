# 🧙‍♂️ RPG Character Sheet - Electron + Next.js

Este projeto é um gerador de fichas de RPG aleatórias que roda como um **aplicativo de desktop**, criado com **Electron, Next.js e Tailwind CSS**.

Foi desenvolvido para fins didáticos e apresentado em um workshop para estudantes de Engenharia de Software, com o objetivo de demonstrar como transformar aplicações web em apps desktop com Electron.

## 🎯 Funcionalidades

- Geração aleatória de personagens de RPG (nome, raça, classe, atributos)
- Interface moderna com Next.js + Tailwind
- Salvamento de fichas localmente no disco (.json)
- Comunicação segura entre frontend e Electron via preload (contextBridge + IPC)

## 🛠️ Tecnologias utilizadas

- [Electron](https://www.electronjs.org/) – para criar o app desktop
- [Next.js](https://nextjs.org/) – para a interface React
- [Tailwind CSS](https://tailwindcss.com/) – para estilização
- [Node.js](https://nodejs.org/) – para manipulação de arquivos locais
- `ipcMain`, `dialog` e `fs` – para salvar arquivos localmente com Electron

## 🚀 Como executar

```bash
npm install
npm run dev
```

O Electron abrirá automaticamente a interface gerada pelo Next.js.

## 📦 Como empacotar

```bash
npm run build
```

```bash
npm run build-electron
```



O app será empacotado para distribuição como executável.

## 🧩 Possibilidades de extensão

- Listar fichas salvas na interface
- Exportar para PDF
- Tema escuro
- Suporte a múltiplos idiomas
- Compartilhar ficha (copiar para área de transferência)

---

Feito por Fernando Oliveira no Workshop "Exportando Apps Web com Electron".
