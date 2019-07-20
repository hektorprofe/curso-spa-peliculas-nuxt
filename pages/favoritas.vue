<template>
  <section class="section">
    <h2 class="title">Favoritas</h2>
    <div class="columns is-multiline">
      <Peli
        v-for="favorita in favoritas"
        :key="favorita.pelicula.id"
        :peli="favorita.pelicula"
      />
    </div>
  </section>
</template>

<script>
import Peli from '~/components/Peli'

export default {
  components: {
    Peli
  },
  asyncData ({ store, $axios, $toast }) {
    if (store.state.token) {
      return $axios.get('/favoritas/', {
        headers: {
          'Authorization': `Token ${store.state.token}`
        }
      })
      .then((res) => {
        // Añadimos los ids de las pelis favoritas al store
        if (store.state.favIds.length == 0) {
          res.data.forEach((fav) => {
            store.commit('toggleFav', fav.pelicula.id)
          });
        }
        return {
          'favoritas': res.data
        }
      })
      .catch((error) => {
        alert(Object.values(error.response.data))
      })
    }
  },
  fetch ({ store, redirect }) {
    if (!store.state.user) {
      return redirect('/')
    }
  }
}
</script>