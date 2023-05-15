import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

import styles from "../../../../css/UserHome.module.css";
import style from "../../../../css/Footer.module.css";

import MyTheWarehousesDataService from "../../../../api/warehouse/MyTheWarehousesDataService";

import Footer from "../../fragments/footer/Footer";

const MyTheWarehouses = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    warehouses: [],
    searchedWarehouses: [],
    currentPage: 1,
  });

  useEffect(() => {
    MyTheWarehousesDataService().then((response) => {
      setState({
        warehouses: response.data,
        searchedWarehouses: response.data.slice(0, 3),
        currentPage: 1,
      });
    });
  }, []);

  const handleSort = (id) => {
    let path = "/theWarehouse/" + id;
    navigate(path, { state: { id: id } });
  };

  const handleFilter = (event) => {
    const { value } = event.target;
    let warehouses = [...state.warehouses];
    if (value === "") {
      setState({
        ...state,
        searchedWarehouses: warehouses.slice(
          (state.currentPage - 1) * 3,
          state.currentPage * 3
        ),
      });
    } else {
      let searchedWarehouses = warehouses.filter((warehouse) =>
        warehouse.name.toLowerCase().includes(value.toLowerCase())
      );
      setState({
        ...state,
        searchedWarehouses: searchedWarehouses.slice(
          (state.currentPage - 1) * 3,
          state.currentPage * 3
        ),
      });
    }
  };

  const handlePageChange = (pageNumber) => {
    setState({
      ...state,
      searchedWarehouses: state.warehouses.slice(
        (pageNumber - 1) * 3,
        pageNumber * 3
      ),
      currentPage: pageNumber,
    });
  };

  return (
    <>
      <main className={styles.theWarehouse_main}>
        <section className={styles.theWarehouse_container_home}>
          <div className={styles.header}>
            <div className={styles.search_container}>
              <IoMdSearch className={styles.search_icon} />
              <input
                type="text"
                placeholder="Search"
                className={styles.search_input}
                onChange={handleFilter}
              />
            </div>
            <div className={styles.filter_container}>
              <FaFilter className={styles.filter_icon} />
              <select
                className={styles.filter_select}
                onChange={(e) => {
                  let warehouses = [...state.warehouses];
                  if (e.target.value === "price_asc") {
                    warehouses.sort((a, b) => a.price - b.price);
                  } else if (e.target.value === "price_desc") {
                    warehouses.sort((a, b) => b.price - a.price);
                  }
                  setState({
                    ...state,
                    searchedWarehouses: warehouses.slice(
                      (state.currentPage - 1) * 3,
                      state.currentPage * 3
                    ),
                  });
                }}
              >
                <option value="">Filter</option>
                <option value="price_asc">Price Ascending</option>
                <option value="price_desc">Price Descending</option>
              </select>
            </div>
          </div>

          {state.searchedWarehouses.map((warehouse) => (
            <div
              key={warehouse.id}
              className={`${styles.warehouse_card} ${styles.theWarehouse_container}`}
            >
              <img
                className={styles.warehouse_image}
                src={warehouse.profileImgUrl}
                alt={warehouse.name}
              />
              <div className={styles.warehouse_details}>
                <h3>{warehouse.name}</h3>
                <p>{warehouse.price} Rwf</p>
                <button
                  className={styles.details_button}
                  onClick={() => handleSort(warehouse.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
          <div className={styles.pagination_container}>
            {state.warehouses.length > 0 && (
              <div className={styles.pagination}>
                {state.currentPage > 1 && (
                  <button
                    className={styles.page_button}
                    onClick={() =>
                      handlePageChange(state.currentPage - 1)
                    }
                  >
                    Prev
                  </button>
                )}

                {[...Array(Math.ceil(state.warehouses.length / 3))].map(
                  (page, index) => (
                    <button
                      key={index}
                      className={`${styles.page_button} ${index + 1 === state.currentPage && styles.active
                        }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                {state.currentPage <
                  Math.ceil(state.warehouses.length / 3) && (
                    <button
                      className={styles.page_button}
                      onClick={() =>
                        handlePageChange(state.currentPage + 1)
                      }
                    >
                      Next
                    </button>
                  )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer className={style.footer} />
    </>
  );
};

export default MyTheWarehouses;