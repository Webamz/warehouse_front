// import React from "react";
// import Footer from "../../fragments/footer/Footer";
// import styles from "../../../../css/UserHome.module.css";
// import style from "../../../../css/Footer.module.css";
// import BackgroundHome from "../../fragments/background/BackgroundHome";
// import { useState, useLayoutEffect } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import MyTheWarehousesDataService from "../../../../api/warehouse/MyTheWarehousesDataService";

// const MyTheWarehouses = () => {
//   const navigate = useNavigate();

//   const [state, setState] = useState({
//     theWarehouses: [],
//   });

//   const [welcomeDiv, setWelcomeDiv] = useState({ showDiv: false });

//   const handleSort = (value) => (event) => {
//     event.preventDefault();
//     let path = "/theWarehouse/" + value;
//     navigate(path, { state: { id: value } });
//   };

//   useLayoutEffect(() => {
//     let unmounted = false;

//     MyTheWarehousesDataService().then((response) => {
//       if (!unmounted) {
//         setState(response.data);
//         setWelcomeDiv({ showDiv: false });
//       }
//       if (!Object.keys(response.data).length) {
//         setWelcomeDiv({ showDiv: true });
//       }
//     });
//     return () => {
//       unmounted = true;
//     };
//   }, []);
//   return (
//     <>
//       <BackgroundHome />
//       <main className={styles.theWarehouse_main}>
//         <section className={styles.theWarehouse_container_home}>
//           {state.length !== undefined && (
//             <section className={styles.cards}>
//               {state.map((warehouse) => (
//                 <div key={warehouse.id} className={styles.rapper}>
//                   <Link
//                     to="#"
//                     onClick={handleSort(warehouse.id)}
//                     className={styles.card}
//                     id={warehouse.id}
//                   >
//                     <section className={styles.card_image_container}>
//                       <img src={warehouse.profileImgUrl} alt="warehouse" />
//                     </section>

//                     <section className={styles.card_content}>
//                       <p className={styles.card_title}>{warehouse.name}</p>
//                       <div className={styles.card_info}>
//                         <p className={styles.text_medium}> Find out more...</p>
//                         <p className={styles.card_price}>{warehouse.price} RWF</p>
//                       </div>
//                     </section>
//                   </Link>
//                 </div>
//               ))}
//             </section>
//           )}

//           {welcomeDiv.showDiv && (
//             <div>
//               <article className={styles.introduction_home}>
//                 <div className={styles.intro_text}>
//                   <p>You have no saved theWarehouses.</p>
//                 </div>
//               </article>
//             </div>
//           )}
//         </section>
//       </main>
//       <Footer class={style.footer_theWarehouse_details} />
//     </>
//   );
// };

// export default MyTheWarehouses;






import React, { useState, useEffect } from "react";
import Footer from "../../fragments/footer/Footer";
import styles from "../../../../css/UserHome.module.css";
import style from "../../../../css/Footer.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import MyTheWarehousesDataService from "../../../../api/warehouse/MyTheWarehousesDataService";

const MyTheWarehouses = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    warehouses: [],
    searchedWarehouses: [],
  });

  useEffect(() => {
    MyTheWarehousesDataService().then((response) => {
      setState({ warehouses: response.data, searchedWarehouses: response.data });
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
      setState({ ...state, searchedWarehouses: warehouses });
    } else {
      let searchedWarehouses = warehouses.filter((warehouse) =>
        warehouse.name.toLowerCase().includes(value.toLowerCase())
      );
      setState({ ...state, searchedWarehouses });
    }
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
                  setState({ ...state, searchedWarehouses: warehouses });
                }}
              >
                <option value="">Filter</option>
                <option value="price_asc">Price Ascending</option>
                <option value="price_desc">Price Descending</option>
              </select>
            </div>
          </div>

             

          {state.searchedWarehouses.map((warehouse) => (
            <div key={warehouse.id} className={styles.rapper}>
              <Link
                to={`/theWarehouse/${warehouse.id}`}
                onClick={() => handleSort(warehouse.id)}
                className={styles.card}
                id={warehouse.id}
              >
                <section className={styles.card_image_container}>
                  <img src={warehouse.profileImgUrl} alt="warehouse" />
                </section>

                <section className={styles.card_content}>
                  <p className={styles.card_title}>{warehouse.name}</p>
                  <div className={styles.card_info}>
                    <p className={styles.text_medium}>Find out more...</p>
                    <p className={styles.card_price}>{warehouse.price} RWF</p>
                  </div>
                </section>
              </Link>
            </div>
          ))}
        </section>

      </main>
      <Footer class={style.footer_theWarehouse_details} />
    </>
  );
};

export default MyTheWarehouses;







