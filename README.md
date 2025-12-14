# 🕹️ RetroHub - Arcade Experience

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

**RetroHub** é uma plataforma web interativa que reúne três dos maiores clássicos da história dos videogames: **Snake**, **Asteroids** e **Tetris**. O projeto foi desenvolvido com foco em reviver a nostalgia dos anos 80 e 90, utilizando tecnologias web modernas para recriar a experiência arcade diretamente no navegador.

---

## 📋 Requisitos do Projeto

O site foi construído atendendo rigorosamente aos seguintes critérios estabelecidos:

- [x] Site desenvolvido com **HTML, CSS e JavaScript**.
- [x] Uso de **Bootstrap** para estilização, minimizando o uso de CSS manual.
- [x] Uso de manipulação do **DOM** com JavaScript.
- [x] Uso correto de tags semânticas: **hero (section), header, nav, footer, main, section**.
- [x] Site com **layout responsivo** (adaptável a celulares e computadores).
- [x] **Botões interativos** que realizam ações de navegação e controle no site.
- [x] Site disponível no **GitHub** e online via **GitHub Pages**.

---

## 🚀 O que o projeto faz

O site funciona como um "console virtual" onde o usuário pode:

* **Jogar Clássicos:** Jogar versões fiéis de Snake (estilo Nokia), Asteroids (física vetorial) e Tetris.
* **Conteúdo Nostálgico:** Cada jogo possui uma seção dedicada com curiosidades históricas, cronologia e dicas de estratégia, estilizadas com o tema visual de cada game (Verde para Snake, Azul para Asteroids, Vermelho para Tetris).
* **Navegação Fluida:** O site opera como uma *Single Page Application* (SPA), alternando entre o menu, os jogos e as seções de conteúdo sem recarregar a página.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica.
* **CSS3:** Estilização manual para efeitos "Retro/Neon", animações e customização de temas.
* **Bootstrap 5:** Framework para o layout responsivo (Grid System), componentes (Cards, Navbar) e utilitários de espaçamento.
* **JavaScript (ES6+):**
    * Manipulação do DOM para controle de telas e visibilidade.
    * **Canvas API** para renderização gráfica e física dos jogos.
    * Lógica de loop de jogos (`requestAnimationFrame`, `setInterval`).

---

## 📅 Processo de Desenvolvimento

O desenvolvimento seguiu um fluxo estruturado:

1.  **Estruturação:** Criação do layout base com Bootstrap, definindo a *Hero Section* e os Cards de seleção.
2.  **Lógica dos Jogos:** Desenvolvimento individual da lógica de cada jogo (movimento da cobra, rotação de peças, inércia da nave).
3.  **Integração:** Implementação do sistema de navegação que gerencia qual jogo está ativo e pausa os outros.
4.  **Conteúdo e UI:** Criação das seções de curiosidades e contato, com foco em design visual temático (CSS puro para criar artes como a tela do Nokia e os Tetriminós).

---

## 💡 Facilidades e Dificuldades

Durante o desenvolvimento, houve pontos onde as ferramentas aceleraram o processo e desafios técnicos que exigiram soluções criativas.

### ✅ Facilidades
* **Bootstrap:** O uso do framework facilitou drasticamente a criação de um layout responsivo e bonito. O uso de classes utilitárias (como `d-none`, `py-5`, `text-center`) permitiu focar mais na lógica do que no CSS estrutural.
* **Manipulação de Estado Visual:** Controlar a navegação do site apenas adicionando e removendo classes CSS via JavaScript provou ser uma forma leve e eficiente de criar a experiência de usuário.

### ⚠️ Dificuldades e Soluções
* **Lógica de Navegação (O "Bug do Sumiço"):**
    * *Desafio:* Inicialmente, ao clicar em "Start", o script ocultava todas as seções do site, fazendo com que o rodapé, o menu e as curiosidades desaparecessem.
    * *Solução:* O código foi refatorado para ser mais específico: agora ele oculta apenas a "Área de Espera" (Placeholder) e os jogos inativos, garantindo que o restante do conteúdo permaneça acessível.
* **Matemática e Física (Asteroids):**
    * *Desafio:* Implementar o desenho da nave e do fogo do propulsor usando vetores. Havia problemas com a direção do fogo (saindo pelo lado errado) e o tamanho da nave ficando desproporcional.
    * *Solução:* Ajuste nas fórmulas de trigonometria (`Math.cos` e `Math.sin`) no Canvas e redefinição do raio base da nave para garantir que o desenho ficasse perfeito e o fogo saísse na direção oposta ao movimento.
* **Balanceamento do Jogo:**
    * *Desafio:* O jogo Asteroids começava muito difícil com muitos inimigos na tela.
    * *Solução:* Implementação de um `spawnTimer` (temporizador) que adiciona inimigos gradualmente, criando uma curva de dificuldade mais justa.

---

## 👤 Autor

Desenvolvido por **Carla Monteiro Brandão**.
Projeto criado com foco em práticas de Web Development e Lógica de Programação.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/carla-monteiro-brandao/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/WhiteFlowey)
