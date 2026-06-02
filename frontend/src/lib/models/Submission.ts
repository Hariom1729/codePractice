import mongoose from 'mongoose';

export interface ISubmission extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  problemId: mongoose.Types.ObjectId;
  code: string;
  language: string;
  status: 'Accepted' | 'Wrong Answer' | 'Error' | 'Pending';
  executionTime?: number; // ms
  memoryUsage?: number; // MB
}

const SubmissionSchema = new mongoose.Schema<ISubmission>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Accepted', 'Wrong Answer', 'Error', 'Pending'],
      default: 'Pending',
    },
    executionTime: {
      type: Number,
    },
    memoryUsage: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema);
