import { Route, Routes } from "react-router";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Products from "../../components/products/products.component";
import "./shop.styles.scss";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoryPreview />} />
      <Route path="/:category" element={<Products />} />
    </Routes>
  );
};

export default Shop;
