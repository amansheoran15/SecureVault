const app = require('./app');
const {connectDatabase} = require('./config/database')

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: `./config/config.env` });
}

connectDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
});