const { Router } = require('express');

const { tdsEditoras, criaEditora, editoraPorId, atlzEditora, delEditora } = require('../controllers/editoraController');
const validaEditora = require('../middleware/validaEditora');

const editoraRouter = Router();

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

editoraRouter.get('/', tdsEditoras);

editoraRouter.get('/:id', editoraPorId);

editoraRouter.post('/', validaEditora, criaEditora);

editoraRouter.put('/:id', validaEditora, atlzEditora);

editoraRouter.delete('/:id', delEditora);

module.exports = editoraRouter;
