import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Description from "../../components/product/product-detail/Description";
import ProductCardBig from "../../components/shared/card/ProductCard/ProductCardBig";
import Tabs from "../../components/shared/tab/Tabs";
import ListCommentCard from "../../components/shared/card/commentCard/ListCommentCard";
import CommentAdd from "../../components/shared/card/commentCard/CommentAdd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAllCommentByProductId } from "../../app/commentSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { getProductById } from "../../app/productSlice";
import { useCookies } from "react-cookie";

const ProductDetail = () => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const location = useLocation();
  const productId = location.pathname.substring(16);

  const [comments, setComment] = useState([]);
  const [product, setProduct] = useState({});
  // const commentResult = useSelector((state) => state.comment.commentResult);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const [visible, setVisiable] = useState();
  // const [hide,setHide]=useState();
  const loadMore = () =>
    visible > 4 ? setVisiable(visible - 4) : setVisiable(0);
  const onHide = () =>
    visible < comments.length - 4
      ? setVisiable(visible + 4)
      : setVisiable(visible);

  useEffect(() => {
    const Loaddata = async () => {
      const actionProduct = await dispatch(getProductById(productId));
      const itemProduct = await unwrapResult(actionProduct);

      setProduct(itemProduct);

      onLoad();
    };

    Loaddata();
  }, [loading]);

  const onLoad = async () => {
    const actionComment = await dispatch(getAllCommentByProductId(productId));
    const item = await unwrapResult(actionComment);
    await setComment(item.result);
    comments && setVisiable(item.result.length - 4);
  };
  const header = [
    { id: "description", title: "Description" },
    { id: "reviews", title: "Reviews" },
  ];

  return (
    <Container>
      <div className="product-details">
        <div className="product-details__top">
          <Row xs={12}>
            {/* <Col sm={12}> */}
            {Object.keys(product).length > 0 && (
              <ProductCardBig
                productName={product.name}
                rate={product.averageRate}
                price={product.unitPrice}
                imgUrl={product?.pictures[0]?.filePath}
                describe={product.description}
                netWeight={product.weight}
                availableQuantity={product.availableQuantity}
                createDate={product.createDate}
                expDate={product.expDate}
                productId={product.id}
              />
            )}
            {/* </Col> */}
          </Row>
        </div>
        <div className="product-details__bottom m-t-30">
          <Tabs headers={header} defaultId="description">
            <div id="description">
              <Description
                supplierName={product.supplierName}
                categoryName={product.categoryName}
                createDate={product.createDate}
                expDate={product.expDate}
              />
            </div>
            <div id="reviews">
              <div className="comment__list">
                {comments && visible && comments.length > 4
                  ? comments
                      .slice(visible, comments.length)
                      .map((comment, index) => (
                        <ListCommentCard
                          key={index}
                          fullName={comment.fullName}
                          rate={comment.rate}
                          content={comment.content}
                          imgUrl={comment.imgUrl}
                        />
                      ))
                  : comments.map((comment, index) => (
                      <ListCommentCard
                        key={index}
                        fullName={comment.fullName}
                        rate={comment.rate}
                        content={comment.content}
                        imgUrl={comment.imgUrl}
                      />
                    ))}
                {/* {visible} {comments.length} */}
                <div className="d-flex justify-content-end">
                  {visible > 0 && comments.length > 4 && (
                    <button
                      onClick={() => loadMore()}
                      type="button"
                      className="font-italic d-block "
                    >
                      Load more comment
                    </button>
                  )}
                </div>
                <div className="d-flex justify-content-end">
                  {visible < comments.length - 4 && comments.length > 4 && (
                    <button
                      onClick={() => onHide()}
                      type="button"
                      className="font-italic d-block "
                    >
                      Hide comments
                    </button>
                  )}
                </div>
              </div>
              {cookie["access_token"] && (
                <div className="comment__add">
                  <div className="addcomment_info">
                    <CommentAdd
                      load={() => setloading(!loading)}
                      productId={product.id}
                    />
                  </div>
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;
