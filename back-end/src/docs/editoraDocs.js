/**
 * @swagger
 * /editoras:
 *   get:
 *     tags:
 *       - Editoras
 *     summary: Retorna a lista de editoras
 *     description: Retorna todas as editoras cadastradas no sistema.
 *     responses:
 *       200:
 *         description: Lista de editoras.
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
 *                     example: "Martins Fontes"
 *             examples:
 *               Exemplo 1:
 *                 value:
 *                   - id: 1
 *                     nome: "Martins Fontes"
 *                   - id: 2
 *                     nome: "Leya"
 *                   - id: 3
 *                     nome: "Record"
 *   post:
 *     tags:
 *       - Editoras
 *     summary: Cadastra uma nova editora
 *     description: Cria um nova editora no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 minLength: 4
 *                 example: "Nova editora"
 *     responses:
 *       201:
 *         description: Editora criada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 20
 *                 nome:
 *                   type: string
 *                   example: "Nova editora"
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
 *               CampoString:
 *                 summary: Um campo deve ser uma string.
 *                 value:
 *                   message: "O 'campo' deve ser uma string"
 *               CampoStringTamanhoMinimo:
 *                 summary: Um campo deve ter no minimo X caracteres.
 *                 value:
 *                   message: "O 'campo' ter no minimo 4 caracteres"
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
 *       409:
 *         description: Editora ja cadastrada no banco de dados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Editora já cadastrado no banco de dados."
 * editoras/{id}:
 *   get:
 *     tags:
 *       - Editoras
 *     summary: Retorna uma editora específica pelo ID
 *     description: Busca uma editora cadastrada no sistema pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da editora a ser buscada.
 *     responses:
 *       200:
 *         description: Editora encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: "Martins Fontes"
 *             exemples:
 *               Exemplo 1:
 *                 value:
 *                   - id: 1
 *                     nome: "Martins Fontes"
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
 *         description: Editora não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Editora não encontrada."
 *   put:
 *     tags:
 *       - Editoras
 *     summary: Atualiza uma editora pelo ID
 *     description: Atualiza os dados de uma editora existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da editora a ser atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 minLength: 4
 *                 example: "Nova editora"
 *     responses:
 *       200:
 *         description: Edição modificada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: "Nova editora"
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
 *               CampoObrigatorio:
 *                 summary: Um campo obrigatório está faltando.
 *                 value:
 *                   message: "O 'campo' é obrigátorio."
 *               CampoVazio:
 *                 summary: Um campo está vazio.
 *                 value:
 *                   message: "O 'campo' não pode estar vazio."
 *               CampoString:
 *                 summary: Um campo deve ser uma string.
 *                 value:
 *                   message: "O 'campo' deve ser uma string"
 *               CampoStringTamanhoMinimo:
 *                 summary: Um campo deve ter no minimo X caracteres.
 *                 value:
 *                   message: "O 'campo' ter no minimo 4 caracteres"
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
 *         description: Editora não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Editora não encontrada."
 *   delete:
 *     tags:
 *       - Editoras
 *     summary: Remove uma editora pelo ID
 *     description: Exclui uma editora cadastrada no sistema.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da editora a ser removida.
 *     responses:
 *       200:
 *         description: Editora removida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Editora deletada com sucesso."
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
 *         description: Editora não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Editora não encontrada."
 *       500:
 *         description: Editora não deletada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Editora não deletada."
 */