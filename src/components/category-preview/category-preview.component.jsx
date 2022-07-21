import { Fragment } from "react";
import { Link } from "react-router-dom";
import { CategoriesState } from "../../contexts/categories.context";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";

const CategoryPreview = () => {
  const { categoriesMap } = CategoriesState();
  return (
    <>
      {Object.keys(categoriesMap).map((key) => (
        <Fragment key={key}>
          <h1 style={{ textAlign: "center" }}>
            <Link to={`/shop/${key}`}>
              <span>{key.toLocaleUpperCase()}</span>
            </Link>
          </h1>
          <div className="products-container">
            {categoriesMap[key].slice(0, 4).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default CategoryPreview;
