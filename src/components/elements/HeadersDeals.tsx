import { Property } from "@/utils/apis/stay";

type Props = {
  property: Property;
};

const HeadersDeals = ({ property }: Props) => {
  return (
    <>
      <div className="w-full py-8 flex gap-x-8">
        <img
          src={property?.catalog.hero_image_url.th}
          alt={property?.name}
          className="w-[168px] h-[168px] rounded-full object-cover mx-16"
        />
        <div className="flex-1 flex flex-col gap-y-2">
          <h1 className="font-semibold text-xl">
            {property?.name}{" "}
            {"⭐".repeat(Math.floor(property?.catalog.star_rating!))}
          </h1>
          <p className="capitalize">{property?.type}</p>
          <h2 className="font-medium">{property?.catalog.address_full}</h2>
          <p>
            <span>{property?.catalog.review_rating} Excellent</span>
            <span> {property?.catalog.review_count} reviews</span>
          </p>
        </div>
      </div>
      <hr />
    </>
  );
};

export default HeadersDeals;
