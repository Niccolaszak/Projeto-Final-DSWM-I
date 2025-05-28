# Estante Mágica - Livraria Online

Este é um projeto de livraria online desenvolvido como trabalho final para a disciplina de Desenvolvimento de Sistemas Web e Mobile I. O site permite a navegação por um catálogo de livros, visualização de detalhes, adição de itens ao carrinho e simulação de finalização de compra.

## Funcionalidades

- **Catálogo de Livros:** Navegue por livros de diferentes gêneros (Ficção, Romance, Aventura, Fantasia, Suspense, Terror).
- **Busca por Categorias:** Acesse rapidamente livros por categoria através da barra de navegação.
- **Carrossel Responsivo:** Destaques de livros na página inicial com carrossel adaptável a qualquer tela.
- **Detalhes do Livro:** Veja informações detalhadas, autor, preço, descrição e imagem de cada livro.
- **Carrinho de Compras:** Adicione livros ao carrinho, ajuste quantidades, remova itens e veja o valor total.
- **Finalização de Compra:** Simulação de finalização de compra com resumo dos itens.
- **Design Responsivo:** Layout adaptado para desktop e dispositivos móveis.
- **Estilização Moderna:** Utilização de CSS moderno, sombras, bordas arredondadas e fontes Google Fonts.
- **Programação Assíncrona:** O catálogo de livros é carregado dinamicamente via `fetch` de um arquivo JSON.

## Estrutura de Pastas

```
Projeto-Final-DSWM-I/
│
├── imagens/                # Imagens dos livros, ícones e banners
├── style/                  # Arquivos de estilos CSS
├── js/                     # Scripts JavaScript
├── livros.json             # Catálogo de livros em formato JSON
├── index.html              # Página inicial com carrossel e destaques
├── livros.html             # Catálogo geral de livros
├── TelaDeVenda.html        # Página de detalhes do livro
├── carrinho.html           # Carrinho de compras
├── finalizarcompra.html    # Página de finalização de compra
├── livrosFiccao.html       # Página de livros de Ficção
├── livrosRomance.html      # Página de livros de Romance
├── livrosAventura.html     # Página de livros de Aventura
├── livrosFantasia.html     # Página de livros de Fantasia
├── livrosSuspense.html     # Página de livros de Suspense
├── livrosTerror.html       # Página de livros de Terror
└── ...
```

## Como Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Niccolaszak/Projeto-Final-DSWM-I.git
   ```
2. **Abra a pasta no VS Code ou outro editor.**
3. **Execute localmente:**
   - **Importante:** Para que o carregamento dos livros funcione corretamente (por causa do `fetch`), utilize um servidor local. Exemplos:
     - Com Python 3:
       ```bash
       python -m http.server
       ```
     - Com Node.js (http-server):
       ```bash
       npx http-server .
       ```
   - Acesse `http://localhost:8000` (ou a porta indicada) no navegador.
   - Navegue pelas páginas normalmente.

## Nota Importante

> **Recomendação:** Para facilitar a visualização e o desenvolvimento do projeto, recomenda-se utilizar a extensão **Live Server** do Visual Studio Code.  
> Com ela instalada, basta clicar com o botão direito no arquivo `index.html` e selecionar **"Open with Live Server"** para rodar o site em um servidor local automaticamente, sem precisar digitar comandos no terminal.
>
> Isso garante que o carregamento assíncrono dos livros (`fetch` do `livros.json`) funcione corretamente em todos os navegadores.

## Tecnologias Utilizadas

- **HTML5**
- **CSS3** (responsivo, flexbox, media queries)
- **JavaScript** (puro, sem frameworks)
- **Google Fonts**

## Observações

- O carrinho utiliza `localStorage` para persistência dos itens enquanto o navegador estiver aberto.
- O site é totalmente estático, não requer backend.
- Imagens e dados dos livros são fictícios e para fins educacionais.
- O catálogo de livros é carregado de forma assíncrona via `fetch` do arquivo `livros.json`.

## Desenvolvimento

- Desenvolvido por:
  - **Nicolas Miguel Uczak**  
    Email: nicolasmiuczak@gmail.com  
    Github: [@Niccolaszak](https://github.com/Niccolaszak)
  - **Alisson Eraldo Da Silva**  
    Email: alissoneraldo02102@gmail.com  
    Github: [@AlissonnSilva](https://github.com/AlissonnSilva)
  - **Vinicius Gabriel Buskievicz**  
    Email: viniciusbuskievicz01@gmail.com  
    Github: [@ViniciusBuskievicz](https://github.com/ViniciusBuskievicz)

Para a disciplina DSWM I.

---

**Sinta-se à vontade para contribuir, sugerir melhorias ou utilizar este projeto como base para outros trabalhos!**
