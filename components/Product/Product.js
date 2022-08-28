import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart.slice";
import styles from "../../styles/ProductCard.module.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  console.log(product);

  return (
    <div className={styles.card}>
      <Image src={product.image} height={300} width={220} alt="hello" />
      <h4 className={styles.title}>{product.name}</h4>

      <p>$ {product.price}</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        className={styles.button}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
