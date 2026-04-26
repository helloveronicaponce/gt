# Como colocar o Gym Tracker no seu celular (PWA)

Este guia mostra como publicar o app no **GitHub Pages** (grátis, com HTTPS) e instalar no celular como aplicativo nativo.

---

## 1. Subir os arquivos para o GitHub

### Se você ainda não tem conta no GitHub
1. Cria em https://github.com/signup (é grátis).
2. Instala o app **GitHub Desktop** (https://desktop.github.com/) — é o jeito mais fácil, sem mexer com linha de comando.

### Criar o repositório

**Pelo site do GitHub:**
1. Entra em https://github.com/new
2. **Repository name:** `gym-tracker` (ou o nome que preferir)
3. Marca **Public** (precisa ser público no plano grátis)
4. **NÃO** marca nenhuma das caixas de "Initialize with README/gitignore/license"
5. Clica em **Create repository**

### Enviar os arquivos

**Caminho mais simples (sem terminal):**
1. No repositório recém-criado, clica em **"uploading an existing file"** (aparece na página inicial vazia do repo).
2. Arrasta **TODOS** os arquivos desta pasta (`gt/`) para a área de upload:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
   - `apple-touch-icon.png`
   - `favicon.png`
   - `.nojekyll` ← **muito importante** (arquivo oculto; se o Windows estiver escondendo arquivos ocultos, habilita a opção "Exibir arquivos ocultos" no Explorador)
3. No campo de commit lá embaixo, escreve `deploy inicial` e clica em **Commit changes**.

---

## 2. Ativar o GitHub Pages

1. No repositório, vai em **Settings** (menu de cima, à direita).
2. No menu lateral esquerdo, clica em **Pages**.
3. Em **Source**, escolhe:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. Clica em **Save**.
5. Espera 1-2 minutos. A URL do seu app vai aparecer no topo da página — algo como:

   ```
   https://SEU-USUARIO.github.io/gym-tracker/
   ```

---

## 3. Instalar no celular

### No Android (Chrome)
1. Abre a URL do app no Chrome.
2. Toca no menu (⋮) no canto superior direito.
3. Toca em **Instalar app** ou **Adicionar à tela inicial**.
4. Pronto — o ícone do halter rosa aparece na sua tela inicial e abre em tela cheia, igual um app nativo.

### No iPhone (Safari — obrigatório, não funciona no Chrome do iOS)
1. Abre a URL do app no **Safari**.
2. Toca no botão de compartilhar (⬆ quadrado com seta para cima, na barra inferior).
3. Rola e toca em **Adicionar à Tela de Início**.
4. Confirma o nome (vem "Gym Tracker" por padrão) e toca em **Adicionar**.
5. O ícone aparece na tela inicial do iPhone.

---

## 4. Atualizações futuras

Quando você (ou o Claude) mexer no código:
1. Substitui os arquivos no repositório (pelo site do GitHub mesmo, na aba **Code** → clica no arquivo → lápis de editar, ou re-upload).
2. O GitHub Pages atualiza em 1-2 minutos.
3. No celular, o Service Worker (`sw-v2`) detecta versão nova automaticamente na próxima abertura do app.

Se quiser forçar atualização imediata no celular, é só fechar o app e abrir de novo com internet ligada.

---

## Dica: testar localmente antes

Se quiser ver funcionando no navegador do PC antes de subir:

```bash
cd gt
python -m http.server 8000
```

Abre `http://localhost:8000` no Chrome.
(Instalação de PWA não funciona em `file://` — tem que ser via servidor, mesmo que local.)

---

## Problema comum

**"O botão de instalar não aparece"**
- Confirma que a URL começa com `https://` (não `http://`).
- Confirma que o arquivo `.nojekyll` foi para o repo (sem ele o GitHub Pages ignora pastas/arquivos começando com `_`).
- Abre o DevTools do Chrome (F12) → aba **Application** → **Manifest** e **Service Workers** para ver se há erros.
