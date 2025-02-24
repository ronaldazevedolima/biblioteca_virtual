/**
 * @swagger
 * /autores:
 *   get:
 *     tags:
 *       - Autores
 *     summary: Retorna a lista de autores
 *     description: Retorna todos os autores cadastrados no sistema.
 *     responses:
 *       200:
 *         description: Lista de autores.
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
 *                     example: "J. R. R. Tolkien"
 *                   nomeCompleto:
 *                     type: string
 *                     example: "John Ronald Reuel Tolkien"
 *             examples:
 *               Exemplo 1:
 *                 value:
 *                   - id: 1
 *                     nome: "J. R. R. Tolkien"
 *                     nomeCompleto: "John Ronald Reuel Tolkien"
 *                   - id: 2
 *                     nome: "Bernard Cornwell"
 *                     nomeCompleto: "Bernard Cornwell"
 *                   - id: 3
 *                     nome: "Christian Jacq"
 *                     nomeCompleto: "Christian Jacq"
 *   post:
 *     tags:
 *       - Autores
 *     summary: Cadastra um novo autor
 *     description: Cria um novo autor no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - nome
 *               - nomeCompleto
 *             type: object
 *             properties:
 *               nome:
 *                 minLength: 4
 *                 type: string
 *                 example: "Isaac Asimov"
 *               nomeCompleto:
 *                 minLength: 4
 *                 type: string
 *                 example: "Isaac Asimov"
 *     responses:
 *       201:
 *         description: Autor criado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 38
 *                 nome:
 *                   type: string
 *                   example: "Isaac Asimov"
 *                 nomeCompleto:
 *                   type: string
 *                   example: "Isaac Asimov"
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
 *         description: Autor ja cadastrado no banco de dados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Autor já cadastrado no banco de dados."
 * /autores/{id}:
 *   get:
 *     tags:
 *       - Autores
 *     summary: Retorna um autor específico pelo ID
 *     description: Busca um autor cadastrado no sistema pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do autor a ser buscado.
 *     responses:
 *       200:
 *         description: Autor encontrado.
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
 *                   example: "J. R. R. Tolkien"
 *                 nomeCompleto:
 *                   type: string
 *                   example: "John Ronald Reuel Tolkien"
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
 *         description: Autor não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Autor não encontrado."
 *   put:
 *     tags:
 *       - Autores
 *     summary: Atualiza um autor pelo ID
 *     description: Atualiza os dados de um autor existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do autor a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - nome
 *               - nomeCompleto
 *             type: object
 *             properties:
 *               nome:
 *                 minLength: 4
 *                 type: string
 *                 example: "Isaac Asimov"
 *               nomeCompleto:
 *                 minLength: 4
 *                 type: string
 *                 example: "Isaac Asimov"
 *     responses:
 *       200:
 *         description: Autor modificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 38
 *                 nome:
 *                   type: string
 *                   example: "Isaac A."
 *                 nomeCompleto:
 *                   type: string
 *                   example: "Isaac Asimov"
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
 *         description: Autor não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Autor não encontrado."
 *   delete:
 *     tags:
 *       - Autores
 *     summary: Remove um autor pelo ID
 *     description: Exclui um autor cadastrado no sistema.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do autor a ser removido.
 *     responses:
 *       200:
 *         description: Autor removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Autor deletado com sucesso."
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
 *         description: Autor não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Autor não encontrado."
 *       500:
 *         description: Autor não deletado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Autor não deletado."
 */