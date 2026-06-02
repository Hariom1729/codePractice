import mongoose from 'mongoose';

export interface ITestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface IProblem extends mongoose.Document {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  testCases: ITestCase[];
  boilerplates: Record<string, string>; // e.g., { "javascript": "function solve(n) { ... }" }
}

const ProblemSchema = new mongoose.Schema<IProblem>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true,
    },
    testCases: [
      {
        input: { type: String, required: true },
        expectedOutput: { type: String, required: true },
        isHidden: { type: Boolean, default: false },
      },
    ],
    boilerplates: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.models.Problem || mongoose.model<IProblem>('Problem', ProblemSchema);
