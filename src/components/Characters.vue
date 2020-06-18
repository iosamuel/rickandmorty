<template>
  <input class="search-bar" type="text" v-model="filterCharacters" />

  <div class="cards">
    <div class="cards__card" v-for="character in characters">
      <img :src="character.image" :alt="character.name" />
      <div class="card__content">
        <h3>{{ character.name }}</h3>
        <p>Status: {{ character.status }}</p>
        <p>Specie: {{ character.species }}</p>
        <p>
          Creation:
          {{
            new Intl.DateTimeFormat("es-CO").format(new Date(character.created))
          }}
        </p>
      </div>
    </div>
  </div>

  <nav>
    <router-link
      :to="`/${info.prev}`"
      class="prev"
      :class="{ disable: !info.prev }"
    >
      Prev
    </router-link>
    <span>Page: {{ currentPage }} / {{ info.pages }}</span>
    <router-link
      :to="`/${info.next}`"
      class="prev"
      :class="{ disable: !info.next }"
    >
      Next
    </router-link>
  </nav>
</template>

<script lang="ts">
import { useCharacters } from "../composable/useCharacters";
import { computed, unref, ref } from "vue";

export default {
  name: "Characters",
  setup() {
    const { characters, info, filterCharacters } = useCharacters();

    const currentPage = computed(() => {
      const { next, prev } = unref(info);
      return next ? next - 1 : prev + 1;
    });

    return {
      characters,
      info,
      currentPage,
      filterCharacters
    };
  }
};
</script>

<style lang="scss" src="../assets/characters.scss"></style>
