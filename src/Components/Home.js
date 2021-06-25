import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import Searchbar from "./Searchbar";
import Loader from "./Loader";
import { Container, Row, Image, Col, Card, Button } from "react-bootstrap";
import PostList from "./PostList";
// import UseInfiniteScroll from './UseInfiniteScroll';

function Home() {
  const [postList, setPostList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [renderList, setrenderList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [dataPerPage, setDataPerPage] = useState(12);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPost = async () => {
    const response = await Axios.get(
      `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=1e484ce726e6978cf7164997ae8e85a4&per_page=${dataPerPage}&page=${pageNo}&format=json&nojsoncallback=1`
    );
    setTotalPages(response.data.photos.pages);
    console.log("DATA =>>>>", response.data, response.data.photos.pages);

    setrenderList([...renderList, ...response.data.photos.photo]);
  };


  const searchPost = async (value) => {
    const response = await Axios.get(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1e484ce726e6978cf7164997ae8e85a4&text=${value}&format=json&nojsoncallback=1`
    );
    console.log("DATA After Searching =>>>>", response);
    setTotalPages(response.data.photos.pages);
    
    setrenderList([...renderList, ...response.data.photos.photo]);
  };

  console.log("render list===", renderList);
  
  // useEffect(() => {
  //   fetchPost();
  // }, []);

  useEffect(() => {
    console.log("page no===", pageNo, totalPages);
    if (pageNo < totalPages) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [pageNo, totalPages]);

  const getSearchKeyword = useCallback((value) => {
    if(value){
      setSearchKeyword(value);
    searchPost(value);
    }else{
      fetchPost()
    }
    
  }, []);

  const isLastArrived = () => {
    setPageNo(pageNo + 1);
    fetchPost();
    
  };

  const renderSuggestions = () => {
    let { suggestions } = ["ritika", "kite"];
    return (
      <ul >
          {
              suggestions.map((item, index) => (<li key={index}>{item}</li>))
          }
      </ul>
  );
   
}

  return (
    <>
      <Container fluid>
        <Row className="home">
          <Col>
              <h2 style={{ textAlign: "center", color: "white" }}>Search Photos</h2>
              <Searchbar getSearchKeyword={getSearchKeyword} />
              {renderSuggestions}
          </Col>
        </Row>
         <Row className="conetnt">
          <Col>
            <PostList
              renderList={renderList}
              searchKeyword={searchKeyword}
              Loader={Loader}
              hasMore={hasMore}
              isLastArrived={isLastArrived}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
