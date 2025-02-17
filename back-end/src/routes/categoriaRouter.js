const { Router } = require('express');

const { tdsCategorias, categoriaId, criaCategoria, atlizCategoria, delCategoria } = require('../controllers/categoriaController');
const validaCategoria = require('../middleware/validaCategoria');

const categoriaRouter = Router();


/**
 * @swagger
 * /categorias:
 *   get:
 *     tags:
 *       - Categorias
 *     summary: Retorna a lista de categorias
 *     description: Retorna todas as categorias cadastrados no sistema.
 *     responses:
 *       200:
 *         description: Lista de categorias.
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
 *                     example: "Literatura fantástica"
 *             examples:
 *               Exemplo 1:
 *                 value:
 *                   - id: 1
 *                     nome: "Literatura fantástica"
 *                   - id: 2
 *                     nome: "Ficção histórica"
 *                   - id: 3
 *                     nome: "Ficção científica"
*   post:
 *     tags:
 *       - Categorias
 *     summary: Cadastra uma nova categoria
 *     description: Cria um nova categoria no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - nome
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 minLength: 4
 *                 example: "Romance"
 *     responses:
 *       201:
 *         description: Categoria criada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 4
 *                 nome:
 *                   type: string
 *                   example: "Romance"
 *       409:
 *         description: Categoria ja cadastrada no banco de dados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Categoria já cadastrado no banco de dados."
 * categorias/{id}:
 *   get:
 *     tags:
 *       - Categorias
 *     summary: Retorna uma categoria específica pelo ID
 *     description: Busca uma categoria cadastrada no sistema pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria a ser buscada.
 *     responses:
 *       200:
 *         description: Categoria encontrada.
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
 *                   example: "Literatura fantástica"
 *       404:
 *         description: Categoria não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Categoria não encontrada."
 *   put:
 *     tags:
 *       - Categorias
 *     summary: Atualiza uma categoria pelo ID
 *     description: Atualiza os dados de uma categoria existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria a ser atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - nome
 *             type: object
 *             properties:
 *               nome:
 *                 minLength: 4
 *                 type: string
 *                 example: "Romance"
 *     responses:
 *       200:
 *         description: Categoria modificada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 4
 *                 nome:
 *                   type: string
 *                   example: "Romance"
 *       204:
 *         description: Nenhuma modificação a ser feita.
 *       404:
 *         description: Categoria não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Categoria não encontrada."
 *   delete:
 *     tags:
 *       - Categorias
 *     summary: Remove uma categoria pelo ID
 *     description: Exclui uma categoria cadastrada no sistema.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria a ser removida.
 *     responses:
 *       200:
 *         description: Categoria removida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Categoria deletada com sucesso."
 *       404:
 *         description: Categoria não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Categoria não encontrada."
 *       500:
 *         description: Categoria não deletada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Categoria não deletada."
 */

categoriaRouter.get('/', tdsCategorias);

categoriaRouter.get('/:id', categoriaId);

categoriaRouter.post('/', validaCategoria, criaCategoria);

categoriaRouter.put('/:id', validaCategoria, atlizCategoria);

categoriaRouter.delete('/:id', delCategoria );

module.exports = categoriaRouter;