import { Draggable } from "@hello-pangea/dnd"

interface DataCardProps{
    id:string,
    index:number,
    imageUrl:string,
}
export default function DataCardProps({id,index,imageUrl}:DataCardProps) {
  return (
    <Draggable draggableId={id} index={index}>
        {(provided) =>(
            <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            >

            </div>
        )}
    </Draggable>
  )
}

