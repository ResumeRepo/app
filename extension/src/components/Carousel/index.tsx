import React, {useEffect, useState} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export type ResumeTemplate = {
  id: string,
  thumbnail: string
}
const templates: ResumeTemplate[] = [
  { id: "id_1", thumbnail: "https://placehold.co/100"},
  { id: "id_1", thumbnail: "https://placehold.co/100" },
  { id: "id_1", thumbnail: "https://placehold.co/100" },
  { id: "id_1", thumbnail: "https://placehold.co/100" },
  { id: "id_1", thumbnail: "https://placehold.co/100" },
  { id: "id_1", thumbnail: "https://placehold.co/100" },
  { id: "id_1", thumbnail: "https://placehold.co/100" },
  { id: "id_1", thumbnail: "https://placehold.co/100" }
]


export default function TemplateCarousel(): JSX.Element {
  // const [mode, setMode] = useState<ResumeMode>("List")
  // const [props.resumeId, setprops.resumeId] = useState<string | undefined>(undefined)
  const [templateId, setTemplateId] = useState("")

  const onTemplateSelect = (templateId: string) => {
    setTemplateId(templateId)
  }

  return (
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className="template-carousel"
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            partialVisible
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024
                },
                items: 3,
                partialVisibilityGutter: 40
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0
                },
                items: 2,
                partialVisibilityGutter: 30
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464
                },
                items: 2,
                partialVisibilityGutter: 30
              }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable

            // responsive={responsive}
        >
          {templates.map(item => {
            return (
                <div className="mb-4">
                  <img key={item.id} className="transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0" src="https://placehold.co/100" alt="image description"/>
                </div>
            )
          })}
        </Carousel>
  );
}
