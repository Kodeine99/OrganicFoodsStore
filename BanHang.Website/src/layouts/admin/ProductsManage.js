import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createPicture,
  getAllProduct,
  getAllProductAdmin,
} from "../../app/productSlice";
import ProductSearchAdmin from "../../components/shared/card/ProductCard/ProductSearchAdmin";
import AddToProductModal from "../../components/shared/Modal/AddToProductModal";
import CustomPagination from "../../components/shared/pagination/CustomPagination";
import Table from "react-bootstrap/Table";
import ProductRow from "../../components/shared/card/ProductCard/ProductRow";

function ProductsManage(props) {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState({});
  const [valuesFilter, setValuesFilter] = useState({});
  const pageSize = 10;
  const products = useSelector((state) => state.product.productResult2);
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [active, setActive] = useState(0);
  useEffect(() => {
    const onLoad = async (valuesFilter) => {
      await onLoadData(valuesFilter);
    };
    onLoad(valuesFilter);
  }, [pageIndex, valuesFilter, active]);

  const onLoadData = async (valuesFilter) => {
    // console.log("valuesFilter", valuesFilter);
    const actionProduct = await dispatch(
      getAllProductAdmin({
        ...valuesFilter,
        PageIndex: pageIndex,
        PageSize: pageSize,
      })
    );
    const apiProduct = await unwrapResult(actionProduct);
    setPagination(apiProduct.result);
    // console.log("product", products);
  };

  return (
    <div className="admin__products">
      <div className="admin__products-header d-flex justify-content-between">
        <h3 className={"m-b-20 font-weight-bold"}>Products management</h3>
			
																				
        <AddToProductModal />
      </div>

      <div className="admin__product-search">
        <ProductSearchAdmin
          setValuesFilter={(valuesFilter) => setValuesFilter(valuesFilter)}
          setPageIndex={(pageIndex) => setPageIndex(pageIndex)}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center m-3">
						 
								 
          {pageIndex * pageSize > pagination.totalRecords ? (
            <h6>
              Showing {pageSize * (pageIndex - 1) + 1}-{pagination.totalRecords} of{" "}
              {pagination.totalRecords} results
																	  
            </h6>
          ) : (
            <h6>
              Showing {pageSize * (pageIndex - 1) + 1}-{pageSize * pageIndex} of{" "}
              {pagination.totalRecords} results
            </h6>
          )}
          <CustomPagination
            pagination={pagination}
            page={pageIndex}
            setPage={(page) => setPageIndex(page)}
          />
      </div>
      <div className="admin__product-table">
        <Table bordered hover>
          <thead>
            <tr className="list-cart">
              <th className="col-1 text-center  align-middle">STT</th>
				  
				   
              <th className="col-2 text-center align-middle ">Product Name</th>
              <th className="col-2 text-center  align-middle">Category Name</th>
							 
				   
              <th className="col-1 text-center align-middle">Supplier Name</th>
							 
				   
              <th className="col-1 text-center align-middle">Unitil Price</th>
						   
				   
              <th className="col-1 text-center align-middle">
                Available Quantity
              </th>
              <th className="col-2 text-center align-middle">Create Date</th>
						  
				   
              <th className="col-2 text-center align-middle">Exp Date</th>
						  
				   
              <th className="col-1 text-center align-middle">Active</th>
					  
				   
              <th className="col-1 text-center align-middle">Update</th>
					  
				   
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <ProductRow
                key={index}
                product={product}
                index={index}
                pageIndex={pageIndex}
                pageSize={pageSize}
                setActive={() => setActive(active+1)}
              />
            ))}
          </tbody>
        </Table>
														 
      </div>
    </div>
  );
}

export default ProductsManage;
