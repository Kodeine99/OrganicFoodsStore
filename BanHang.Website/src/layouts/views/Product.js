import { React, useEffect, useState } from "react";
import ProductSideBar from "../../components/product/product-left/ProductSideBar";
import ProductCard from "../../components/shared/card/ProductCard/ProductCard";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../app/productSlice";
import ProductRate from "../../components/product/product-left/ProductRate";
import CustomPagination from "../../components/shared/pagination/CustomPagination";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Product() {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState({});
  const [valuesFilter, setValuesFilter] = useState({});
  const pageSize = 6;
  const products = useSelector((state) => state.product.productResult);

  useEffect(() => {
    const onLoad = async (valuesFilter) => {
      await onLoadData(valuesFilter);
    };
    onLoad(valuesFilter);
  }, [pageIndex, valuesFilter]);

  const onLoadData = async (valuesFilter) => {
    console.log("valuesFilter", valuesFilter);
    const actionProduct = await dispatch(
      getAllProduct({
        ...valuesFilter,
        PageIndex: pageIndex,
        PageSize: pageSize,
      })
    );
    const apiProduct = await unwrapResult(actionProduct);
    setPagination(apiProduct.result);
  };
  return (
    <div className="product container ">
      <div className="product__left col-lg-3">
        <div className="product__side-bar">
          <ProductSideBar
            setValuesFilter={(valuesFilter) => setValuesFilter(valuesFilter)}
          />
        </div>
        <div className="product__rate pt-4 ">
          <ProductRate />
        </div>
      </div>

      <div className="product__right col-xs-12 col-sm-12 col-md-12 col-lg-9">
        <div className="product_result d-flex justify-content-end mb-3">
          <h6>
            Showing {pageSize * (pageIndex - 1) + 1}-{pageSize * pageIndex} of{" "}
            {pagination.totalRecords} results
          </h6>
        </div>
        <div className="product__conntent">
          <Row lg={3} md={3} sm={2} xs={2}>
            {products.map((product, index) => (
              <Col xs={12} sm={12} md={6} lg={4} className="mb-3">
                <ProductCard
                  key={index}
                  productName={product.name}
                  rate={product.averageRate}
                  price={product.unitPrice}
                  // imgUrl={`img/product/product/${product?.pictures[0]?.fileName}`}
                  imgUrl={product?.pictures[0]?.filePath}
                  productId={product.id}
                />
              </Col>
            ))}
          </Row>
        </div>
        <div className="product__page-pagination d-flex justify-content-center">
          <CustomPagination
            pagination={pagination}
            page={pageIndex}
            setPage={(page) => setPageIndex(page)}
          />
        </div>
      </div>
      <div className="product__side-bar--mobile">
        <ProductSideBar
          setValuesFilter={(valuesFilter) => setValuesFilter(valuesFilter)}
        />
      </div>
    </div>
  );
}
