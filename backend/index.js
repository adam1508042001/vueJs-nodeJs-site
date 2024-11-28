const express = require('express') 
const app = express()
const cors = require('cors');
const livres = require('./bdd.json')

app.use(cors());



app.listen(8080, () => {  console.log('Serveur bien en écoute')})





//definir une route http pour un  requete get
//le (req, res) => { res.send("Liste des parkings") } est un callback (une fonction exécutées chaque fois qu'une requete get est reçue pour ce chemin)
//req pour requette : ce sont les infos envoyées par le user , parametres ... 
//res reponse : configure et envoie la reponse au client 



// //route get get tout les livres
// app.get('/livres', (req,res) => { 
//     const livresDispos = livres.livres.filter(livre => livre.disponible);
//     res.status(200).json(livresDispos);

//      });

// Consulter l'historique des emprunts
app.get('/historique', (req, res) => {
    res.status(200).json(livres.historiqueEmprunts);
});

