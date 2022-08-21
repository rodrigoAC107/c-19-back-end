const { response } = require("express");
const { Laboratory } = require("../models");

const getLaboratories = async (req, res = response) => {
  const { limit = 10, from = 1, search = null } = req.query;

  const query = { deleted_at: null };

  if (search !== "null" && search !== null) {
      const total = await Laboratory.countDocuments(query);
      Laboratory.find(query)
      .populate({path: "person", match: {name: {$regex: '.*'+search+'.*', $options:'i'} }})
      .skip(Number(from))
      .limit(Number(limit))
      .exec(function (err, laboratories) {
        if(err) res.send({status:500, message: 'internal error', type:'internal'});
        res.json({
          page: Number(from),
          count_pages: Number(total / limit),
          total,
          laboratories: laboratories.filter((laboratory) => laboratory.person !== null )
        });
      });
    
  }else {
    const [total, laboratories] = await Promise.all([
      Laboratory.countDocuments(query),
      Laboratory.find(query)
        .populate("person")
        .skip(Number(from))
        .limit(Number(limit))
    ]);
  
    res.json({
      page: Number(from),
      count_pages: Number(total / limit),
      total,
      laboratories,
    });
  }
};

const getLaboratory = async (req, res = response) => {

  const { id } = req.params;

  const laboratory = await Laboratory.findById(id).populate('person');

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
