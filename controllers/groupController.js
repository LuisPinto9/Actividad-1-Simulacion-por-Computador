const Group = require("../models/group-model");
const Topic = require("../models/topic-model");

const { handleRequest } = require("../utils/requestHandler");

const findAll = async (req, res) => {
  handleRequest(res, async () => {
    const data = await Group.find({});
    if (data.length === 0) {
      return { success: false, status: 404, message: "No encontrado" };
    }
    return { success: true, status: 200, data };
  });
};

const save = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        error: "El campo 'topic._id' es requerido en el cuerpo de la solicitud",
      });
    }

    const existingTopic = await Topic.findById(topic);

    if (!existingTopic) {
      return res
        .status(404)
        .json({ success: false, error: "La materia no existe" });
    }

    // Verificar si ya existe un grupo con el mismo tema
    const existingGroup = await Group.findOne({
      topic: existingTopic._id,
      grupo: req.body.grupo,
    });

    if (existingGroup) {
      return res.status(409).json({
        success: false,
        error: `El ${req.body.grupo} de esa materia ya existe`,
      });
    }

    const newGroup = new Group({
      grupo: req.body.grupo,
      name: existingTopic.name,
      topic: existingTopic._id,
      quotas: existingTopic.quotas,
    });

    const data = await newGroup.save();
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const findName = async (req, res) => {
  const { name } = req.query;

  try {
    const group = await Group.find({ name: name });

    if (!group || group.length === 0) {
      return res
        .status(404)
        .json({ state: false, message: "Grupo no encontrado" });
    } else {
      return res.status(200).json({ state: true, data: group });
    }
  } catch (error) {
    return res.status(500).json({ state: false, error: error.message });
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ state: false, message: "No encontrado" });
    } else {
      return res.status(200).json({ state: true, data: group });
    }
  } catch (error) {
    return res.status(500).json({ state: false, error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateInformation = req.body;
  try {
    const group = await Group.findByIdAndUpdate(id, updateInformation, {
      new: true,
    });
    if (!group) {
      return res
        .status(404)
        .json({ state: false, message: "Grupo no encontrado" });
    }
    res.status(200).json({ state: true, data: group });
  } catch (error) {
    res.status(500).json({ state: false, error: error.message });
  }
};

const deleteGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findByIdAndDelete(id);
    if (!group) {
      return res
        .status(404)
        .json({ state: false, message: "Grupo no encontrado" });
    }
    res.status(200).json({ state: true, data: group });
  } catch (error) {
    res.status(500).json({ state: false, error: error.message });
  }
};

const countDocuments = async (req, res) => {
  try {
    const count = await Group.countDocuments({});
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const checkAndCreateGroup = async (req, res) => {
  try {
    const topics = await Topic.find({});
    for (const topic of topics) {
      const group = await Group.findOne({ topic: topic._id, grupo: "grupo 60" });
      if (!group) {
        const newGroup = new Group({
          grupo: "grupo 60",
          name: topic.name,
          topic: topic._id,
          quotas: topic.quotas,
        });
        await newGroup.save();
      }
    }
    res.status(200).json({ success: true, message: "Grupos verificados y creados si no existían" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  save,
  findAll,
  findById,
  findName,
  update,
  deleteGroup,
  countDocuments,
  checkAndCreateGroup,
};
