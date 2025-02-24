/**
 * @swagger
 * /livros:
 *   get:
 *     tags:
 *       - Livros
 *     summary: Retorna a lista de livros
 *     description: Retorna todas os livros cadastradas no sistema.
 *     responses:
 *       200:
 *         description: Lista de livros.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   idColecao:
 *                     type: integer
 *                     example: 2
 *                   nome:
 *                     type: string
 *                     example: "A Sociedade do Anel"
 *                   idAutor:
 *                     type: integer
 *                     example: 1
 *                   tenho:
 *                     type: boolean
 *                     example: true
 *                   lido:
 *                     type: boolean
 *                     example: true
 *                   nota:
 *                     type: integer
 *                     example: 10
 *                   idCategoria:
 *                     type: integer
 *                     example: 1
 *                   idEditora:
 *                     type: integer
 *                     example: 1
 *             examples:
 *               Exemplo 1:
 *                 value:
 *                   - id: 1
 *                     idColecao: 2
 *                     nome: "A Sociedade do Anel"
 *                     idAutor: 1
 *                     tenho: true
 *                     lido: true
 *                     nota: 10
 *                     idCategoria: 1
 *                     idEditora: 1
 *                   - id: 2
 *                     idColecao: 2
 *                     nome: "As Duas Torres"
 *                     idAutor: 1
 *                     tenho: true
 *                     lido: true
 *                     nota: 10
 *                     idCategoria: 1
 *                     idEditora: 1
 *                   - id: 3
 *                     idColecao: 2
 *                     nome: "O Retorno do Rei"
 *                     idAutor: 1
 *                     tenho: true
 *                     lido: true
 *                     nota: 10
 *                     idCategoria: 1
 *                     idEditora: 1
 *   post:
 *     tags:
 *       - Livros
 *     summary: Cadastra uma novo livro
 *     description: Cria um novo livro no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idColecao
 *               - nome
 *               - idAutor
 *               - tenho
 *               - lido
 *               - nota
 *               - idCategoria
 *               - idEditora
 *             properties:
 *               idColecao:
 *                 type: integer
 *                 minimum: 1
 *                 description: "O campo idColecao deve representar um id existente no banco de dados na tabela Colecoes."
 *                 example: 1
 *               nome:
 *                 type: string
 *                 minLength: 4
 *                 example: "Um livro muito legal"
 *               idAutor:
 *                 type: integer
 *                 minimum: 1
 *                 description: "O campo idAutor deve representar um id existente no banco de dados na tabela Autores."
 *                 example: 1
 *               tenho:
 *                 type: integer
 *                 example: 1
 *                 enum: [0, 1]
 *                 description: "O campo tenho deve ser um número representando um booleano. `0` para não tenho e `1` para tenho."
 *               lido:
 *                 type: integer
 *                 example: 1
 *                 enum: [0, 1]
 *                 description: "O campo lido deve ser um número representando um booleano. `0` para não lido e `1` para lido."
 *               idCategoria:
 *                 type: integer
 *                 minimum: 1
 *                 description: "O campo idCategoria deve representar um id existente no banco de dados na tabela Categoriaes."
 *                 example: 1
 *               idEditora:
 *                 type: integer
 *                 minimum: 1
 *                 description: "O campo idEditora deve representar um id existente no banco de dados na tabela Editoraes."
 *                 example: 1
 *     responses:
 *       201:
 *         description: Livro criado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 176
 *                 nome:
 *                   type: string
 *                   example: "Um livro muito legal"
 *                 idColecao:
 *                   type: integer
 *                   example: 1
 *                 idAutor:
 *                   type: integer
 *                   example: 1
 *                 tenho:
 *                   type: boolean
 *                   example: true
 *                 lido:
 *                   type: boolean
 *                   example: true
 *                 idCategoria:
 *                   type: integer
 *                   example: 1
 *                 idEditora:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Problema com a requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "O campo nome é obrigatório."
 *             examples:
 *               CampoObrigatorio:
 *                 summary: Um campo obrigatório está faltando.
 *                 value:
 *                   message: "O 'campo' é obrigátorio."
 *               CampoVazio:
 *                 summary: Um campo está vazio.
 *                 value:
 *                   message: "O 'campo' não pode estar vazio."
 *               CampoNumericoObrigatorio:
 *                 summary: Um campo deve ser um número.
 *                 value:
 *                   message: "O 'campo' deve ser um numero"
 *               CampoString:
 *                 summary: Um campo deve ser uma string.
 *                 value:
 *                   message: "O 'campo' deve ser uma string"
 *               CampoBoleano:
 *                 summary: Um campo deve ser um boleano.
 *                 value:
 *                   message: "O 'campo' deve ser um boleano"
 *               CampoStringTamanhoMinimo:
 *                 summary: Um campo deve ter no minimo X caracteres.
 *                 value:
 *                   message: "O 'campo' ter no minimo 4 caracteres"
 *               CampoNumericoTamanhoMinimo:
 *                 summary: Um campo deve ser maior ou igual a X.
 *                 value:
 *                   message: "O 'campo' deve ser maior ou igual a 1"
 *               CampoNumericoTamanhoMaximo:
 *                 summary: Um campo deve ser menor ou igual a X.
 *                 value:
 *                   message: "O 'campo' deve ser menor ou igual a 10"
 *       401:
 *         description: Problema de permissão de acesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Token de autenticação não fornecido."
 *             examples:
 *               TokenObrigatorio:
 *                 summary: Requisição feita sem token.
 *                 value:
 *                   message: "Token de autenticação não fornecido."
 *               TokenInvalido:
 *                 summary: Requisição feita com token inválido.
 *                 value:
 *                   message: "Token fornecido é inválido."
 *       404:
 *         description: Algum campo chave estrangeira inexistente na tabela de origem.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "O campo ${campo} deve ser um valor existente na tabela ${tabela}"
 *       409:
 *         description: Livro ja cadastrado no banco de dados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Livro já cadastrado no banco de dados."
 * livros/{id}:
 *   get:
 *     tags:
 *       - Livros
 *     summary: Retorna um livro específico pelo ID
 *     description: Busca um livro cadastrado no sistema pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro a ser buscado.
 *     responses:
 *       200:
 *         description: livro encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   idColecao:
 *                     type: integer
 *                     example: 2
 *                   nome:
 *                     type: string
 *                     example: "A Sociedade do Anel"
 *                   idAutor:
 *                     type: integer
 *                     example: 1
 *                   tenho:
 *                     type: boolean
 *                     example: true
 *                   lido:
 *                     type: boolean
 *                     example: true
 *                   nota:
 *                     type: integer
 *                     example: 10
 *                   idCategoria:
 *                     type: integer
 *                     example: 1
 *                   idEditora:
 *                     type: integer
 *                     example: 1
 *       400:
 *         description: Problema com a requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "O id precisa ser um número inteiro"
 *             examples:
 *               IdNumeroInteiro:
 *                 summary: O id precisa ser um número inteiro.
 *                 value:
 *                   message: "O id precisa ser um número inteiro"
 *       401:
 *         description: Problema de permissão de acesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Token de autenticação não fornecido."
 *             examples:
 *               TokenObrigatorio:
 *                 summary: Requisição feita sem token.
 *                 value:
 *                   message: "Token de autenticação não fornecido."
 *               TokenInvalido:
 *                 summary: Requisição feita com token inválido.
 *                 value:
 *                   message: "Token fornecido é inválido."
 *       404:
 *         description: Livro não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Livro não encontrado."
 *   put:
 *     tags:
 *       - Livros
 *     summary: Atualiza um livro pelo ID
 *     description: Atualiza os dados de um livro existente, atualização dinâmica dependendo dos campos enviados no corpo da requisição.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idColecao:
 *                 type: integer
 *                 minimum: 1
 *                 description: "O campo idColecao deve representar um id existente no banco de dados na tabela Colecoes."
 *                 example: 1
 *               nome:
 *                 type: string
 *                 minLength: 4
 *                 example: "Um livro muito legal"
 *               idAutor:
 *                 type: integer
 *                 minimum: 1
 *                 description: "O campo idAutor deve representar um id existente no banco de dados na tabela Autores."
 *                 example: 1
 *               tenho:
 *                 type: integer
 *                 example: 1
 *                 enum: [0, 1]
 *                 description: "O campo tenho deve ser um número representando um booleano. `0` para não tenho e `1` para tenho."
 *               lido:
 *                 type: integer
 *                 example: 1
 *                 enum: [0, 1]
 *                 description: "O campo lido deve ser um número representando um booleano. `0` para não lido e `1` para lido."
 *               idCategoria:
 *                 type: integer
 *                 minimum: 1
 *                 description: "O campo idCategoria deve representar um id existente no banco de dados na tabela Categoriaes."
 *                 example: 1
 *               idEditora:
 *                 type: integer
 *                 minimum: 1
 *                 description: "O campo idEditora deve representar um id existente no banco de dados na tabela Editoraes."
 *                 example: 1
 *     responses:
 *       200:
 *         description: Livro modificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   idColecao:
 *                     type: integer
 *                     example: 2
 *                   nome:
 *                     type: string
 *                     example: "A Sociedade do Anel"
 *                   idAutor:
 *                     type: integer
 *                     example: 1
 *                   tenho:
 *                     type: boolean
 *                     example: true
 *                   lido:
 *                     type: boolean
 *                     example: true
 *                   nota:
 *                     type: integer
 *                     example: 10
 *                   idCategoria:
 *                     type: integer
 *                     example: 1
 *                   idEditora:
 *                     type: integer
 *                     example: 1
 *       204:
 *         description: Nenhuma modificação a ser feita.
 *       400:
 *         description: Problema com a requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "O campo nome é obrigatório."
 *             examples:
 *               CampoVazio:
 *                 summary: Um campo está vazio.
 *                 value:
 *                   message: "O 'campo' não pode estar vazio."
 *               CampoNumericoObrigatorio:
 *                 summary: Um campo deve ser um número.
 *                 value:
 *                   message: "O 'campo' deve ser um numero"
 *               CampoString:
 *                 summary: Um campo deve ser uma string.
 *                 value:
 *                   message: "O 'campo' deve ser uma string"
 *               CampoBoleano:
 *                 summary: Um campo deve ser um boleano.
 *                 value:
 *                   message: "O 'campo' deve ser um boleano"
 *               CampoStringTamanhoMinimo:
 *                 summary: Um campo deve ter no minimo X caracteres.
 *                 value:
 *                   message: "O 'campo' ter no minimo 4 caracteres"
 *               CampoNumericoTamanhoMinimo:
 *                 summary: Um campo deve ser maior ou igual a X.
 *                 value:
 *                   message: "O 'campo' deve ser maior ou igual a 1"
 *               CampoNumericoTamanhoMaximo:
 *                 summary: Um campo deve ser menor ou igual a X.
 *                 value:
 *                   message: "O 'campo' deve ser menor ou igual a 10"
 *               IdNumeroInteiro:
 *                 summary: O id precisa ser um número inteiro.
 *                 value:
 *                   message: "O id precisa ser um número inteiro"
 *       401:
 *         description: Problema de permissão de acesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Token de autenticação não fornecido."
 *             examples:
 *               TokenObrigatorio:
 *                 summary: Requisição feita sem token.
 *                 value:
 *                   message: "Token de autenticação não fornecido."
 *               TokenInvalido:
 *                 summary: Requisição feita com token inválido.
 *                 value:
 *                   message: "Token fornecido é inválido."
 *       404:
 *         description: Livro não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Livro não encontrada."
 *   delete:
 *     tags:
 *       - Livros
 *     summary: Remove um livro pelo ID
 *     description: Exclui uma livro cadastrado no sistema.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro a ser removido.
 *     responses:
 *       200:
 *         description: Livro removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Livro deletado com sucesso."
 *       400:
 *         description: Problema com a requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "O id precisa ser um número inteiro"
 *             examples:
 *               IdNumeroInteiro:
 *                 summary: O id precisa ser um número inteiro.
 *                 value:
 *                   message: "O id precisa ser um número inteiro"
 *       401:
 *         description: Problema de permissão de acesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Token de autenticação não fornecido."
 *             examples:
 *               TokenObrigatorio:
 *                 summary: Requisição feita sem token.
 *                 value:
 *                   message: "Token de autenticação não fornecido."
 *               TokenInvalido:
 *                 summary: Requisição feita com token inválido.
 *                 value:
 *                   message: "Token fornecido é inválido."
 *       404:
 *         description: Livro não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Livro não encontrado."
 *       500:
 *         description: Livro não deletado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Livro não deletado."
 * /livros/nao-lidos:
 *   get:
 *     tags:
 *       - Livros
 *     summary: Retorna um lista de livros que ainda não li.
 *     description: Retorna todos os livros ainda não lidos.
 *     responses:
 *       200:
 *         description: Lista de livros não lidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 7
 *                   nome:
 *                     type: string
 *                     example: "O Portador do Fogo"
 *                   tenho:
 *                     type: boolean
 *                     example: true
 *                   autor:
 *                     type: string
 *                     example: "Bernard Cornwell"
 *                   colecao:
 *                     type: string
 *                     example: "A Busca do Graal"
 *             examples:
 *               Exemplo 1:
 *                 value:
 *                   - id: 7
 *                     nome: "1356"
 *                     tenho: true
 *                     autor: "Bernard Cornwell"
 *                     colecao: "A Busca do Graal"
 *                   - id: 20
 *                     nome: "O Portador do Fogo"
 *                     tenho: true
 *                     autor: "Bernard Cornwell"
 *                     colecao: "As Crônicas Saxônicas"
 *                   - id: 21
 *                     nome: "A Guerra do Lobo"
 *                     tenho: true
 *                     autor: "Bernard Cornwell"
 *                     colecao: "As Crônicas Saxônicas"
 * /livros/nao-tenho:
 *   get:
 *     tags:
 *       - Livros
 *     summary: Retorna um lista de livros que não tenho.
 *     description: Retorna os livros cadastrados mas que não tenho.
 *     responses:
 *       200:
 *         description: Lista de livros que não tenho.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 20
 *                   nome:
 *                     type: string
 *                     example: "A Guerra do Lobo"
 *                   tenho:
 *                     type: boolean
 *                     example: false
 *                   autor:
 *                     type: string
 *                     example: "Bernard Cornwell"
 *                   colecao:
 *                     type: string
 *                     example: "As Crônicas Saxônicas"
 *             examples:
 *               Exemplo 1:
 *                 value:
 *                   - id: 21
 *                     nome: "A Guerra do Lobo"
 *                     tenho: false
 *                     autor: "Bernard Cornwell"
 *                     colecao: "As Crônicas Saxônicas"
 *                   - id: 22
 *                     nome: "A Espada dos Reis"
 *                     tenho: false
 *                     autor: "Bernard Cornwell"
 *                     colecao: "As Crônicas Saxônicas"
 *                   - id: 23
 *                     nome: "O Senhor da Guerra"
 *                     tenho: false
 *                     autor: "Bernard Cornwell"
 *                     colecao: "As Crônicas Saxônicas"
 * /livros/search:
 *   get:
 *     tags:
 *       - Livros
 *     summary: Pesquisa livros com filtros dinâmicos.
 *     description: Permite buscar livros usando diferentes parâmetros. Qualquer combinação dos filtros pode ser usada.
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome do livro (parcial ou completo) case insensitive
 *         example: "a sociedade"
 *       - in: query
 *         name: autor
 *         schema:
 *           type: string
 *         description: Nome do autor (parcial ou completo) case insensitive
 *         example: "tolkien" 
 *       - in: query
 *         name: colecao
 *         schema:
 *           type: string
 *         description: Nome da coleção (parcial ou completo) case insensitive
 *         example: "senhor"
 *       - in: query
 *         name: editora
 *         schema:
 *           type: string
 *         description: Nome da editora (parcial ou completo) case insensitive
 *         example: "martin"
 *     responses:
 *       200:
 *         description: Lista de livros correspondentes a pesquisa.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: "A Sociedade do Anel"
 *                   tenho:
 *                     type: boolean
 *                     example: true
 *                   autor:
 *                     type: string
 *                     example: "J. R. R. Tolkien"
 *                   editora:
 *                     type: string
 *                     example: "Martins Fontes"
 *                   colecao:
 *                     type: string
 *                     example: "O Senhor dos Anéis"
 *                   categoria:
 *                     type: string
 *                     example: "Literatura fantástica"
 */