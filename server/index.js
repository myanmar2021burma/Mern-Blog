
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');

// =====================================
// 1. Load Environment Variables
// =====================================

require('dotenv').config({
    path: path.join(__dirname, '.env')
});

console.log(
    'MONGO_URI loaded:',
    Boolean(process.env.MONGO_URI)
);

// =====================================
// 2. Initialize Express App
// =====================================

const app = express();

// =====================================
// 3. Import Middleware
// =====================================

const {
    notFound,
    errorHandler
} = require('./middleware/errorMiddleware');

// =====================================
// 4. Import Routes
// =====================================

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// =====================================
// 5. Built-in Middleware
// =====================================

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// =====================================
// 6. CORS Configuration
// =====================================

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

// =====================================
// 7. File Upload Middleware
// =====================================

app.use(fileUpload({
    createParentPath: true
}));

// =====================================
// 8. Static Files
// =====================================

app.use(
    '/uploads',
    express.static(path.join(__dirname, 'uploads'))
);

// =====================================
// 9. API Routes
// =====================================

app.use('/api/users', userRoutes);

app.use('/api/posts', postRoutes);

// =====================================
// 10. Error Handling Middleware
// =====================================

app.use(notFound);

app.use(errorHandler);

// =====================================
// 11. Database Connection
// =====================================

const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
    console.error(
        'ERROR: MONGO_URI is missing. Please check server/.env'
    );

    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');

        // =====================================
        // 12. Start Server
        // =====================================

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
            console.log(`API URL: http://localhost:${PORT}/api`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    });
