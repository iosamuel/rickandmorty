<template>
  <div id="app" class="container mx-auto">
    <div id="nav" class="flex flex-col items-center">
      <div class="search">
        <input
          type="text"
          placeholder="Buscar..."
          class="border p-2 outline-none"
          v-model="filter"
        />
      </div>
      <div class="pagination">
        <router-link :to="`/${prev}`">Prev</router-link> |
        <router-link :to="`/${next}`">Next</router-link>
      </div>
    </div>
    <router-view :characters="filteredCharacters" />
  </div>
</template>

<script>
import { request as fetchGQL } from "graphql-request";

export default {
  data: () => ({
    prev: null,
    next: null,
    filter: "",
    characters: []
  }),
  methods: {
    fetchCharacters(page) {
      fetchGQL(
        "https://rickandmortyapi.com/graphql",
        /* GraphQL */ `
          query($page: Int) {
            characters(page: $page) {
              info {
                count
                pages
                next
                prev
              }
              results {
                id
                name
                status
                species
                type
                gender
                image
                created
              }
            }
          }
        `,
        {
          page
        }
      ).then(data => {
        this.characters = data.characters.results;
        this.prev = data.characters.info.prev;
        this.next = data.characters.info.next;
      });
    }
  },
  watch: {
    "$route.params.page": {
      handler: function(newRoute) {
        this.fetchCharacters(parseInt(newRoute));
        this.filter = "";
      },
      immediate: true
    }
  },
  computed: {
    filteredCharacters() {
      return this.characters.filter(character =>
        character.name.toLowerCase().includes(this.filter.toLowerCase())
      );
    }
  }
};
</script>

<style lang="scss"></style>
