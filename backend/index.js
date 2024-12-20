const express = require('express') 
const app = express()
const cors = require('cors');
const livres = require('./bdd.json')
const fs = require('fs');
const path = require('path');



app.use(cors());
app.use(express.json());



const getData = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'bdd.json'), 'utf8');
        return JSON.parse(data);  
    } catch (err) {
        console.error('Erreur lors de la lecture du fichier JSON:', err);
        return { livres: [], utilisateurs: [], historiqueEmprunts: [] };  
    }
};


const saveData = (data) => {
    try {
        const jsonData = JSON.stringify(data, null, 2);  // Convertit l'objet JavaScript en chaîne JSON
        fs.writeFileSync(path.join(__dirname, 'bdd.json'), jsonData, 'utf8');
    } catch (err) {
        console.error('Erreur lors de l\'écriture dans le fichier JSON:', err);
    }
};


app.listen(8080, () => {  console.log('Serveur bien en écoute')})





//definir une route http pour un  requete get
//le (req, res) => { res.send("Liste des parkings") } est un callback (une fonction exécutées chaque fois qu'une requete get est reçue pour ce chemin)
//req pour requette : ce sont les infos envoyées par le user , parametres ... 
//res reponse : configure et envoie la reponse au client 


 // route get get tout les livres
 app.get('/livres', (req, res) => {
    const data = getData();
    const livresDispos = data.livres.filter(livre => livre.disponible);
    res.status(200).json(livresDispos);
});

// Consulter l'historique des emprunts
app.get('/historique', (req, res) => {
    const data = getData();
    res.status(200).json(data.historiqueEmprunts);
}); 

//routes post

app.post('/ajoutlivre', (req, res) => {
    const data = getData();
    const newLivre = req.body;
    newLivre.id = data.livres.length + 1;
    data.livres.push(newLivre);
    saveData(data);
    res.status(200).json({ message: "Livre ajouté", livre: newLivre });
});



//post emprunter un livre 
app.post('/emprunter', (req, res) => {
    const { utilisateurId, livreId } = req.body;
    const data = getData();
    const utilisateur = data.utilisateurs.find(u => u.id === utilisateurId);
    const livre = data.livres.find(l => l.id === livreId);

    if (!utilisateur || !livre) {
        return res.status(404).json({ error: "Utilisateur ou livre non trouvé" });
    }

    // Vérification de la disponibilité du livre
    if (livre.disponible) {
        livre.disponible = false;
        utilisateur.emprunts.push({ livreId,  dateEmprunt: new Date().toISOString(),  });

        // Ajouter l'emprunt dans l'historique
        data.historiqueEmprunts.push({
            utilisateurId,
            livreId,
            dateEmprunt: new Date(),
            dateRetour: null
        });

        saveData(data);
        res.status(200).json({ message: `Livre "${livre.titre}" emprunté avec succès` });
    } else {
        res.status(400).json({ error: "Livre non disponible" });
    }
});



app.post('/retourner', (req, res) => {
    const { utilisateurId, livreId } = req.body;
    const data = getData();
    const utilisateur = data.utilisateurs.find(u => u.id === utilisateurId);
    const livre = data.livres.find(l => l.id === livreId);
    const emprunt = utilisateur.emprunts.find(e => e.livreId === livreId);

    if (!utilisateur || !livre || !emprunt) {
        return res.status(404).json({ error: "Utilisateur ou livre non trouvé ou livre non emprunté" });
    }

    livre.disponible = true;
    utilisateur.emprunts = utilisateur.emprunts.filter(e => e.livreId !== livreId);  // Retirer l'emprunt de l'utilisateur

    // Ajouter la date de retour dans l'historique
    const historique = data.historiqueEmprunts.find(e => e.livreId === livreId && e.utilisateurId === utilisateurId);
    historique.dateRetour = new Date().toISOString();

    saveData(data);
    res.status(200).json({ message: `Livre "${livre.titre}" retourné avec succès` });
});



//route put 

//  modifier un livre
app.put('/modiflivre/:id', (req, res) => {
    const livreId = parseInt(req.params.id, 10); 
    const { titre, auteur, disponible } = req.body; 

    
    const data = getData();

   
    const livre = data.livres.find(l => l.id === livreId);

    if (!livre) {
        return res.status(404).json({ error: "Livre non trouvé" });
    }


    if (titre) livre.titre = titre;
    if (auteur) livre.auteur = auteur;
    if (disponible !== undefined) livre.disponible = disponible;

 //sauvgarde
    saveData(data);

    res.status(200).json({ message: "Livre modifié avec succès", livre });
});


//routes delete

// DELETE supprimer un livre
app.delete('/supplivre/:id', (req, res) => {
    const livreId = parseInt(req.params.id, 10); 
    
    const data = getData();

    // pour trouver l'index du livre à supprimer
    const livreIndex = data.livres.findIndex(l => l.id === livreId);

    if (livreIndex === -1) {
        return res.status(404).json({ error: "Livre non trouvé" });
    }

    // Supprimer le livre
    const [deletedLivre] = data.livres.splice(livreIndex, 1);

    // Sauvegarder les modifications
    saveData(data);

    res.status(200).json({ message: "Livre supprimé avec succès", livre: deletedLivre });
});
