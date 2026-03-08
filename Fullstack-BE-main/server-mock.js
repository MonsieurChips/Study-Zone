// Mock Backend Server - Works without MongoDB
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock lesson data
const mockLessons = [
  {
    _id: '1',
    name: 'Web Development Fundamentals',
    category: 'Technology',
    location: 'Online',
    price: 99.99,
    availableSpaces: 15,
    image: '/images/web_development_intro.png',
    description: 'Learn the basics of HTML, CSS, and JavaScript in this comprehensive beginner course.'
  },
  {
    _id: '2', 
    name: 'Graphic Design Essentials',
    category: 'Design',
    location: 'New York',
    price: 79.99,
    availableSpaces: 8,
    image: '/images/graphic_design_intro.png',
    description: 'Master the principles of graphic design and create stunning visual compositions.'
  },
  {
    _id: '3',
    name: 'Mobile Photography',
    category: 'Photography',
    location: 'Los Angeles',
    price: 59.99,
    availableSpaces: 12,
    image: '/images/mobile_photography.png',
    description: 'Capture professional-quality photos using just your smartphone camera.'
  },
  {
    _id: '4',
    name: 'Japanese for Travelers',
    category: 'Language',
    location: 'Tokyo',
    price: 89.99,
    availableSpaces: 20,
    image: '/images/japanese_for_travelers.png',
    description: 'Essential Japanese phrases and cultural tips for travelers visiting Japan.'
  },
  {
    _id: '5',
    name: 'Public Speaking Mastery',
    category: 'Business',
    location: 'Chicago',
    price: 69.99,
    availableSpaces: 10,
    image: '/images/public_speaking.png',
    description: 'Overcome stage fright and deliver powerful, persuasive presentations.'
  },
  {
    _id: '6',
    name: 'Creative Cooking',
    category: 'Culinary',
    location: 'London',
    price: 74.99,
    availableSpaces: 6,
    image: '/images/creative_cooking.png',
    description: 'Explore innovative cooking techniques and create restaurant-quality dishes at home.'
  },
  {
    _id: '7',
    name: 'Music Production with Ableton',
    category: 'Music',
    location: 'Nashville',
    price: 119.99,
    availableSpaces: 5,
    image: '/images/music_production_ableton.png',
    description: 'Produce professional music tracks using Ableton Live software.'
  },
  {
    _id: '8',
    name: 'Data Visualization with D3.js',
    category: 'Technology',
    location: 'San Francisco',
    price: 94.99,
    availableSpaces: 9,
    image: '/images/data_visualization_d3.png',
    description: 'Create interactive and beautiful data visualizations using D3.js.'
  },
  {
    _id: '9',
    name: 'Sustainable Living',
    category: 'Lifestyle',
    location: 'Portland',
    price: 49.99,
    availableSpaces: 25,
    image: '/images/sustainable_living.png',
    description: 'Learn practical ways to reduce your environmental impact and live more sustainably.'
  },
  {
    _id: '10',
    name: 'Game Development Introduction',
    category: 'Technology',
    location: 'Seattle',
    price: 109.99,
    availableSpaces: 7,
    image: '/images/game_development_intro.png',
    description: 'Create your first video game using Unity game engine and C# programming.'
  },
  {
    _id: '11',
    name: 'Digital Marketing Masterclass',
    category: 'Marketing',
    location: 'Austin',
    price: 84.99,
    availableSpaces: 18,
    image: '/images/digital_marketing_masterclass.png',
    description: 'Master SEO, social media marketing, and content creation strategies.'
  },
  {
    _id: '12',
    name: 'Blockchain & Crypto 101',
    category: 'Technology',
    location: 'Miami',
    price: 129.99,
    availableSpaces: 4,
    image: '/images/blockchain_crypto_101.png',
    description: 'Understand blockchain technology and cryptocurrency fundamentals.'
  },
  {
    _id: '13',
    name: 'Advanced Game Design',
    category: 'Technology',
    location: 'Boston',
    price: 139.99,
    availableSpaces: 3,
    image: '/images/advanced_game_design.png',
    description: 'Take your game development skills to the next level with advanced design principles.'
  },
  {
    _id: '14',
    name: 'Cloud Computing Introduction',
    category: 'Technology',
    location: 'Denver',
    price: 149.99,
    availableSpaces: 11,
    image: '/images/cloud_computing_intro.png',
    description: 'Learn AWS, Azure, and Google Cloud Platform fundamentals.'
  }
];

// Mock orders array (in-memory storage)
let mockOrders = [];

// API Routes
app.get('/api/lessons/', (req, res) => {
  console.log('GET /api/lessons/ - Returning mock lessons data');
  res.json(mockLessons);
});

app.get('/api/lessons/search', (req, res) => {
  const query = req.query.query ? req.query.query.toLowerCase() : '';
  const filteredLessons = mockLessons.filter(lesson => 
    lesson.name.toLowerCase().includes(query) ||
    lesson.category.toLowerCase().includes(query) ||
    lesson.location.toLowerCase().includes(query)
  );
  console.log(`GET /api/lessons/search?query=${query} - Found ${filteredLessons.length} lessons`);
  res.json(filteredLessons);
});

app.post('/api/orders/', (req, res) => {
  try {
    const order = {
      _id: Date.now().toString(),
      ...req.body,
      createdAt: new Date()
    };
    
    mockOrders.push(order);
    console.log('POST /api/orders/ - Order created:', order._id);
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: order
    });
  } catch (error) {
    console.error('POST /api/orders/ - Error:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

app.get('/api/orders/', (req, res) => {
  console.log('GET /api/orders/ - Returning all orders');
  res.json(mockOrders);
});

app.get('/api/orders/:id', (req, res) => {
  const order = mockOrders.find(o => o._id === req.params.id);
  if (order) {
    console.log(`GET /api/orders/${req.params.id} - Order found`);
    res.json(order);
  } else {
    console.log(`GET /api/orders/${req.params.id} - Order not found`);
    res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }
});

app.put('/api/lessons/:id', (req, res) => {
  try {
    const lessonId = req.params.id;
    const updateData = req.body;
    
    const lessonIndex = mockLessons.findIndex(l => l._id === lessonId);
    
    if (lessonIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }
    
    // Update the lesson with new data
    mockLessons[lessonIndex] = {
      ...mockLessons[lessonIndex],
      ...updateData
    };
    
    console.log(`PUT /api/lessons/${lessonId} - Lesson updated`);
    res.json({
      success: true,
      message: 'Lesson updated successfully',
      lesson: mockLessons[lessonIndex]
    });
  } catch (error) {
    console.error(`PUT /api/lessons/${req.params.id} - Error:`, error);
    res.status(400).json({
      success: false,
      message: 'Failed to update lesson',
      error: error.message
    });
  }
});

// Serve static images from the public folder
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Serve static frontend files from Fullstack-FE-master
app.use(express.static(path.join(__dirname, '../Fullstack-FE-master')));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Fullstack-FE-master/index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Mock StudyZone API is running',
    timestamp: new Date().toISOString(),
    lessons: mockLessons.length,
    orders: mockOrders.length
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock StudyZone Server is running on port ${PORT}`);
  console.log(`📚 Available endpoints:`);
  console.log(`   GET  /api/lessons/ - Get all lessons`);
  console.log(`   GET  /api/lessons/search?query=<text> - Search lessons`);
  console.log(`   POST /api/orders/ - Create order`);
  console.log(`   GET  /api/orders/ - Get all orders`);
  console.log(`   GET  /health - Health check`);
  console.log(`🖼️  Images served from: /images/*`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Mock StudyZone Server shutting down...');
  process.exit(0);
});