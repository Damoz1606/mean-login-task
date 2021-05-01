import app from './app'

//listener
app.listen(app.get("port"), () => {
    console.log(`Server on port: ${app.get("port")}`);
});