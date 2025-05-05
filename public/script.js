const API_URL = '/api/movies';

const movieForm = document.getElementById('movieForm');
const movieList = document.getElementById('movieList');

movieForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const imageURL = document.getElementById('imageURL').value;
  const description = document.getElementById('description').value;
  const year = parseInt(document.getElementById('year').value);
  const category = document.getElementById('category').value;

  const newMovie = { name, imageURL, description, year, category };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMovie)
    });

    if (!res.ok) {
      throw new Error('Failed to create movie');
    }

    movieForm.reset();
    loadMovies();
  } catch (err) {
    console.error('❌ Error adding movie:', err.message);
  }
});

async function loadMovies() {
  try {
    const res = await fetch(API_URL);
    const movies = await res.json();

    movieList.innerHTML = '';
    movies.forEach(movie => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${movie.name} (${movie.year})</h3>
        <p><strong>${movie.category}</strong>: ${movie.description}</p>
        <img src="${movie.imageURL}" width="200" /><br/>
        <button onclick="editMovie('${movie._id}')">✏️ Edit</button>
        <button onclick="deleteMovie('${movie._id}')">🗑️ Delete</button>
        <hr/>
      `;
      movieList.appendChild(div);
    });
  } catch (err) {
    console.error('❌ Error loading movies:', err.message);
  }
}

async function deleteMovie(id) {
  if (!confirm('Are you sure you want to delete this movie?')) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    loadMovies();
  } catch (err) {
    console.error('❌ Delete error:', err.message);
  }
}

async function editMovie(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const movie = await res.json();

    const name = prompt('Edit name:', movie.name);
    const imageURL = prompt('Edit image URL:', movie.imageURL);
    const description = prompt('Edit description:', movie.description);
    const year = parseInt(prompt('Edit year:', movie.year));
    const category = prompt('Edit category:', movie.category);

    const updatedMovie = { name, imageURL, description, year, category };

    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMovie)
    });

    loadMovies();
  } catch (err) {
    console.error('❌ Edit error:', err.message);
  }
}

// Load movies on page load
loadMovies();
