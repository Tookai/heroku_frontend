import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import * as api from "../../apiCall";
import Post from "../Post/Post";
import "./Feed.scss";
import Loader from "react-loader-spinner";

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
    return (
      <div>
        <Loader type="ThreeDots" color="#fd2d01" height={80} width={100} />
      </div>
    );
  }

  if (isError) {
    window.location.reload();
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
