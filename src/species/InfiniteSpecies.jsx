import { isElement } from "react-dom/cjs/react-dom-test-utils.production.min";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    error,
    isFetching,
  } = useInfiniteQuery("speciece", ({ url = initialUrl }) => fetchUrl(url), {
    getNextPageParam: (last) => last.next || undefined,
  });

  console.log(data);
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  return (
    <>
      {isFetching && <div style={{ display: "fixed" }}>Fetching </div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((item) =>
          item.results.map((jtem) => (
            <Species
              key={jtem.name}
              name={jtem.name}
              language={jtem.language}
              averageLifespan={jtem.averageLifespan}
            />
          ))
        )}
      </InfiniteScroll>
      ;
    </>
  );
}
