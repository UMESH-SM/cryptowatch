import React from "react";
import "./HeroCardSection.css";
import HeroCard from "./HeroCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function HeroCardSection() {
  let heroCardData = [
    {
      id: "1",
      name: "Google",
      symbol: "GOOGL",
      price: "2294.13",
      image:
        "https://seeklogo.com/images/N/new-google-favicon-logo-5E38E037AF-seeklogo.com.png",
    },
    {
      id: "2",
      name: "Facebook",
      symbol: "FB",
      price: "316.23",
      image:
        "https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png",
    },
    {
      id: "3",
      name: "Amazon",
      symbol: "AMZN",
      price: "3203.08",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png",
    },
  ];

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = heroCardData;
    const [reOrderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reOrderedItem);
    heroCardData = items;
  };
  return (
    <div className="heroCardSection">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              className="dragOuterContainer"
              ref={provided.innerRef}
              {...provided.DroppableProps}
            >
              {heroCardData.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="dragInnerContainer"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {
                        <HeroCard
                          symbol={item.symbol}
                          name={item.name}
                          image={item.image}
                          price={item.price}
                        />
                      }
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default HeroCardSection;
