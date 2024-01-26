import {
  Copy,
  Grid,
  Sofa,
  Wallet,
  Maximize,
  Utensils,
  BoxSelect,
  ScanBarcode,
  MoreHorizontal,
  UtensilsCrossed,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { countFormula, formatPrice } from "@/utils/formatter";
import { ConvertAvailability } from "@/utils/apis/stay/type";

type Props = {
  room: ConvertAvailability;
};

const DealsCard = ({ room }: Props) => {
  return (
    <section className="w-full flex flex-col md:flex-row gap-x-4">
      <div className="p-4 block md:hidden border-t-2">
        <h1 className="font-medium text-lg flex items-center justify-between mb-2">
          <span className="leading-none">{room.room_name}</span>
          <span className="w-[90px] text-blue-500 cursor-pointer font-medium text-base">
            See Details
          </span>
        </h1>
        <p className="flex items-center gap-x-4">
          <span className="flex items-center gap-x-1">
            <Sofa size={20} />
            {room.room_bed_groups}
          </span>
          <span className="flex items-center gap-x-1">
            <BoxSelect size={20} />
            {room.room_size_sqm} m<sup>2</sup>
          </span>
        </p>
      </div>
      <div className="w-full md:w-[330px] h-[258px] flex flex-row md:flex-col rounded-none md:rounded-xl overflow-hidden cursor-pointer">
        <div className="relative">
          <img
            src={room.room_images[0].size_sm}
            alt={room.room_images[0].caption}
            className="object-cover h-full md:h-[178px] w-full md:w-full border border-white"
          />
          <h1 className="absolute bottom-3 left-3 flex items-center gap-x-2 bg-white py-1 px-2 rounded-md">
            <Grid size={16} />
            <span className="text-xs">See Photos</span>
          </h1>
        </div>
        <div className="flex flex-col md:flex-row">
          <img
            src={room.room_images[1].size_sm}
            alt={room.room_images[1].caption}
            className="object-cover w-auto md:w-[110px] h-[86px] md:h-auto border border-white"
          />
          <img
            src={room.room_images[2].size_sm}
            alt={room.room_images[2].caption}
            className="object-cover w-auto md:w-[110px] h-[86px] md:h-auto border border-white"
          />
          <img
            src={room.room_images[3].size_sm}
            alt={room.room_images[3].caption}
            className="object-cover w-auto md:w-[110px] h-[86px] md:h-auto border border-white"
          />
        </div>
      </div>
      <div className="flex-1 rounded-lg border overflow-hidden">
        <div className="p-4 hidden md:block">
          <h1 className="font-medium text-lg flex justify-between">
            <span>{room.room_name}</span>
            <span className="text-blue-500 cursor-pointer font-medium text-base">
              See Details
            </span>
          </h1>
          <p className="flex items-center gap-x-4">
            <span className="flex items-center gap-x-1">
              <Sofa size={20} />
              {room.room_bed_groups}
            </span>
            {room.room_size_sqm && (
              <span className="flex items-center gap-x-1">
                <Maximize size={20} />
                {room.room_size_sqm} m<sup>2</sup>
              </span>
            )}
          </p>
        </div>
        <ul>
          {room.meal_plan_description.map((meat: string, index: number) => (
            <li key={index} className="border-t w-full p-4">
              {meat === "" ? (
                <div className="flex justify-between">
                  <div>
                    <p className="flex items-center gap-x-2">
                      <UtensilsCrossed size={20} color="red" />
                      <span className="text-red-500">Without breakfast</span>
                    </p>
                    <p
                      className={`flex items-start gap-x-2 mb-6 ${
                        room.cancel_policy_description[index] ===
                        "Non-refundable"
                          ? "text-red-500"
                          : "text-green-600"
                      } `}
                    >
                      <Wallet
                        size={20}
                        color={`${
                          room.cancel_policy_description[index] ===
                          "Non-refundable"
                            ? "red"
                            : "green"
                        }`}
                        className="mt-1"
                      />
                      <span>{room.cancel_policy_description[index]}</span>
                    </p>
                    <p className="flex text-sm font-medium px-2 bg-red-500 text-white rounded w-fit gap-x-1 mb-2">
                      <span>SAVE</span>
                      <span className="font-bold">
                        {countFormula(
                          room.strikethrough_rate_nightly[index]!,
                          room.net_rate_nightly[index]!
                        )}
                        %
                      </span>
                      <span>TODAY!</span>
                    </p>

                    <p className="flex flex-col">
                      <s className="font-medium text-slate-400 text-sm">
                        {formatPrice(room.strikethrough_rate_nightly[index])}
                      </s>
                      <span className="font-medium text-lg">
                        {formatPrice(room.net_rate_nightly[index])}
                        <span className="font-normal text-sm"> / night*</span>
                      </span>
                      <span className=" text-slate-400 font-medium">
                        Total ·{" "}
                        {formatPrice(room.net_price_total_with_bonus[index])}
                      </span>
                      <span className=" text-slate-500">after tax & fees</span>
                      <small className="text-slate-500">
                        Member-only price, valid in app only
                      </small>
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <div className="flex gap-x-2 cursor-pointer">
                      <Copy />
                      <ScanBarcode />
                      <MoreHorizontal />
                    </div>
                    <div className="flex flex-col items-end gap-y-4">
                      <Button className="px-8">Book Now</Button>
                      <small className="text-blue-600 font-medium">
                        ★ Collect 9 points
                      </small>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between">
                  <div>
                    <p className="text-green-600 flex items-center gap-x-2">
                      <Utensils size={20} />
                      <span>{meat}</span>
                    </p>
                    <p
                      className={`flex items-start gap-x-2 mb-6 ${
                        room.cancel_policy_description[index] ===
                        "Non-refundable"
                          ? "text-red-500"
                          : "text-green-600"
                      } `}
                    >
                      <Wallet
                        size={20}
                        color={`${
                          room.cancel_policy_description[index] ===
                          "Non-refundable"
                            ? "red"
                            : "green"
                        }`}
                        className="mt-1"
                      />
                      <span>{room.cancel_policy_description[index]}</span>
                    </p>
                    <p className="flex text-sm font-medium px-2 bg-red-500 text-white rounded w-fit gap-x-1 mb-2">
                      <span>SAVE</span>
                      <span className="font-bold">
                        {countFormula(
                          room.strikethrough_rate_nightly[index]!,
                          room.net_rate_nightly[index]!
                        )}
                        %
                      </span>
                      <span>TODAY!</span>
                    </p>
                    <p className="flex flex-col">
                      <s className="font-medium text-slate-400 text-sm">
                        {formatPrice(room.strikethrough_rate_nightly[index])}
                      </s>
                      <span className="font-medium text-lg">
                        {formatPrice(room.net_rate_nightly[index])}
                        <span className="font-normal text-sm"> / night*</span>
                      </span>
                      <span className=" text-slate-400 font-medium">
                        Total ·{" "}
                        {formatPrice(room.net_price_total_with_bonus[index])}
                      </span>
                      <span className=" text-slate-500">after tax & fees</span>
                      <small className="text-slate-500">
                        Member-only price, valid in app only
                      </small>
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <div className="flex gap-x-2 cursor-pointer">
                      <Copy />
                      <ScanBarcode />
                      <MoreHorizontal />
                    </div>
                    <div className="flex flex-col items-end gap-y-4">
                      <Button className="px-8">Book Now</Button>
                      <small className="text-blue-600 font-medium">
                        ★ Collect 9 points
                      </small>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DealsCard;
