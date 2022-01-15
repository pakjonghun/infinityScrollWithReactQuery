import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query

  const {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery("people", ({ page = initialUrl }) => fetchUrl(page), {
    getNextPageParam: (last) => last.next || undefined,
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  return (
    <>
      {isFetching && (
        <div style={{ position: "fixed", top: "0" }}>Fetching</div>
      )}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((data) => {
          return data.results.map((p) => {
            return (
              <Person
                key={p.name}
                name={p.name}
                hairColor={p.hair_color}
                eyeColor={p.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
