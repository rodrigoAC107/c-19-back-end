const { response } = require("express");
const { Laboratory } = require("../models");

const getLaboratories = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const query = { deleted_at: null };

  const [total, laboratories] = await Promise.all([
    Laboratory.countDocuments(query),
    Laboratory.find(query)
      .populate("person")
      .skip(Number(from))
      .limit(Number(limit))
  ]);

  res.json({
    total,
    laboratories,
  });
};

const getLaboratory = async (req, res = response) => {

  const { id } = req.params;

  const laboratory = await Laboratory.findOne({id}).populate('person');

  res.json(laboratory);

}

const storeLaboratory = async (req, res = response) => {
  const data = req.body;

  const laboratory = new Laboratory(data);

  laboratory.save();

  res.status(201).json(laboratory);
};

const updateLaboratory = async (req, res = response) => {
  const { id } = req.params;

  const { created_at, deleted_at, ...data } = req.body;
  
  data.updated_at = Date.now();

  const laboratory = await Laboratory.findByIdAndUpdate(id, data, { new: true });

  res.json(laboratory);
}

const deleteLaboratory = async (req, res = response) => {
  const { id } = req.params;

  const laboratory = await Laboratory.findByIdAndUpdate(id, { deleted_at: Date.now() }, {new: true});

  res.json(laboratory);

}

module.exports = {
  getLaboratories,
  getLaboratory,
  storeLaboratory,
  updateLaboratory,
  deleteLaboratory
};
