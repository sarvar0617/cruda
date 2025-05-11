import React, { useState, useEffect } from "react";
import { fetchData } from "../hooks/Api";

const CategoryPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal).then((data) => {
      setData(data);
    });
    return () => {
      controller.abort();
    };
  }, []);

  const uniqueCategories = [
    ...new Set(data.products?.map((item) => item.category)),
  ];

  return (
    <div className="flex gap-5 mt-20 container mx-auto justify-between flex-wrap">
      {uniqueCategories.map((category) => {
        const product = data.products?.find(
          (item) => item.category === category
        );
        return (
          <div
            className="shadow-2xl rounded-xl cursor-pointer  "
            key={category}
          >
            <div>
              <div className="w-[250px] h-[300px] ">
                {console.log(product)}
                <img src={product.images[0]} />
              </div>
              <h2 className="text-center text-2xl mb-10">{category}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryPage;
