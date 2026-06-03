import mongoose from 'mongoose';

export interface IProgress extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActive: Date;
  completedTopics: string[];
  completedLessons: string[];
  quizScores: {
    lessonId: string;
    score: number;
    total: number;
  }[];
  unlockedBadges: string[];
}

const ProgressSchema = new mongoose.Schema<IProgress>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now },
    completedTopics: [{ type: String }],
    completedLessons: [{ type: String }],
    quizScores: [
      {
        lessonId: String,
        score: Number,
        total: Number,
      }
    ],
    unlockedBadges: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);
