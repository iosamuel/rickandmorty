interface Variables {
  [variable: string]: any;
}

export function fetchGQL(query: string, variables?: Variables) {
  console.log(variables);
  return new Promise((resolve, reject) => {
    fetch("https://rickandmortyapi.com/graphql", {
      method: "post",
      body: JSON.stringify({
        query,
        variables,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          // eslint-disable-next-line
          console.log("ERROR:", data.errors);
        }
        resolve(data);
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.error("ERROR:", err);

        reject(err);
      });
  });
}
