import React from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart.slice";

const Product = (props) => {
  const {
    data: { id, name, price, image },
  } = props;

  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className={styles.card}>
      <Image src={image} alt={name} height="540" width="540" />
      <h3>{name}</h3>
      <p>{price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
      <button
        onClick={() => {
          dispatch(addToCart(props.data));
          router.push("/cart");
        }}
      >
        Add to card
      </button>
    </div>
  );
};

export default Product;
