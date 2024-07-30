import { app } from './app';
import sequelize from './Connections/Sequelize';

const PORT = 5000;
app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
