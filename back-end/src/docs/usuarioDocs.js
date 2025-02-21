/**
 * @swagger
 * /usuarios:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Retorna a lista de usuarios
 *     description: Retorna todos os Usuarios cadastrados no sistema **Somente administradores podem acessar esta rota**.
 *     responses:
 *       200:
 *         description: Lista de usuarios.
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
 *                     example: "Ronald"
 *                   email:
 *                     type: string
 *                     example: ronald@ronald.com
 *                   classificacao:
 *                     type: string
 *                     enum: [admin, cliente]
 *                     example: "admin"
 *             examples:
 *               Exemplo 1:
 *                 value:
 *                   - id: 1
 *                     nome: "Ronald"
 *                     email: "ronald@ronald.com"
 *                     classificacao: "admin"
 *                   - id: 2
 *                     nome: "Lorena"
 *                     email: "lorena@lorena.com"
 *                     classificacao: "cliente"
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
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Cadastra um novo usuário
 *     description: Cria um nova usuário no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 minLength: 4
 *                 example: "Aryadne"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "aryadne@aryadne.com"
 *               senha:
 *                 type: string
 *                 description: "Senha deve conter de 6 a 10 caracteres."
 *                 minLength: 6
 *                 maxLength: 10
 *                 example: "Ary123"
 *     responses:
 *       201:
 *         description: Usuário criado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywibm9tZSI6IkFyeWFkbmUiLCJlbWFpbCI6ImFyeWFkbWVAYXJ5YWRuZS5hb20iLCJzZW5oYSI6IiQyYiQxMCR2SFk3aWJIOEJGSHU2eWp6VkFfc2kubWN5UHBBNlFsSzdob3NETmM0cHlzQVRtOUd4VXNrbSIsImNsYXNzvWZpY2FjYW8iOiJjbGllbnRlIiwiaWF0IjoxNzQwMTY4MTYwfQ.xfszPHVtWj7JjkfwCTR6hYaNz4ZXq7EjCiiL_DtZfSw
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
 *               CampoFormatoEmail:
 *                 summary: Um campo deve ser no formato email@email.com.
 *                 value:
 *                   message: "O campo {{#key}} deve ser no formato 'email@email.com'."
 *               CampoFormatoSenha:
 *                 summary: Um campo deve ser uma string alfanumérica contendo de 6 a 10 caracteres.
 *                 value:
 *                   message: "O campo {{#key}} deve ser uma string alfanumérica contendo de 6 a 10 caracteres."
 *       409:
 *         description: Usuário ja cadastrado no banco de dados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Usuario já existente no banco de dados."
 * /usuarios/{id}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Retorna um usuário específico pelo ID
 *     description: Busca um usuário cadastrado no sistema pelo ID **Somente administradores e o próprio usuário podem acessar esta rota**.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser buscado.
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
 *                   example: "Ronald"
 *                 email:
 *                   type: string
 *                   example: ronald@ronald.com
 *                 classificacao:
 *                   type: string
 *                   enum: [admin, cliente]
 *                   example: "admin"
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
 *         description: Usuario não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Usuario não encontrado."
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Atualiza um usuário pelo ID
 *     description: Atualiza os dados de um usuário existente **Somente administradores e o próprio usuário podem acessar esta rota**.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 minLength: 4
 *                 example: "Aryadne"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "aryadne@aryadne.com"
 *               senha:
 *                 type: string
 *                 description: "Senha deve conter de 6 a 10 caracteres."
 *                 minLength: 6
 *                 maxLength: 10
 *                 example: "Ary123"
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
 *                   example: 3
 *                 nome:
 *                   type: string
 *                   example: "Aryadne"
 *                 email:
 *                   type: string
 *                   example: "aryadne@aryadne.com"
 *                 classificacao:
 *                   type: string
 *                   example: "cliente"
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
 *               CampoFormatoEmail:
 *                 summary: Um campo deve ser no formato email@email.com.
 *                 value:
 *                   message: "O campo email deve ser no formato 'email@email.com'."
 *               CampoFormatoSenha:
 *                 summary: Um campo deve ser uma string alfanumérica contendo de 6 a 10 caracteres.
 *                 value:
 *                   message: "O campo senha deve ser uma string alfanumérica contendo de 6 a 10 caracteres."
 *               IdNumeroInteiro:
 *                 summary: O id precisa ser um número inteiro.
 *                 value:
 *                   message: "O id precisa ser um número inteiro"
 *       204:
 *         description: Nenhuma modificação a ser feita.
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
 *       403:
 *         description: Acesso não autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Acesso negado."
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Usuário não encontrado."
 *   patch:
 *     tags:
 *       - Usuarios
 *     summary: Atualiza o campo classificação.
 *     description: Atualiza o campo classificação de um usuário **Somente administradores podem acessar esta rota**.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - classificacao
 *             type: object
 *             properties:
 *               classificacao:
 *                 type: string
 *                 enum: [admin, cliente]
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Classificação do usuário atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Classificação atualizada para 'novaClassificação' com sucesso."
 *       208:
 *         description: Usuário ja possui a classificação indicada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Usuário já passui a classificação 'classificaçãoPassada'."
 *       400:
 *         description: Problema com a requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "O campo classificacao é obrigatório."
 *             examples:
 *               CampoObrigatorio:
 *                 summary: O campo obrigatório está faltando.
 *                 value:
 *                   message: "O 'campo' é obrigátorio."
 *               CampoVazio:
 *                 summary: O campo está vazio.
 *                 value:
 *                   message: "O 'campo' não pode estar vazio."
 *               CampoString:
 *                 summary: O campo deve ser uma string.
 *                 value:
 *                   message: "O 'campo' deve ser uma string"
 *               CampoClassificacao:
 *                 summary: O campo deve ser admin ou cliente.
 *                 value:
 *                   message: "O campo classificacao deve ser admin ou cliente."
 *               IdNumeroInteiro:
 *                 summary: O id precisa ser um número inteiro.
 *                 value:
 *                   message: "O id precisa ser um número inteiro"
 *       403:
 *         description: Acesso restrito para admin.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Acesso negado, área restrita para adiministradores."
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Usuário não encontrado."
 *   delete:
 *     tags:
 *       - Usuarios
 *     summary: Remove um usuário pelo ID
 *     description: Exclui um usuário cadastrado no sistema **Somente administradores e o próprio usuário podem acessar esta rota**.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser removido.
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Usuário deletado com sucesso."
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
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Usuário não encontrado."
 *       500:
 *         description: Usuário não deletado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Usuário não deletado."
 */