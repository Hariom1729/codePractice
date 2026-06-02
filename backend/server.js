require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Problem = require('./models/Problem');
const { generateJavascriptDriver, generatePythonDriver, generateCppDriver } = require('./driverGenerator');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codepractice')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- API Routes ---

app.get('/api/problems', async (req, res) => {
  try {
    const problems = await Problem.find({}).sort({ createdAt: -1 });
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
});

app.get('/api/problems/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });
    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch problem' });
  }
});

// extractFunctionName removed - we now strictly use bp.functionName from MongoDB

/**
 * Execute code using AWS Sandbox helper function
 */
async function runOnSandbox(language, code) {
  const sandboxUrl = process.env.AWS_EXECUTION_URL;
  const apiKey = process.env.AWS_API_KEY;

  if (!sandboxUrl || !apiKey) {
    throw new Error('Sandbox configuration missing.');
  }

  const response = await fetch(sandboxUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ language, code }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Sandbox responded with status ${response.status}`);
  }

  return await response.json();
}

/**
 * POST /api/execute/run
 * Evaluates the code against only the sampleTestCases.
 * Returns raw stdout/stderr output.
 */
app.post('/api/execute/run', async (req, res) => {
  try {
    const { code, language, problemId } = req.body;
    if (!code || !language || !problemId) {
      return res.status(400).json({ error: 'Code, language, and problemId are required' });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    const bp = problem.boilerplates.find(b => b.language === language);
    const funcName = bp ? bp.functionName : 'solve';

    const sampleTestCases = problem.sampleTestCases;
    let combinedOutput = "";
    let totalTime = 0;

    for (let i = 0; i < sampleTestCases.length; i++) {
      const tc = sampleTestCases[i];
      let executionCode = code;

      if (language === 'javascript') {
        executionCode = generateJavascriptDriver(code, funcName, tc.input);
      } else if (language === 'python') {
        executionCode = generatePythonDriver(code, funcName, tc.input);
      } else if (language === 'cpp') {
        executionCode = generateCppDriver(code, funcName, tc.input);
      }

      const data = await runOnSandbox(language, executionCode);
      combinedOutput += `--- Test Case ${i + 1} ---\nInput: ${tc.input}\nExpected: ${tc.expectedOutput}\nOutput:\n${data.output}\n\n`;
      totalTime += (data.execution_time || 0);
    }
    
    res.json({ 
      output: combinedOutput.trim(),
      executionTime: totalTime,
      status: "Completed",
    });

  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to execute run' });
  }
});

/**
 * POST /api/execute/submit
 * Evaluates the code against ALL test cases (sample + hidden).
 * Returns Success/Wrong Answer explicitly based on test case evaluation.
 */
app.post('/api/execute/submit', async (req, res) => {
  try {
    const { code, language, problemId } = req.body;
    if (!code || !language || !problemId) {
      return res.status(400).json({ error: 'Code, language, and problemId are required' });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    const bp = problem.boilerplates.find(b => b.language === language);
    const funcName = bp ? bp.functionName : 'solve';

    const allTestCases = [...problem.sampleTestCases, ...problem.hiddenTestCases];

    for (let i = 0; i < allTestCases.length; i++) {
      const tc = allTestCases[i];
      let executionCode = code;

      if (language === 'javascript') {
        executionCode = generateJavascriptDriver(code, funcName, tc.input);
      } else if (language === 'python') {
        executionCode = generatePythonDriver(code, funcName, tc.input);
      } else if (language === 'cpp') {
        executionCode = generateCppDriver(code, funcName, tc.input);
      }

      const data = await runOnSandbox(language, executionCode);
      const userOutput = (data.output || '').trim();
      const expected = tc.expectedOutput.trim();

      if (data.status !== 'Accepted') {
        return res.json({
          success: false,
          message: `Runtime Error or Compilation Error on test case ${i+1}`,
          error: data.output
        });
      }

      // Normalize spaces to avoid false positives (e.g., "[ 5, 4 ]" vs "[5, 4]")
      const normalizedUser = userOutput.replace(/\s+/g, '');
      const normalizedExpected = expected.replace(/\s+/g, '');

      if (normalizedUser !== normalizedExpected) {
        return res.json({
          success: false,
          message: "Wrong Answer. Try again!",
          failedCase: tc.input,
          expected: tc.expectedOutput,
          actual: userOutput
        });
      }
    }

    res.json({ 
      success: true, 
      message: "Accepted! All test cases passed.",
      totalTestCases: allTestCases.length
    });

  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to execute submit' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
