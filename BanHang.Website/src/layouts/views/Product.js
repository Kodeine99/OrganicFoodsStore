import { React, useEffect, useState } from "react";
import ProductSideBar from "../../components/product/product-left/ProductSideBar";
import ProductCard from "../../components/shared/card/ProductCard/ProductCard";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, searchProduct } from "../../app/productSlice";
import ProductRate from "../../components/product/product-left/ProductRate";
import CustomPagination from "../../components/shared/pagination/CustomPagination";
import { unwrapResult } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";

export default function Product() {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState({});
  const [valuesFilter, setValuesFilter] = useState({});
  const [valueSearch, setValuesSearch] = useState({});
  const [valueSort, setValueSort] = useState({});
  const pageSize = 6;
  const products = useSelector((state) => state.product.productResult);
  const location = useLocation();
  const filter = location.state?.search ? location.state?.search : null;
  const change = location.state?.change ? location.state?.change : null;

  const filter2 = location.state?.search2 ? location.state?.search2 : null;

  const SortBy = [
    "Relevance",
    "Name, A to Z",
    "Name, Z to A",
    "Price, low to high",
    "Price, high to low",
  ];

  useEffect(() => {
    if (filter) {
      setValuesSearch({ Search: filter });
      // setValuesFilter({});
    }
  }, [filter, change]);
  useEffect(() => {
    filter2 && setValuesSearch({ Search: filter2 });
  }, [filter2]);
  useEffect(() => {
    const onLoad = async (valuesFilter, valueSearch, valueSort) => {
      await onLoadData(valuesFilter, valueSearch, valueSort);
    };
    onLoad(valuesFilter, valueSearch, valueSort);
  }, [pageIndex, valuesFilter, valueSearch, valueSort]);

  const onLoadData = async (valuesFilter, valueSearch, valueSort) => {
    const actionProduct = await dispatch(
      getAllProduct({
        ...valuesFilter,
        ...valueSearch,
        ...valueSort,
        PageIndex: pageIndex,
        PageSize: pageSize,
      })
    );
    //end
    const apiProduct = await unwrapResult(actionProduct);
    setPagination(apiProduct.result);
  };
  const onChangeSortby = (e) => {
    setValueSort({ SortBy: parseInt(e.target.value) });
    setPageIndex(1);
  };
  return (
    <div className="product container ">
      <div className="product__left col-lg-3">
        <div className="product__side-bar">
          <ProductSideBar
            setValuesFilter={(valuesFilter) => setValuesFilter(valuesFilter)}
            setPageIndex={(pageIndex) => setPageIndex(pageIndex)}
            setValuesSearch={() => setValuesSearch({})}
          />
        </div>
        <div className="product__rate pt-4 ">
          <ProductRate />
        </div>
      </div>

      <div className="product__right col-xs-12 col-sm-12 col-md-12 col-lg-9">
        <div className="product_result d-flex mb-3">
          <div className="sortby">
            <h6>Sort by:</h6>
            <select
              name="sortby"
              id="sortby"
              onChange={(e) => onChangeSortby(e)}
            >
              {SortBy.map((item, index) => (
                <option className="sortby--item" value={index}>
                  {item}
                </option>
              ))}
            </select>
            {/* {valuesFilter&&valuesFilter} */}
          </div>
          {pageIndex * pageSize > pagination.totalRecords ? (
            <h6>
              Showing {pageSize * (pageIndex - 1) + 1}-{pagination.totalRecords}{" "}
              of {pagination.totalRecords} results
            </h6>
          ) : (
            <h6>
              Showing {pageSize * (pageIndex - 1) + 1}-{pageSize * pageIndex} of{" "}
              {pagination.totalRecords} results
            </h6>
          )}
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
