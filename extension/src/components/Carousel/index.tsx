import React, {useEffect} from 'react';
import {CarouselProps} from "@src/components/utils/types";
import template1Thumbnail from "@src/assets/img/template_1.png";
import template2Thumbnail from "@src/assets/img/template_2.png";
import template3Thumbnail from "@src/assets/img/template_3.png";
import template4Thumbnail from "@src/assets/img/template_4.png";

export type ResumeTemplate = {
  id: string,
  thumbnail: string
}
const templates: ResumeTemplate[] = [
  { id: "1", thumbnail: template1Thumbnail},
  { id: "2", thumbnail: template2Thumbnail },
  { id: "3", thumbnail: template3Thumbnail },
  { id: "4", thumbnail: template4Thumbnail }
]

export default function TemplateCarousel(props: CarouselProps): JSX.Element {
  useEffect(() => {
    const container = document.getElementById("carousel") as HTMLHtmlElement
    const selectedElement = document.getElementById(`carousel-item-${props.selectedId}`)
    if (selectedElement) {
      const containerWidth = container.clientWidth;
      const elementWidth = selectedElement.clientWidth;
      const elementOffset = selectedElement.offsetLeft;

      const scrollPosition = elementOffset - (containerWidth - elementWidth) / 2;

      container.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  }, [props.selectedId]);

  return (
      <div className="flex flex-row space-x-4 overflow-x-auto" id="carousel">
          {templates.map(item => {
            return (
                <div className="m-2 space-x-2 align-middle" onClick={() => props.onTemplateSelect(item.id)} id={`carousel-item-${item.id}`}>
                  <img key={item.id} className={`${item.id === props.selectedId ? 
                  "max-w-40 object-contain cursor-pointer filter border-4 border-blue-500 scale-125 spacing-x-4 m-6" :
                  "max-w-40 object-contain cursor-pointer filter border border-black "}`} src={item.thumbnail} alt="image description"/>
                </div>
            )
          })}
      </div>
  );
}
