import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import Header from "./Header/Header";
import CardElement from "./CardElement/CardElement";
import Pagination from "./Pagination/Pagination";

const LandingPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiPage, setApiPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://api.github.com/search/repositories?q=created:>2021-06-01&sort=stars&order=desc&per_page=100&page=${apiPage}`
      );
      setPosts(res.data.items);
      setLoading(false);
    };

    fetchPosts(posts);
  }, [apiPage]);


  /* Constants to keep Caculate First,Last and Current post */
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  /* Updates ApiPage state to get the new page */
  const fetchNextPage = (pageNumber) => {
    setCurrentPage(currentPage + 1);
    if (currentPage == 10) {
      setApiPage(apiPage + 1);
      setCurrentPage(1);
    }
  };

  return (
    <section>
      <Header />
      {posts && !loading ? (
        <CardElement posts={currentPosts} />
      ) : (
        <Loader
          type="Oval"
          color="red"
          height={50}
          width={50}
          timeout={3000}
          className="loader"
        />
      )}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        fetchNextPage={fetchNextPage}
      />
    </section>
  );
};

export default LandingPage;
