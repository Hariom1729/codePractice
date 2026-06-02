require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const Problem = require('./models/Problem');
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const p = await Problem.findOne({ title: 'Kth smallest element' });
  if (p) console.log("Sample input:", p.sampleTestCases[0].input);
  process.exit(0);
});
