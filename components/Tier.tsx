"use client";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import data from "@/datas.json";
import Image from "next/image";
import classes from "@/app/tierlist/page.module.css";
import { saveTierData } from "@/lib/helper";
import tierData from "@/tierData.json"
import { items } from "./structure";
const initialData = tierData

export default function TierList() {
  const [tiers, setTiers] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(tiers[source.droppableId]);
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);
      setTiers((prev) => ({
        ...prev,
        [source.droppableId]: items,
      }));
    } else {
      const sourceItems = Array.from(tiers[source.droppableId]);
      const [movedItem] = sourceItems.splice(source.index, 1);

      const destinationItems = Array.from(tiers[destination.droppableId]);
      destinationItems.splice(destination.index, 0, movedItem);

      setTiers({
        ...tiers,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems,
      });
    }
  };


  return (
    <>
      <div className={classes.saveDiv}>
          <button onClick={() =>(saveTierData(tiers))}>Сохранить</button>
        </div>      
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(tiers).map(([tier, items]) => (
          <div key={tier} style={{ marginBottom: 20 }}>
            <Droppable droppableId={tier}>
              {(provided) => (
                <div className={classes.tierName}>
                  <h2
                    className={
                      tier === "S"
                        ? classes.S
                        : tier === "A"
                        ? classes.A
                        : tier === "B"
                        ? classes.B
                        : tier === "C"
                        ? classes.C
                        : tier === "D"
                        ? classes.D
                        : classes.imageTier
                    }
                  >
                    {tier}
                  </h2>
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={classes.droppableDiv}
                  >
                    {items.map((item, index) => (
                      <Draggable
                        draggableId={item.id}
                        index={index}
                        key={item.id}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={classes.draggableDiv}
                          >
                            <Image
                              src={`/images/${item.imageName}`}
                              height={50}
                              width={100}
                              alt=""
                              className={classes.tierImage}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>

    </>
  );
}
