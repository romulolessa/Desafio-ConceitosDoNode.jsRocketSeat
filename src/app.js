const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {id, title, url, techs}= request.body
  let {likes}= request.body
  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repositorie)

  return response.json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs,likes}= request.body;

  const repositorieIndex = repositories.findIndex( repositorieIndex => repositorieIndex.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({error: 'repositorie not found.'})
  }
   
  const repositorie = {
    id: repositories[repositorieIndex].id,
    title,
    url,
    techs,
    likes : repositories[repositorieIndex].likes
  };

  repositories[repositorieIndex] = repositorie

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes }= request.body;

  const repositorieIndex = repositories.findIndex( repositorieIndex => repositorieIndex.id === id);
  if(repositorieIndex < 0){
    return response.status(400).json({error: 'repositorie not found.'})
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  
  const repository = repositories.find(repository => repository.id ===id);

  if(!repository){
    return response.status(400).send();
  }
  
  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;