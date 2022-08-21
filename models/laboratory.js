const { Schema, model } = require("mongoose");

const LaboratoriesSchema = Schema({
  protocol: {
    type: String,
    required: [true, "Protocol is required"],
  },
  protocol_type: {
    type: String,
    required: [true, "Protocol Type is required"],
  },
  person: {
    type: Schema.Types.ObjectId,
    ref: 'Case',
    required: true,
  },
  taken: {
    type: Date,
    required: [true, "Taken is required"],
    default: null,
  },
  received: {
    type: Date,
    default: null,
  },
  processed: {
    type: Date,
    default: null,
  },
  validated: {
    type: Date,
    default: null,
  },
  resulted: {
    type: String,
    default: null
  },
  resulted_type: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

LaboratoriesSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Laboratory", LaboratoriesSchema);
