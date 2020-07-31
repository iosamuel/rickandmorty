<template>
  <div class="characters grid grid-cols-2 md:grid-cols-3 gap-4">
    <div
      class="character p-4 border shadow-md"
      v-for="character in characters"
      :key="character.id"
    >
      <img :src="character.image" :alt="character.name" />
      <div class="description">
        <p><strong>Name: </strong> {{ character.name }}</p>
        <p><strong>Species: </strong> {{ character.species }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Characters",
  props: ["characters"]
};
</script>
