import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";

const schema = yup.object().shape({
  branch_id: yup.string().label("Project"),
  products: yup.array().of(
    yup.object().shape({
      product_type: yup.string().label("Product Type"),
      unit_number: yup.string().required().label("Unit Number"),
      floor_number: yup.string().label("Floor Number"),
      layout_type_id: yup.string().label("Layout type"),
      size_in: yup.string().label("Size in")
    })
  )
});

const Product = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { numberOfProduct: "0" }
  });

  // dynamic field using useFieldArray
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products"
  });

  const numberOfProduct = watch("numberOfProduct");

  useEffect(() => {
    const newVal = parseInt(numberOfProduct || 0, 10);
    const oldVal = fields.length;

    if (newVal > oldVal) {
      for (let i = oldVal; i < newVal; i++) {
        append({ unit_number: "", floor_number: "", size_in: "" });
      }
    } else {
      for (let i = oldVal; i > newVal; i--) {
        remove(i - 1);
      }
    }
  }, [numberOfProduct]);

  const removeProduct = (index) => {
    remove(index);
  };
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <h2>Product Create</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="branch_id">Select Project name</label>
          &nbsp;&nbsp;
          <select name="branch_id" id="branch_id" {...register("branch_id")}>
            {["Select Option", "Project1", "Project2", "Project3"].map(
              (item, index) => {
                return (
                  <option
                    value={item === "Select Option" ? "" : index}
                    key={index}
                  >
                    {item}
                  </option>
                );
              }
            )}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="numberOfProduct">Enter number of Products</label>
          &nbsp;&nbsp;&nbsp;
          <input
            type="number"
            name="numberOfProduct"
            id="numberOfProduct"
            {...register("numberOfProduct", { valueAsNumber: true })}
            style={{ width: "100px" }}
          />
        </div>
        {/* dynamic field */}
        <hr />
        <div>
          {fields.length !== 0 &&
            fields.map((item, index) => {
              return (
                <div key={item.id}>
                  <h5 className="card-title">Product No {index + 1}</h5>
                  {/* Product type start */}
                  <div>
                    <label htmlFor="product_type">Product Type</label>
                    &nbsp;&nbsp;&nbsp;
                    <select
                      style={{ marginBottom: 15 }}
                      name={`products.${index}.product_type`}
                      id="product_type"
                      {...register(`products.${index}.product_type`)}
                    >
                      {[
                        "Select Option",
                        "Parking",
                        "Shop",
                        "Appartment",
                        "Office",
                        "Villa",
                        "Plot"
                      ].map((item, index) => {
                        return (
                          <option
                            value={item === "Select Option" ? "" : index}
                            key={index}
                          >
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* Product type end */}
                  {/* Unit start */}
                  <div>
                    <label htmlFor="unitNumber">Unit Number</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                      style={{ marginBottom: 15 }}
                      type="text"
                      id="unitNumber"
                      name={`products.${index}.unit_number`}
                      {...register(`products.${index}.unit_number`)}
                    />
                  </div>
                  {/* Floor number start */}
                  <div>
                    <label htmlFor="floor_number">Floor Number</label>
                    &nbsp;&nbsp;&nbsp;
                    <select
                      style={{ marginBottom: 15 }}
                      name={`products.${index}.floor_number`}
                      id="floor_number"
                      {...register(`products.${index}.floor_number`)}
                    >
                      {[
                        "Select Option",
                        "Floor One",
                        "Floor Two",
                        "Floor three"
                      ].map((item, index) => {
                        return (
                          <option
                            value={item === "Select Option" ? "" : index}
                            key={index}
                          >
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* Floor number end */}
                  {/* Layout type start */}
                  <div>
                    <label htmlFor="size_in">Layout type</label>
                    &nbsp;&nbsp;&nbsp;
                    <select
                      style={{ marginBottom: 15 }}
                      name={`products.${index}.layout_type_id`}
                      id="size_in"
                      {...register(`products.${index}.layout_type_id`)}
                    >
                      {[
                        "Select Option",
                        "CATEGORY A (A)",
                        "CATEGORY B (B)",
                        "CATEGORY C (C)"
                      ].map((item, index) => {
                        return (
                          <option
                            value={item === "Select Option" ? "" : index}
                            key={index}
                          >
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* Layout type end */}
                  {/* Size in */}
                  <div>
                    <label htmlFor="size_in">Size In</label>
                    &nbsp;&nbsp;&nbsp;
                    <select
                      style={{ marginBottom: 15 }}
                      name={`products.${index}.size_in`}
                      id="size_in"
                      {...register(`products.${index}.size_in`)}
                    >
                      {["Select Option", "Meter", "Marla", "Square Feet"].map(
                        (item, index) => {
                          return (
                            <option
                              value={item === "Select Option" ? "" : index}
                              key={index}
                            >
                              {item}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                  {/* Size in end */}
                  &nbsp;&nbsp;
                  <button onClick={() => removeProduct(index)}>-</button>
                </div>
              );
            })}
        </div>

        <br />
        <br />
        <hr />
        <input type="submit" value="Submit Form" />
      </form>
    </>
  );
};

export default Product;
