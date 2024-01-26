import { Property } from "@/utils/apis/stay";

type Props = {
  property: Property;
};

const HeadersDeals = ({ property }: Props) => {
  return (
    <>
      <div className="w-full flex py-4 md:py-8 gap-x-4 md:gap-x-8 px-2">
        <img
          src={property?.catalog.hero_image_url.th}
          alt={property?.name}
          className="w-[90px] h-[90px] md:w-[168px] md:h-[168px] rounded-full object-cover mx-2 md:mx-16"
        />
        <div className="flex-1 flex flex-col gap-y-2">
          <h1 className="font-semibold text-xl">
            {property?.name}{" "}
            <span className="text-base md:text-xl">
              {"⭐".repeat(Math.floor(property?.catalog.star_rating!))}
            </span>
          </h1>
          <p className="capitalize text-slate-600">{property?.type}</p>
          <h2 className="font-medium text-sm md:text-base">
            {property?.catalog.address_full}
          </h2>
          <p className="text-sm md:text-base">
            <span>{property?.catalog.review_rating} Excellent</span> ·
            <span> {property?.catalog.review_count} reviews</span>
          </p>
        </div>
      </div>
      <hr />
    </>
  );
};

export default HeadersDeals;
