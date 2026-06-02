import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  password?: string;
  name?: string;
  role: 'user' | 'admin';
  solvedProblems: mongoose.Types.ObjectId[];
  bookmarkedProblems: mongoose.Types.ObjectId[];
  activityLogs: Date[];
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      select: false,
    },
    name: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    solvedProblems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
      },
    ],
    bookmarkedProblems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
      },
    ],
    activityLogs: [
      {
        type: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
