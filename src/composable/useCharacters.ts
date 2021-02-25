import { watchEffect, reactive, toRefs, watch } from "vue";
import { fetchGQL, useDebouncedRef } from "../utils";
import { ICharacter, RInfo, ICharacters } from "../types";
import { useRouter } from "vue-router";
import queryCharacters from "../graphql/queryCharacters.gql";

export function useCharacters() {
  const { currentRoute, push } = useRouter();
  const filterCharacters = useDebouncedRef("", 500);
  const state = reactive<ICharacters>({
    info: {
      count: 0,
      pages: 0,
      next: 0,
      prev: 0,
    },
    characters: [],
  });
  const variables = reactive({
    page: 0,
    filter: {
      name: "",
    },
  });

  const startCurrentRouteWatcher = (immediate = true) => {
    return watch(
      currentRoute,
      (route, oldRoute) => {
        if (route !== oldRoute) {
          variables.page = parseInt(route.params.page as string);
        }
      },
      {
        immediate,
      }
    );
  };
  let stopCurrentRouteWatcher = startCurrentRouteWatcher();

  watch(filterCharacters, (val, oldVal) => {
    if (val !== oldVal) {
      stopCurrentRouteWatcher();
      variables.page = 0;
      variables.filter.name = val;
      push("/").then(() => {
        stopCurrentRouteWatcher = startCurrentRouteWatcher(false);
      });
    }
  });

  watchEffect(async () => {
    const response = (await fetchGQL(queryCharacters, variables)) as any;
    if (response.data.characters) {
      state.characters = response.data.characters.results as ICharacter[];
      state.info = response.data.characters.info as RInfo;
    }
  });

  return {
    ...toRefs(state),
    filterCharacters,
  };
}
