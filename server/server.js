import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connect from './database/connection.js'
import router from './router/router.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || '8080';


app.use(express.json());
app.use(cors())
app.use(morgan('tiny'));
app.disable('x-powered-by');

app.use('/api', router);

app.get('/', (req, res) => {
    res.status(201).json('HOME GET REQUEST');
});

connect()
    .then(() => {
        try {
            app.listen(PORT, () => {
                console.log(`Server is listening on http://localhost:${PORT}`);
            });
        } catch (error) {
            console.log('Cannot connect to the server...!');
        }
    })
    .catch((error) => {
        console.log('Invalid database connection...!', error)
    })
