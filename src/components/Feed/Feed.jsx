import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import * as api from "../../apiCall";
import Post from "../Post/Post";
import "./Feed.scss";

const Feed = () => {
  const pathname = window.location.pathname;
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries("feed");
  }, [pathname, queryClient]);

  const { data, isLoading, isError } = useQuery(["feed", { pathname }], () => api.selectPost(pathname));

  data?.sort(function (a, b) {
    return b.id - a.id;
  });

  if (isLoading) {
    return <div>The data is loading...</div>;
  }

  if (isError) {
    return <div>There seems to be an error...</div>;
  }

  return (
    <>
      <div className="Feed">
        {data?.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </>
  );
};

export default Feed;
