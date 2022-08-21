const { Schema, model } = require("mongoose");

const CasesSchema = Schema({
  name: {
    type: String,
    required: [true, "NAME is required"],
  },
  nationality: {
    type: String,
    required: [true, "NATIONALITY is required"],
  },
  province: {
    type: String,
    required: [true, "PROVINCE is required"],
  },
  estate: {
    type: String,
    required: [true, "ESTATE is required"],
  },
  location: {
    type: String,
    required: [true, "LOCATION is required"],
  },
  street: {
    type: String,
    required: [true, "STREET is required"],
  },
  apartament: {
    type: String,
  },
  postal_code: {
    type: Number,
    required: [true, "POSTAL CODE is required"],
  },
  age: {
    type: Number,
    required: [true, "AGE is required"],
  },
  birthday_date: {
    type: String,
    required: [true, "BIRTHDAY DATE is required"],
  },
  email: {
    type: String,
    required: [true, "EMAIL is required"],
  },
  phone: {
    type: String,
    required: [true, "PHONE is required"],
  },
  current_state: {
    type: String,
    default: null,
  },
  current_state_type: {
    type: String,
    default: null,
  },
  triage: {
    type: String,
    default: null,
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

CasesSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Case", CasesSchema);
