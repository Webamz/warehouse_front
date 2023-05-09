import React from "react";
import styles from "../../../../../css/TheWarehouse.module.css";
import AuthenticationService from "../../../../../api/authentication/AuthenticationService";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WarehouseDetailsDataService from "../../../../../api/warehouse/WarehouseDetailsDataService";
import { useMediaQuery } from "beautiful-react-hooks";
import gallery_styles from "../../../../../css/Gallery.module.css";
import DeleteWarehouseService from "../../../../../api/warehouse/DeleteWarehouseService";
import IsWarehouseSavedService from "../../../../../api/warehouse/IsWarehouseSavedService";
import SaveWarehouseService from "../../../../../api/warehouse/SaveWarehouseService";
import RemoveWarehouseService from "../../../../../api/warehouse/RemoveWarehouseService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


import jsPDF from "jspdf";










const TheWarehousePages = () => {
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  const isBusinessLoggedIn = AuthenticationService.isBusinessLoggedIn();
  let navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  let params = useParams();

  const id = params.id;
  const [currentPage, setCurrentPage] = useState("about");

  const [warehouse, setWarehouse] = useState({
    name: "",
    slogan: "",
    intro: "",
    description: "",
    price: "",
    profileImgUrl: "",
    galleryImgUrl1: "",
    galleryImgUrl2: "",
    galleryImgUrl3: "",
    contactInfo: "",
  });

  const [theWarehouseDiv, setTheWarehouseDiv] = useState({ showDiv: false });

  const handleDelete = (warehouse) => (event) => {
    event.preventDefault();

    confirmAlert({
      title: "Delete Offer",
      message: "Are you sure you want to delete this offer?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await DeleteWarehouseService(warehouse.id);

            if (response.data !== null) {
              window.location.href = "/business-home";
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };


  const handleDownload = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();
  
    // Add the warehouse name, about, and contact information to the PDF
    pdf.text(20, 20, `Warehouse Name: ${warehouse.name}`);
    pdf.text(20, 30, `About: ${warehouse.description}`);
    pdf.text(20, 40, `Contact Information: ${warehouse.contactInfo}`);
  
    // Download the PDF
    pdf.save(`${warehouse.name}.pdf`);
  };

  const handleEdit = (warehouse) => (event) => {
    event.preventDefault();
    let path = "/edit-offer";
    navigate(path, {
      state: {
        id: warehouse.id,
        name: warehouse.name,
        slogan: warehouse.slogan,
        intro: warehouse.intro,
        description: warehouse.description,
        price: warehouse.price,
        contactInfo: warehouse.contactInfo,
        profileImgUrl: warehouse.profileImgUrl,
        galleryImgUrl1: warehouse.galleryImgUrl1,
        galleryImgUrl2: warehouse.galleryImgUrl2,
        galleryImgUrl3: warehouse.galleryImgUrl3,
      },
    });
  };

  const handleSave = (id) => (event) => {
    event.preventDefault();

    if (!saved) {
      SaveWarehouseService(id).then((response) => {
        setSaved(true);
        console.log(saved);
      });
    } else {
      RemoveWarehouseService(id).then((response) => {
        setSaved(false);
        console.log(saved);
      });
    }
  };

  useEffect(() => {
    let unmounted = false;

    if (isUserLoggedIn) {
      IsWarehouseSavedService(id).then((response) => {
        if (!unmounted) {
          setSaved(response.data);
          console.log(saved);
        }
      });
    }
    if (isBusinessLoggedIn || isUserLoggedIn) {
      WarehouseDetailsDataService(id).then((response) => {
        if (!unmounted) {
          setWarehouse(response.data);
          console.log(response.data);
          setTheWarehouseDiv({ showDiv: false });
        }
        if (!Object.keys(response.data).length) {
          setTheWarehouseDiv({ showDiv: true });
        }
      });
    }
    return () => {
      unmounted = true;
    };
  }, [id, isUserLoggedIn, isBusinessLoggedIn, saved]);

  const isColumnBasedSmall = useMediaQuery("(max-width: 1200px)");

  const changePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      {isColumnBasedSmall && (
        <div>
          {" "}
          <span className={styles.theWarehouse_title_small}>
            <b>{warehouse.name}</b>
          </span>{" "}
          <h4 className={styles.slogan_small}> {warehouse.slogan} </h4>
        </div>
      )}

      <section
        className={
          isColumnBasedSmall
            ? styles.theWarehouse_container_small
            : styles.theWarehouse_container
        }
      >
        {warehouse !== undefined && (
          <div
            className={
              isColumnBasedSmall
                ? styles.theWarehouse_content_small
                : styles.theWarehouse_content
            }
          >
            {currentPage !== "gallery" && (
              <section className={styles.theWarehouse_cover}>
                <img
                  className={styles.theWarehouse_cover}
                  src={warehouse.profileImgUrl}
                  alt="profile"
                />
              </section>
            )}

            <div
              className={
                isColumnBasedSmall
                  ? styles.theWarehouse_content_body_small
                  : styles.theWarehouse_content_body
              }
            >
              {!isColumnBasedSmall && (
                <article className={styles.theWarehouse_pages}>
                  <span
                    onClick={() => changePage("about")}
                    className={
                      currentPage === "about" ? styles.theWarehouse_active : ""
                    }
                  >
                    about
                  </span>
                  <span
                    onClick={() => changePage("more")}
                    className={
                      currentPage === "more" ? styles.theWarehouse_active : ""
                    }
                  >
                    more
                  </span>
                  <span
                    onClick={() => changePage("gallery")}
                    className={
                      currentPage === "gallery" ? styles.theWarehouse_active : ""
                    }
                  >
                    gallery
                  </span>
                  <span
                    onClick={() => changePage("contact")}
                    className={
                      currentPage === "contact" ? styles.theWarehouse_active : ""
                    }
                  >
                    contact
                  </span>
                  <span 
                  >
                    <button onClick={handleDownload}>Download PDF</button>
                  </span>

                </article>
              )}

              {isColumnBasedSmall && (
                <article className={styles.theWarehouse_pages_horizontal}>
                  <span
                    onClick={() => changePage("about")}
                    className={
                      currentPage === "about"
                        ? styles.theWarehouse_active_small
                        : styles.theWarehouse_small
                    }
                  >
                    about
                  </span>
                  <span
                    onClick={() => changePage("more")}
                    className={
                      currentPage === "more"
                        ? styles.theWarehouse_active_small
                        : styles.theWarehouse_small
                    }
                  >
                    more
                  </span>
                  <span
                    onClick={() => changePage("gallery")}
                    className={
                      currentPage === "gallery"
                        ? styles.theWarehouse_active_small
                        : styles.theWarehouse_small
                    }
                  >
                    gallery
                  </span>
                  <span
                    onClick={() => changePage("contact")}
                    className={
                      currentPage === "contact"
                        ? styles.theWarehouse_active_small
                        : styles.theWarehouse_small
                    }
                  >
                    contact
                  </span>
                </article>
              )}

              <section className={styles.theWarehouse_lable}>
                {!isColumnBasedSmall && (
                  <div>
                    {" "}
                    <span className={styles.theWarehouse_title}>
                      <b>{warehouse.name}</b>
                    </span>
                    <h4 className={styles.slogan}> {warehouse.slogan} </h4>
                  </div>
                )}

                {currentPage === "about" && <p>{warehouse.intro}</p>}

                {currentPage === "more" && <p> {warehouse.description} </p>}

                {currentPage === "gallery" && (
                  <section className={gallery_styles.gallery}>
                    <div className={gallery_styles.row}>
                      <article className={gallery_styles.column}>
                        <img
                          className={gallery_styles.img}
                          src={warehouse.profileImgUrl}
                          alt="gallery"
                        />
                        <img
                          className={gallery_styles.img}
                          src={warehouse.galleryImgUrl1}
                          alt="gallery"
                        />
                      </article>

                      <article className={gallery_styles.column}>
                        <img
                          className={gallery_styles.img}
                          src={warehouse.galleryImgUrl2}
                          alt="gallery"
                        />
                        <img
                          className={gallery_styles.img}
                          src={warehouse.galleryImgUrl3}
                          alt="gallery"
                        />
                      </article>
                    </div>
                  </section>
                )}

                {currentPage === "contact" && <p> {warehouse.contactInfo} </p>}

                {currentPage !== "gallery" && (
                  <article className={styles.buttons}>
                    {isBusinessLoggedIn && (
                      <div>
                        <Link
                          to="#"
                          onClick={handleEdit(warehouse)}
                          className={styles.btn}
                        >
                          Edit{" "}
                        </Link>
                        <Link
                          to="#"
                          onClick={handleDelete(warehouse)}
                          className={styles.btn}
                        >
                          Delete{" "}
                        </Link>
                      </div>
                    )}
                    {isUserLoggedIn && (
                      <div onClick={handleSave(warehouse.id)}>
                        {saved ? (
                          <span className={styles.btn}>Remove</span>
                        ) : (
                          <span className={styles.btn}>Save</span>
                        )}
                      </div>
                    )}
                  </article>
                )}
              </section>
            </div>
          </div>
        )}

        {theWarehouseDiv.showDiv && (
          <div className={styles.error_message}>
            <article className={styles.error_text}>
              <p> This warehouse does not exist.</p>
            </article>
          </div>
        )}
      </section>
    </>
  );
};

export default TheWarehousePages;
