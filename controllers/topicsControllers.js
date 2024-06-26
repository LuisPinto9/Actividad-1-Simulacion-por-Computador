const Topic = require("../models/topic-model");
const Group = require("../models/group-model");
const { handleRequest } = require("../utils/requestHandler");

exports.save = async (req, res) => {
  handleRequest(res, async () => {
    if (req.body.quotas <= 0) {
      return {
        success: false,
        status: 400,
        message: "No se puede agregar una materia con 0 cupos",
      };
    }
    const newTopic = new Topic(req.body);
    const data = await newTopic.save();
    const group = new Group({
      group: "grupo 60",
      name: newTopic.name,
      topic: newTopic._id,
      quotas: newTopic.quotas,
    });
    await group.save();
    return { success: true, status: 200, data };
  });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updateInformation = req.body;
  handleRequest(res, async () => {
    if (req.body.quotas <= 0) {
      return {
        success: false,
        status: 400,
        message: "No se puede agregar una materia con 0 cupos",
      };
    }
    const data = await Topic.updateOne({ id: id }, { $set: updateInformation });
    if (data.matchedCount === 0) {
      console.log("entro a la validacion");
      return { success: false, status: 404, message: "No encontrado" };
    }
    return { success: true, status: 200, data };
  });
};

exports.findAll = async (req, res) => {
  handleRequest(res, async () => {
    const data = await Topic.find({});
    if (data.length === 0) {
      return { success: false, status: 404, message: "No encontrado" };
    }
    return { success: true, status: 200, data };
  });
};

exports.findById = async (req, res) => {
  const { id } = req.params;
  handleRequest(res, async () => {
    const data = await Topic.findById(id);
    if (!data) {
      return { success: false, status: 404, message: "No encontrado" };
    }
    return { success: true, status: 200, data };
  });
};

exports.findId = async (req, res) => {
  const { id } = req.params;
  handleRequest(res, async () => {
    const data = await Topic.find({ id: id });
    if (!data) {
      return { success: false, status: 404, message: "No encontrado" };
    }
    return { success: true, status: 200, data };
  });
};

exports.deleteTopic = async (req, res) => {
  const { id } = req.params;
  handleRequest(res, async () => {
    const data = await Topic.deleteOne({ id: id });
    return { success: true, status: 200, data };
  });
};

exports.findGroupsByTopicId = async (req, res) => {
  const { id } = req.params;
  handleRequest(res, async () => {
    const data = await Group.find({ topic: id });
    if (data.length === 0) {
      return {
        success: false,
        status: 404,
        message: "No se encontraron grupos para esta materia",
      };
    }
    return { success: true, status: 200, data };
  });
};
