import React, { useEffect, useCallback, useState, useRef } from "react";
import "./PostList.css";
import { Container} from "react-bootstrap";
import ImageModal from './ImageModal';

function PostList(
  {
  renderList,
  isLastArrived,
  searchKeyword,
  Loader,
  hasMore,
}) {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const observer = useRef();
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState("");

  const loadMore = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      if (!hasMore || loading || searching) return;
      observer.current = new IntersectionObserver((enteries) => {
        if (enteries[0].isIntersecting) {
          setTimeout(() => {
            isLastArrived(list.length);
            setLoading(false);
          }, 1000);
          setLoading(true);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, isLastArrived, loading, searching, list]
  );

  useEffect(() => {
    setList(renderList);
  }, [renderList]);

  useEffect(() => {
    setSearching(true);
    setList(
      renderList &&
        renderList.filter(
          (post) =>
            post.title &&
            post.title.toUpperCase().includes(searchKeyword.toUpperCase())
        )
    );
    searchKeyword.length === 0 && setSearching(false);
  }, [searchKeyword, renderList]);


  const render = useCallback(() => {
    return (
      <div className="container">
        <div
          style={{ marginTop: "2rem", marginLeft: "2%" }}
          className=" container row"
        >
          {list &&
            list.map((post, i) => (
              <div className="col-4 mb-4 mt-1" key={i} ref={loadMore}>
                <div
                  className="card h-100"
                  style={{
                    width: "18rem",
                    borderRadius: "20px",
                  }}
                  onClick={() => {
                    setDataModal(post)
                    setShowModal(true)
                  }}
                >
                  <img
                    src={`https://live.staticflickr.com/${post.server}/${post.id}_${post.secret}.jpg`}
                    style={{ height: "18rem" }}
                    className="card-img-top"
                    alt="..."
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }, [list, loadMore]);

  return (
    <>
    <Container>
      <div className="postList">
        {render()}
        <section>{loading && <Loader />}</section>
      </div>
    </Container>
   { showModal ? <ImageModal show={showModal} dataModal={dataModal} onClose={() => setShowModal(false)}/> : null}
    </>
  );
}
export default PostList;
