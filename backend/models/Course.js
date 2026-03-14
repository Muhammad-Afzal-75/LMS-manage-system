import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    default: 0.0
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  duration: {
    type: String,
    default: '8 Weeks'
  },
  students: {
    type: String,
    default: '0'
  }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
