<template>
  <div class="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">{{ peli.titulo }}</p>
      </header>
      <div class="card-image" @click="isModalActive=true">
        <figure class="image">
          <img :src="peli.imagen">
        </figure>
      </div>
      <footer class="card-footer">
        <a
          class="button is-light card-footer-item"
          :class="{ 'is-primary': this.$store.state.favIds.indexOf(peli.id) !== -1}"
          @click="toggleFav"
        >
          <span>{{ peli.favoritos }}</span>
          <b-icon icon="star"></b-icon>
        </a>
      </footer>

      <!-- Modal para el resumen y año de estreno -->
      <b-modal :active.sync="isModalActive">
        <div class="card">
          <div class="card-content">
            <h2 class="title">
              {{ peli.titulo }}
              <small>({{ peli.estreno }})</small>
            </h2>
            <p>{{peli.resumen}}</p>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    peli: {
      type: Object
    }
  },
  data() {
    return {
      isModalActive: false
    };
  },
  methods: {
    toggleFav() {
      // Si estamos identificados... que lo deberíamos
      if (this.$store.state.token) {
        return this.$axios
          .put(
            "/favorita/",
            { id: this.peli.id },
            {
              headers: {
                Authorization: `Token ${this.$store.state.token}`
              }
            }
          )
          .then(res => {
            if (res.data.id) {
              this.$store.commit("toggleFav", res.data.id);
              if (res.data.favorita) {
                this.peli.favoritos += 1;
              } else {
                this.peli.favoritos -= 1;
              }
            }
          })
          .catch(error => {
            alert(Object.values(error.response.data));
          });
      } else {
        alert("Necesitas identificarte para marcar pelis favoritas");
      }
    }
  }
};
</script>

<style>
.card-image,
.modal-background {
  cursor: pointer !important;
}
</style>
