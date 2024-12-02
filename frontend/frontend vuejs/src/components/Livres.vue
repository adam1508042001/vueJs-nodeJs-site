<!-- Livres.vue -->
<template>
    <div>
      <h1>Liste des livres disponibles</h1>
      <ul>
        <li v-for="livre in livres" :key="livre.id">
          <strong>{{ livre.titre }}</strong> - {{ livre.auteur }}
          <span v-if="livre.disponible" class="disponible">Disponible</span>
          <span v-else class="emprunte">Emprunté</span>
          
          <!-- Bouton pour emprunter un livre -->
          <button @click="emprunterLivre(livre.id)" v-if="livre.disponible">Emprunter</button>
          
          <!-- Bouton pour retourner un livre -->
          <button @click="retournerLivre(livre.id)" v-else>Retourner</button>
          
          <!-- Bouton pour supprimer un livre -->
          <button @click="supprimerLivre(livre.id)">Supprimer</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        livres: [],  // Tableau pour stocker les livres récupérés
      };
    },
    methods: {
      // Récupérer la liste des livres
      fetchLivres() {
        fetch('http://localhost:8080/livres')  // Route du backend pour récupérer les livres
          .then(response => response.json())
          .then(data => {
            this.livres = data;
          })
          .catch(error => {
            console.error('Erreur de récupération des livres:', error);
          });
      },
      // Emprunter un livre
      emprunterLivre(livreId) {
        const utilisateurId = 1;  // Utilisateur en exemple, à remplacer par l'ID réel de l'utilisateur connecté
        fetch('http://localhost:8080/emprunter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ utilisateurId, livreId }),
        })
          .then(response => response.json())
          .then(data => {
            alert(data.message);
            this.fetchLivres();  // Actualiser la liste des livres après emprunt
          })
          .catch(error => {
            console.error('Erreur d\'emprunt:', error);
          });
      },
      // Retourner un livre
      retournerLivre(livreId) {
        const utilisateurId = 1;  // Utilisateur en exemple, à remplacer par l'ID réel de l'utilisateur connecté
        fetch('http://localhost:8080/retourner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ utilisateurId, livreId }),
        })
          .then(response => response.json())
          .then(data => {
            alert(data.message);
            this.fetchLivres();  // Actualiser la liste des livres après retour
          })
          .catch(error => {
            console.error('Erreur de retour de livre:', error);
          });
      },
      // Supprimer un livre
      supprimerLivre(livreId) {
        fetch(`http://localhost:8080/supplivre/${livreId}`, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(data => {
            alert(data.message);
            this.fetchLivres();  // Actualiser la liste des livres après suppression
          })
          .catch(error => {
            console.error('Erreur de suppression du livre:', error);
          });
      },
    },
    mounted() {
      this.fetchLivres();  // Récupérer les livres lors du montage du composant
    },
  };
  </script>
  
  <style scoped>
  .disponible {
    color: green;
  }
  
  .emprunte {
    color: red;
  }
  
  button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  button:disabled {
    background-color: #ccc;
  }
  </style>
  