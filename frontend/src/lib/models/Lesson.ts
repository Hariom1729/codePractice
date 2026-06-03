import mongoose from 'mongoose';

export interface ILesson extends mongoose.Document {
  topicId: string;
  lessonId: string; // e.g. "chapter-1"
  title: string;
  order: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  
  // Content Sections
  theory: {
    content: string;
    analogies?: string[];
    realWorldApps?: string[];
  };
  
  visualization?: {
    type: string; // "array-memory", "linked-list", "tree", "graph", etc.
    initialState: any;
  };
  
  codeExamples?: {
    language: string;
    code: string;
    explanation: string;
  }[];
  
  complexity?: {
    time: string;
    space: string;
    explanation: string;
  };
  
  quiz?: {
    question: string;
    type: 'MCQ' | 'Prediction' | 'DragDrop';
    options?: string[];
    correctAnswer: string | number;
    explanation: string;
  }[];
}

const LessonSchema = new mongoose.Schema<ILesson>(
  {
    topicId: { type: String, required: true, index: true },
    lessonId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    order: { type: Number, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], required: true },
    
    theory: {
      content: { type: String, required: true },
      analogies: [String],
      realWorldApps: [String],
    },
    
    visualization: {
      type: { type: String },
      initialState: mongoose.Schema.Types.Mixed,
    },
    
    codeExamples: [
      {
        language: String,
        code: String,
        explanation: String,
      }
    ],
    
    complexity: {
      time: String,
      space: String,
      explanation: String,
    },
    
    quiz: [
      {
        question: String,
        type: { type: String, enum: ['MCQ', 'Prediction', 'DragDrop'] },
        options: [String],
        correctAnswer: mongoose.Schema.Types.Mixed,
        explanation: String,
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Lesson || mongoose.model<ILesson>('Lesson', LessonSchema);
