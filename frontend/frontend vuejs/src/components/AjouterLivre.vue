<!-- AjouterLivre.vue -->
<template>
    <div>
      <h2>Ajouter un livre</h2>
      <form @submit.prevent="ajouterLivre">
        <div>
          <label for="titre">Titre</label>
          <input v-model="newLivre.titre" id="titre" type="text" required />
        </div>
        <div>
          <label for="auteur">Auteur</label>
          <input v-model="newLivre.auteur" id="auteur" type="text" required />
        </div>
        
        <div>
          <label for="disponible">Disponible</label>
          <input type="checkbox" v-model="newLivre.disponible" />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newLivre: {
          titre: '',
          auteur: '',
          image: '',
          disponible: true,
        },
      };
    },
    methods: {
      ajouterLivre() {
        fetch('http://localhost:8080/ajoutlivre', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newLivre),
        })
          .then(response => response.json())
          .then(data => {
            alert(data.message);
            this.newLivre = { titre: '', auteur: '', image: '', disponible: true };  // Réinitialiser le formulaire
          })
          .catch(error => {
            console.error('Erreur d\'ajout du livre:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  form div {
    margin-bottom: 10px;
  }
  
  button {
    background-color: #28a745;
    color: white;
    padding: 10px;
    cursor: pointer;
  }
  </style>
  