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
  const [date, setDate] = useState(``);


/* Calculate and append date */
const getDate = () => {
  const targetDate = new Date();
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate() - 1 < 10 ? `0${targetDate.getDate() - 1}` :targetDate.getDate() - 1 ;
  const monthMinusone = month - 1 ;
  const constructedDate = [year, `0` + monthMinusone, day].join("-");
  setDate(constructedDate);
  console.log(constructedDate);
  console.log(typeof(month));
}
  useEffect(() => {
    const fetchPosts = async () => {
      try {
      getDate();
      setLoading(true);
      console.log( `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&per_page=100&page=${apiPage}`)
       const res = await axios.get(
        `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&per_page=100&page=${apiPage}`
      );
      setPosts(res.data.items);
      setLoading(false);
       }
       catch (e){
        console.log("that failed", e); 
       }
    };

    fetchPosts(posts);
  }, [date, apiPage]);


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
