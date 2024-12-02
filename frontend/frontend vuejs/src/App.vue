<template>
    <div id="app">
      <header>
        <h1>Gestion des Livres</h1>
      </header>
      <main>
        <section>
          <Livres />
        </section>
        <section class="add-book-section">
          <AjouterLivre />
        </section>
        <section class="historique-section">
          <Historique />
        </section>
      </main>
    </div>
  </template>
  
  <script>
  import Livres from './components/Livres.vue';
  import AjouterLivre from './components/AjouterLivre.vue';
  import Historique from './components/Historique.vue';
  
  export default {
    components: {
      Livres,
      AjouterLivre,
      Historique,
    },
  };
  </script>
  
  <style scoped>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #eef2f6;
  color: #333;
  line-height: 1.6;
  padding: 20px;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

header {
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  padding: 20px;
  text-align: center;
  color: white;
}

header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Main content styles */
main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-items: center;
}

section {
  width: 100%;
}

/* Livres component styles */
.livre-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 260px;
  height: 360px;
  text-align: center;
}

.livre-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.livre-card img {
  max-width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.livre-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 10px;
}

.livre-card p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 15px;
}

.livre-card .available {
  font-weight: bold;
  color: #28a745;
}

.livre-card .unavailable {
  font-weight: bold;
  color: #e74c3c;
}

/* Buttons styles */
button {
  background: linear-gradient(90deg, #2575fc, #6a11cb);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  transform: translateY(-3px);
  background: linear-gradient(90deg, #6a11cb, #2575fc);
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Form and Add Book styles */
.add-book-section input,
.add-book-section select,
.add-book-section button {
  width: 100%;
  margin-top: 10px;
}

.add-book-section input[type="text"],
.add-book-section input[type="number"],
.add-book-section select {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.add-book-section input[type="text"]:focus,
.add-book-section input[type="number"]:focus,
.add-book-section select:focus {
  border-color: #2575fc;
  outline: none;
  box-shadow: 0 0 5px rgba(37, 117, 252, 0.5);
}

/* Historique and other sections styles */
.historique-section {
  background: #f9fafb;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

/* Responsive design */
@media screen and (max-width: 768px) {
  #app {
    width: 100%;
    padding: 15px;
  }

  main {
    grid-template-columns: 1fr;
  }

  .livre-card {
    width: 90%;
  }
}
  </style>
  