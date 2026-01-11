"use client";
import css from "./CamperInfoBlock.module.css";
import {getCamperById } from "@/lib/api";
import RatingSummary from "../Rating/RatingSummary";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';


const CamperInfoBlock = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ["camper", id],
    queryFn: () => getCamperById(id),
    refetchOnMount: false,
  });


  return (
    <section className={css.section}>
      <div className="container">
        <h2 className="visuallyHidden">CamperInfoBlock</h2>
        {data && ( <div className={css.wrapperInfo}>
                  <h3 className={css.name}>{data?.name}</h3>
                  <div className={css.wrapperFirst}>
                      <RatingSummary
                rating={data.rating}
                reviewsCount={data.reviews.length}
              />
              <div className={css.location}>
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/sprite.svg#map" />
                </svg>
                <p>{data.location}</p>
              </div></div>
              
              <p className={css.price}>€{data.price}</p>
              <ul className={css.list}>
                {data.gallery.map((img, index) => (
                  <li key={index} className={css.galleryItem}>
                    <Image
                      src={img.original}
                      alt={`${data.name} photo ${index + 1}`}
                      width={292}
                      height={312}
                      className={css.galleryImage}
                    />
                  </li>
                ))}
              </ul>
              <p className={css.description}>{data.description}</p>
            </div>)}
       
          </div>
    </section>
  );
};

export default CamperInfoBlock;
