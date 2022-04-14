const { response } = require("express");
const { Cases } = require("../models");

const getCases = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = {
    deleted_at: null,
  };

  const [total, cases] = await Promise.all([
    Cases.countDocuments(query),
    Cases.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    cases,
  });
};

const getCase = async (req, res = response) => {
  
  const { id } = req.params;
  
  const caseDB = await Cases.findOne({id});

  res.json(caseDB);
}

const storeCase = async (req, res = response) => {
  const email = req.body.email.toUpperCase();
  const caseDB = await Cases.findOne({
    email,
  });
  if (caseDB) {
    return res.status(400).json({
      msg: `the case with ${email} already exists`,
    });
  }
  const data = req.body;

  const newCase = new Cases(data);

  await newCase.save();

  res.status(200).json(newCase);
};

const updateCase = async (req, res = response) => {
  const { id } = req.params;

  const { created_at, updated_at, ...data } = req.body;

  const caseDB = await Cases.findByIdAndUpdate(id, data, { new: true });
  
  res.json( caseDB );

}

const deleteCase = async (req, res = response) => {
  const { id } = req.params;

  const deleteCase = await Cases.findByIdAndUpdate(
    id,
    { deleted_at: Date.now() },
    { new: true }
  );

  res.json(deleteCase);
};

module.exports = {
  getCases,
  getCase,
  storeCase,
  deleteCase,
  updateCase
};
