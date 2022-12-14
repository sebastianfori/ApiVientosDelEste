import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as authHelper from "./helpers/auth.helper";
import * as usersController from "./controllers/users.controller";
import * as categoriesController from "./controllers/categories.controller";
import * as partsController from "./controllers/parts.controller";
import * as diagramsController from "./controllers/diagrams.controller";
import * as auditorDiagramsController from "./controllers/auditor-diagrams.controller";
import * as userDiagramsController from "./controllers/user-diagrams.controller";
import * as loginController from "./controllers/login.controller";

dotenv.config();

const hostname = process.env.HOSTNAME || 'localhost';
const port = Number.parseInt(process.env.PORT || '3000');

const app = express();
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
    methods: "GET, POST, PUT, DELETE"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(authHelper.authenticateToken);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Vientos del Este API');
});

app.post('/login', loginController.login);
app.post('/logout', loginController.logout);

app.get('/users', usersController.getAllUsers);
app.post('/users/search', usersController.getUsers);
app.get('/users/:id', usersController.getUser);
app.post('/users', usersController.createUser);
app.put('/users/:id', usersController.updateUser);
app.delete('/users/:id', usersController.deleteUser);

app.get('/parts', partsController.getAllParts);
app.post('/parts/search', partsController.getParts);
app.get('/parts/:id', partsController.getPart);
app.post('/parts', partsController.createPart);
app.put('/parts/:id', partsController.updatePart);
app.delete('/parts/:id', partsController.deletePart);

app.get('/categories', categoriesController.getAllCategories);
app.post('/categories/search', categoriesController.getCategories);
app.get('/categories/:id', categoriesController.getCategory);
//app.post('/categories', categoriesController.createCategory);
//app.put('/categories/:id', categoriesController.updateCategory);
//app.delete('/categories/:id', categoriesController.deleteCategory);

app.get('/diagrams', diagramsController.getAllDiagrams);
app.post('/diagrams/search', diagramsController.getDiagrams);
app.get('/diagrams/:id', diagramsController.getDiagram);
app.post('/diagrams', diagramsController.createDiagram);
app.put('/diagrams/:id', diagramsController.updateDiagram);
app.delete('/diagrams/:id', diagramsController.deleteDiagram);

app.get('/auditor-diagrams', auditorDiagramsController.getAllAuditorDiagrams);
app.post('/auditor-diagrams/search', auditorDiagramsController.getDiagrams);
app.get('/auditor-diagrams/:id', auditorDiagramsController.getDiagram);
//app.post('/auditor-diagrams', auditorDiagramsController.createDiagram);
app.put('/auditor-diagrams/:id', auditorDiagramsController.updateDiagram);
//app.delete('/auditor-diagrams/:id', auditorDiagramsController.deleteDiagram);

app.get('/user-diagrams', userDiagramsController.getAllUserDiagrams);
app.post('/user-diagrams/search', userDiagramsController.getDiagrams);
app.get('/user-diagrams/:id', userDiagramsController.getDiagram);
app.post('/user-diagrams', userDiagramsController.createDiagram);
app.put('/user-diagrams/:id', userDiagramsController.updateDiagram);
app.delete('/user-diagrams/:id', userDiagramsController.deleteDiagram);


app.listen(port, hostname, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server running at http://${hostname}:${port}/ `);
});