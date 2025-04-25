'use client'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useState } from 'react'
import data from "@/datas.json"
import Image from "next/image"


const initialData = {
  S: [],
  A: [],
  B: [],
  C: [],
  D: [],
  Values:data
}

export default function TierList() {
  const [tiers, setTiers] = useState(initialData)

  const onDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) return

    const sourceItems = Array.from(tiers[source.droppableId])
    const [movedItem] = sourceItems.splice(source.index, 1)

    const destinationItems = Array.from(tiers[destination.droppableId])
    destinationItems.splice(destination.index, 0, movedItem)

    setTiers({
      ...tiers,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destinationItems
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.entries(tiers).map(([tier, items]) => (
        <div key={tier} style={{ marginBottom: 20 }}>
          <h2>{tier}-Tier</h2>
          <Droppable droppableId={tier}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  minHeight: 100,
                  background: '#f0f0f0',
                  padding: 10,
                  display: 'flex',
                  gap: 10
                }}
              >
                {items.map((item, index) => (
                  <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: 10,
                          background: 'white',
                          borderRadius: 8,
                          ...provided.draggableProps.style
                        }}
                      >
                        <Image src={`/images/${item.imageName}`} height={50} width={100} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </DragDropContext>
  )
}
