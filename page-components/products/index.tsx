import {} from "react";
import { useSearchParams } from "next/navigation";

// components
import HeaderNav from "components/header-nav";
import ProductList from "components/product-list";

const Products = () => {
  const searchParams = useSearchParams();
  const sellerId = searchParams.get("sellerId");

  return (
    <>
      <HeaderNav />
      <div css={{ padding: "24px" }}>
        <ProductList sellerId={sellerId} />
      </div>
    </>
  );
};

export default Products;
