"use client";
import classes from "@/app/page.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { deleteData, getData } from "@/lib/helper";

interface DataType {
  id: string;
  name: string;
  rating: string;
  comment: string;
  imageName: string;
}

export const MainMenu: React.FC<{ data: DataType[] }> = (props) => {
  const [items, setItems] = useState(props.data);
  const [filteredItems,setFilteredItems] = useState(items)
  const [searchInput,setSearchInput] = useState("")
  const deleteButton = async (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setFilteredItems(updatedItems)
    await deleteData(id);
  };
  
  const filterHandler = () =>{
    const updatedValues = items.filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase()))
    setFilteredItems(updatedValues)
  }

  useEffect(() =>{
    filterHandler()
  },[searchInput])
  return (
    <>
    <div className={classes.search}>
      <input type="search" placeholder="Search by name" onChange={(e) => setSearchInput(e.target.value)}/>
    </div>
      <div className={classes.grids}>
        {filteredItems.map((item) => (
          <div key={item.comment} className={classes.grid}>
            <Image
              src={`/images/${item.imageName}`}
              alt="image"
              height={50}
              width={500}
            ></Image>
            <h1>{item.name}</h1>
            <p className={classes.rating}>
              {parseFloat(item.rating).toFixed(1)}
            </p>
            <p className={classes.comment}>{item.comment}</p>

            <button onClick={() => deleteButton(item.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </>
  );
};
