const express = require('express') 
const app = express()
const cors = require('cors');

app.use(cors());


app.listen(8080, () => {  console.log('Serveur bien en écoute')})





//definir une route http pour un  requete get
//le (req, res) => { res.send("Liste des parkings") } est un callback (une fonction exécutées chaque fois qu'une requete get est reçue pour ce chemin)
//req pour requette : ce sont les infos envoyées par le user , parametres ... 
//res reponse : configure et envoie la reponse au client 
 
app.get('/livres', (req,res) => {    res.send(" Liste des livres")})

