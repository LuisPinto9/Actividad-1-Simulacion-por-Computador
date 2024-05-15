const express = require("express");
const router = express.Router();
const {
  saveInscription,
  findAllInscription,
  findByIdInscription,
  updateInscription,
  deleteInscription,
} = require("../controllers/inscriptionsController");

/**
 * @swagger
 * tags:
 *   name: Inscripciones
 *   description: Operaciones relacionadas con inscripciones
 */

/**
 * @swagger
 * /inscriptions:
 *   get:
 *     tags:
 *       - Inscripciones
 *     description: Devuelve todas las inscripciones
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.get("/", findAllInscription);

/**
 *@swagger
 * /inscriptions/save:
 *   post:
 *     tags:
 *       - Inscripciones
 *     description: Crea una nueva inscripción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     format: objectId
 *                     example: "66327e8fee1040aa1479a85d" # Ejemplo de un objectId de MongoDB
 *                     description: ID del estudiante
 *               group:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     format: objectId
 *                     example: "66327e8fee1040aa1479a85d" # Ejemplo de un objectId de MongoDB
 *                     description: ID de la materia
 *
 *               registrationDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inscripción (formato YYYY-MM-DD)
 *
 *     responses:
 *       '200':
 *         description: Éxito
 *       '500':
 *         description: Error del servidor
 */
router.post("/save", saveInscription);

/**
 * @swagger
 * /inscriptions/findById/{objectId}:
 *   get:
 *     tags:
 *       - Inscripciones
 *     description: Busca una inscripción por su ObjectId de MongoDB
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: "6085e894932ec20015bbf017" # Ejemplo de un objectId de MongoDB
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 *       500:
 *         description: Error del servidor
 */
router.get("/findById/:id", findByIdInscription);

/**
 * @swagger
 * /inscriptions/update/{objectId}:
 *   patch:
 *     tags:
 *       - Inscripciones
 *     description: Actualiza una inscripción por su ID
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           description: ID de la inscripción a actualizar (formato ObjectID de MongoDB)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             type: object
 *             properties:
 *               student:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     format: objectId
 *                     example: "66327e8fee1040aa1479a85d" # Ejemplo de un objectId de MongoDB
 *                     description: ID del estudiante
 *               group:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     format: objectId
 *                     example: "66327e8fee1040aa1479a85d" # Ejemplo de un objectId de MongoDB
 *                     description: ID de la materia
 *
 *               registrationDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inscripción (formato YYYY-MM-DD)
 *               status:
 *                 type: string
 *                 enum: [Inscrito, No inscrito, Cancelado]
 *                 default: Inscrito
 *                 description: Estado de la inscripción
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: No encontrado
 *       400:
 *         description: Solicitud incorrecta
 *       500:
 *         description: Error del servidor
 */
router.patch("/update/:id", updateInscription);
/**
 * @swagger
 * /inscriptions/delete/{objectId}:
 *   delete:
 *     tags:
 *       - Inscripciones
 *     description: Elimina una inscripción por su ID
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           description: ID de la inscripción a eliminar (formato ObjectID de MongoDB)
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: No encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/delete/:id", deleteInscription);

module.exports = router;
