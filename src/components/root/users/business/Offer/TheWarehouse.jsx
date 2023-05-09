import React from "react";
import Footer from "../../../fragments/footer/Footer";
import BackgroundHome from "../../../fragments/background/BackgroundHome";
import TheWarehousePages from "./TheWarehousePages";
import { useMediaQuery } from "beautiful-react-hooks";
import styles from "../../../../../css/TheWarehouse.module.css";
import style from "../../../../../css/Footer.module.css";
import "react-confirm-alert/src/react-confirm-alert.css";

const TheWarehouse = () => {
  const isColumnBasedSmall = useMediaQuery("(max-width: 900px)");
  console.log(isColumnBasedSmall);

  return (
    <>
      <main
        className={
          isColumnBasedSmall ? styles.theWarehouse_main_small : styles.theWarehouse_main
        }
      >
        <TheWarehousePages />
        <BackgroundHome />
      </main>

      <Footer class={style.footer_theWarehouse_details} />
    </>
  );
};

export default TheWarehouse;
