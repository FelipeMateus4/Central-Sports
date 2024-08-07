import { app } from './app';
import sequelize from './Connections/Sequelize';

const PORT = 5000;
app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    try {
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
