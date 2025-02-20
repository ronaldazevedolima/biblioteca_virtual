/**
 * @swagger
 * /colecoes:
 *   get:
 *     tags:
 *       - Coleções
 *     summary: Retorna a lista de coleções
 *     description: Retorna todas as coleções cadastradas no sistema.
 *     responses:
 *       200:
 *         description: Lista de coleções.
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
 *                     example: "Sem Coleção"
 *                   volumes:
 *                     type: integer
 *                     example: 1
 *             examples:
 *               Exemplo 1:
 *                 value:
 *                   - id: 1
 *                     nome: "Sem Coleção"
 *                     volumes: 1
 *                   - id: 2
 *                     nome: "O Senhor dos Anéis"
 *                     volumes: 3
 *                   - id: 3
 *                     nome: "O Conquistador"
 *                     volumes: 5
 *   post:
 *     tags:
 *       - Coleções
 *     summary: Cadastra uma nova coleção
 *     description: Cria um nova coleção no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - volumes
 *             properties:
 *               nome:
 *                 type: string
 *                 minLength: 4
 *                 example: "Os contos da carochinha"
 *               volumes:
 *                 type: integer
 *                 minimum: 1
 *                 example: 3
 *     responses:
 *       201:
 *         description: Coleção criada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 39
 *                 nome:
 *                   type: string
 *                   example: "Os contos da carochinha"
 *                 volumes:
 *                   type: integer
 *                   example: 3
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
 *               CampoNumericoObrigatorio:
 *                 summary: Um campo deve ser um número.
 *                 value:
 *                   message: "O 'campo' deve ser um numero"
 *               CampoNumericoTamanhoMinimo:
 *                 summary: Um campo deve ser maior ou igual a X.
 *                 value:
 *                   message: "O 'campo' deve ser maior ou igual a 1"
 *       409:
 *         description: Coleção ja cadastrada no banco de dados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Coleção já cadastrado no banco de dados."
 * colecoes/{id}:
 *   get:
 *     tags:
 *       - Coleções
 *     summary: Retorna uma coleção específica pelo ID
 *     description: Busca uma coleção cadastrada no sistema pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da coleção a ser buscada.
 *     responses:
 *       200:
 *         description: Coleção encontrada.
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
 *                   example: "Sem Coleção"
 *                 volumes:
 *                   type: integer
 *                   exemple: 1
 *             exemples:
 *               Exemplo 1:
 *                 value:
 *                   - id: 1
 *                     nome: "Sem Coleção"
 *                     volumes: 1
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
 *       404:
 *         description: Coleção não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Coleção não encontrada."
 *   put:
 *     tags:
 *       - Coleções
 *     summary: Atualiza uma coleção pelo ID
 *     description: Atualiza os dados de uma coleção existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da coleção a ser atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - volumes
 *             properties:
 *               nome:
 *                 type: string
 *                 minLength: 4
 *                 example: "O Senhor dos Anéis"
 *               volumes:
 *                 type: integer
 *                 minimum: 1
 *                 example: 3
 *     responses:
 *       200:
 *         description: Coleção modificada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 nome:
 *                   type: string
 *                   example: "O Senhor dos Anéis"
 *                 volumes:
 *                   type: integer
 *                   example: 3
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
 *               CampoNumericoObrigatorio:
 *                 summary: Um campo deve ser um número.
 *                 value:
 *                   message: "O 'campo' deve ser um numero"
 *               CampoNumericoTamanhoMinimo:
 *                 summary: Um campo deve ser maior ou igual a X.
 *                 value:
 *                   message: "O 'campo' deve ser maior ou igual a 1"
 *               IdNumeroInteiro:
 *                 summary: O id precisa ser um número inteiro.
 *                 value:
 *                   message: "O id precisa ser um número inteiro"
 *       404:
 *         description: Coleção não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Coleção não encontrada."
 *   delete:
 *     tags:
 *       - Coleções
 *     summary: Remove uma coleção pelo ID
 *     description: Exclui uma coleção cadastrada no sistema.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da coleção a ser removida.
 *     responses:
 *       200:
 *         description: Coleção removida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Coleção deletada com sucesso."
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
 *       404:
 *         description: Coleção não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Coleção não encontrada."
 *       500:
 *         description: Coleção não deletada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Coleção não deletada."
 */