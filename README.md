# Portfólio de Arthur de Freitas

Portfólio de edição de vídeo em React, TypeScript e Vite. A direção de arte usa títulos Archivo, contraste em preto e branco e vermelho nos pontos de interação. As ilustrações em SVG são estudos gráficos criados para a interface.

## Rodar no computador

1. Instale o [Node.js 24 LTS](https://nodejs.org/). No Windows, reabra o terminal depois da instalação. Se o PowerShell bloquear o script `npm.ps1`, use `npm.cmd` nos comandos abaixo.
2. Entre na pasta que contém o `package.json`.
3. Execute:

   ```sh
   npm install
   npm run dev
   ```

4. Abra o endereço exibido pelo Vite. Para testar os arquivos de produção, rode `npm run build` e depois `npm run preview`.

## Atualizar o conteúdo

Adicione os arquivos de vídeo em `public/videos/` e as imagens em `public/images/`. Use nomes curtos, minúsculos e sem espaços. No cadastro, informe caminhos como `videos/arquivo.mp4`, sem o prefixo `public/`. URLs HTTPS de arquivos também são aceitas.

Em `src/data/projects.ts`, adicione um objeto a `projects` para cada edição real. Preencha `id` e `slug` únicos, `title`, `description`, `category` e `status`. A galeria gera os filtros a partir dos projetos visíveis. Use `draft` para ocultar, `preparing` para mostrar como em preparação ou `published` para liberar a reprodução ou o link.

- `thumbnail` aponta para a imagem da galeria. `year` é opcional. `tools` recebe apenas ferramentas confirmadas. `featured: true` coloca o projeto em destaque no início da galeria.
- `video` recebe `src` (MP4 ou WebM), `webm` opcional, `poster` para o quadro inicial e `captions` para legendas em WebVTT. Ao trocar o vídeo, mude esses caminhos.
- `externalUrl` pode apontar para o trabalho completo no YouTube, Vimeo ou outra página HTTPS. Para prévia ao passar o mouse, cadastre um arquivo de vídeo em `video`. Use MP4 H.264 como opção de ampla compatibilidade e exporte arquivos leves para a web.

Em `src/data/profile.ts`, adicione `photo` para o retrato real e `showreel` com os mesmos campos de `video`. Em `contacts`, configure `email` como o endereço profissional puro e `instagram`, `discord` ou `whatsapp` como URLs HTTPS autorizadas. Os canais configurados aparecem no contato e no rodapé.

As cores estão em `src/styles/site.css`. A imagem de compartilhamento fica em `public/images/share.png`. As fontes são empacotadas localmente no build.

## Publicar no GitHub Pages

1. Crie um repositório vazio no GitHub na conta em que o portfólio deverá aparecer. Um repositório público permite usar o Pages no GitHub Free.
2. Na raiz do projeto, inicialize o Git e faça o primeiro push. Substitua `USUARIO` e `REPOSITORIO` pelos valores reais.

   ```sh
   git init -b main
   git add .
   git commit -m "Publica a primeira versão do portfólio"
   git remote add origin https://github.com/USUARIO/REPOSITORIO.git
   git push -u origin main
   ```

3. No repositório, abra **Settings → Pages**. Em **Build and deployment → Source**, selecione **GitHub Actions**.
4. Em **Actions**, execute o workflow **Publicar no GitHub Pages** pela primeira vez com **Run workflow** na branch `main`, ou reexecute o primeiro build se ele rodou antes da configuração.
5. Localize a URL publicada em **Settings → Pages** ou no ambiente **github-pages** da execução concluída. Para um site de projeto, ela tem a forma `https://USUARIO.github.io/REPOSITORIO/`.
6. Para atualizar, faça commit das mudanças e execute `git push` para `main`. O workflow compila e publica `dist/` a cada push.

O workflow usa `base_path` e `base_url` do GitHub Pages para resolver os arquivos estáticos e gerar a URL canônica e a imagem Open Graph absoluta. Em outro ambiente, copie `.env.example` para `.env.local` e configure `VITE_BASE_PATH` (por exemplo, `/portfolio/`) e `VITE_SITE_URL` (a URL completa do site, incluindo o subdiretório). Execute o build novamente. A navegação usa âncoras.

[Documentação do GitHub Pages](https://docs.github.com/pt/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
