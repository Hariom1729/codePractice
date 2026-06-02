const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true }
}, { _id: false });

const boilerplateSchema = new mongoose.Schema({
  language: { type: String, required: true }, // e.g., 'javascript', 'python', 'cpp'
  functionName: { type: String, required: true }, // Exact text name of the entry function
  signatureCode: { type: String, required: true }
}, { _id: false });

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  topic: { type: String }, // e.g., "Arrays", "Dynamic Programming"
  descriptionMarkdown: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  
  // Test cases used when the user clicks "Run"
  sampleTestCases: [testCaseSchema],
  
  // Robust edge-case test cases used when the user clicks "Submit"
  hiddenTestCases: [testCaseSchema],

  boilerplates: [boilerplateSchema],

}, { timestamps: true });

module.exports = mongoose.model('Problem', problemSchema);
