<!-- Historique.vue -->
<template>
    <div>
      <h2>Historique des Emprunts</h2>
      <ul>
        <li v-for="entry in historique" :key="entry.id">
          <p>{{ entry.utilisateurId }} a emprunté "{{ entry.livreId }}" le {{ entry.dateEmprunt }}</p>
          <p v-if="entry.dateRetour">Retourné le {{ entry.dateRetour }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        historique: [],
      };
    },
    methods: {
      fetchHistorique() {
        fetch('http://localhost:8080/historique')
          .then(response => response.json())
          .then(data => {
            this.historique = data;
          })
          .catch(error => {
            console.error('Erreur de récupération de l\'historique:', error);
          });
      },
    },
    mounted() {
      this.fetchHistorique();  
    },
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 15px;
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
  }
  </style>
  