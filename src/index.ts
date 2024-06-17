import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use('/api', userRoutes);

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
