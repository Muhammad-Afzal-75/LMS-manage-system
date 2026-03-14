import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Course from './models/Course.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Course.deleteMany();

    // Create Admin and Instructor
    const admin = await User.create({
      name: 'Muhammad Afzal',
      email: 'afzalofficial.dev@gmail.com',
      password: 'password123',
      role: 'admin'
    });

    const instructor = await User.create({
      name: 'Instructor Ali',
      email: 'instructor@example.com',
      password: 'password123',
      role: 'instructor'
    });

    console.log('Users seeded!');

    // Create Sample Courses using local images from public/images
    const courses = [
      {
        title: 'Complete MERN Stack Mastery 2024',
        description: 'Master MongoDB, Express, React, and Node.js with real-world projects. Build scalesble applications from scratch.',
        instructor: instructor._id,
        category: 'Web Development',
        price: 99.99,
        image: '/images/photo-1488229297570-58520851e868.avif',
        duration: '12 Weeks',
        students: '15,420'
      },
      {
        title: 'Advanced React Architecture',
        description: 'Dive deep into React hooks, context API, and performance optimization techniques for large scale apps.',
        instructor: instructor._id,
        category: 'Frontend',
        price: 79.99,
        image: '/images/photo-1599658880436-c61792e70672.avif',
        duration: '8 Weeks',
        students: '8,120'
      },
      {
        title: 'Professional Node.js Backend Development',
        description: 'Build robust APIs, handle authentication, security, and deploy to production like a pro.',
        instructor: instructor._id,
        category: 'Backend',
        price: 89.99,
        image: '/images/photo-1617240016072-d92174e44171.avif',
        duration: '10 Weeks',
        students: '12,050'
      },
      {
        title: 'Python for Data Science Bootcamp',
        description: 'Learn Python programming and how to use it for data analysis and machine learning.',
        instructor: instructor._id,
        category: 'Data Science',
        price: 109.99,
        image: '/images/photo-1662638600476-d563fffbb072.avif',
        duration: '12 Weeks',
        students: '22,400'
      },
      {
        title: 'UI/UX Design Fundamental to Advanced',
        description: 'Master Figma and design principles to create stunning user interfaces and amazing experiences.',
        instructor: instructor._id,
        category: 'Design',
        price: 59.99,
        image: '/images/premium_photo-1661878265739-da90bc1af051.avif',
        duration: '6 Weeks',
        students: '9,850'
      },
      {
        title: 'iOS & Android App Development (Flutter)',
        description: 'Build beautiful native apps for both iOS and Android from a single codebase using Flutter.',
        instructor: instructor._id,
        category: 'Mobile Development',
        price: 129.99,
        image: '/images/premium_photo-1663023612721-e588768ef403.avif',
        duration: '14 Weeks',
        students: '11,200'
      },
      {
        title: 'Cyber Security: From Zero to Hero',
        description: 'Protect systems from cyber attacks and learn ethical hacking from the ground up.',
        instructor: instructor._id,
        category: 'Cyber Security',
        price: 149.99,
        image: '/images/istockphoto-2200128716-612x612.webp',
        duration: '16 Weeks',
        students: '5,600'
      }
    ];

    await Course.insertMany(courses);
    console.log('Courses seeded!');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
