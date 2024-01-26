import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";

import { ConvertAvailability } from "@/utils/apis/stay";
import { getAvailability } from "@/utils/apis/stay";

export const convertDataAvability = () => {
  const [availability, setAvailability] = useState<ConvertAvailability[]>();
  const [isPending, setIsPending] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    fetchDataAvailability();
  }, [searchParams]);

  async function fetchDataAvailability() {
    setIsPending(true);
    try {
      const querys = Object.fromEntries([...searchParams]);
      const response = await getAvailability({
        ...querys,
        id: 9001948244,
      });
      const newData = response?.offer_list.reduce((result: any, offer: any) => {
        const existingRoom = result.find(
          (room: any) => room.room_name === offer.room_name
        );

        if (existingRoom) {
          existingRoom.room_images = offer.room_images;

          existingRoom.cancel_policy_description.push(
            offer.cancel_policy_description
          );
          existingRoom.meal_plan_description.push(offer.meal_plan_description);
          existingRoom.strikethrough_rate_nightly.push(
            offer.pricing_data.strikethrough_rate_nightly
          );
          existingRoom.net_rate_nightly.push(
            offer.pricing_data.net_rate_nightly
          );
          existingRoom.net_price_total_with_bonus.push(
            offer.pricing_data.net_price_total_with_bonus
          );
        } else {
          result.push({
            room_name: offer.room_name,
            room_images: offer.room_images,
            room_bed_groups: offer.room_bed_groups,
            room_size_sqm: offer.room_size_sqm,
            cancel_policy_description: [offer.cancel_policy_description],
            meal_plan_description: [offer.meal_plan_description],
            strikethrough_rate_nightly: [
              offer.pricing_data.strikethrough_rate_nightly,
            ],
            net_rate_nightly: [offer.pricing_data.net_rate_nightly],
            net_price_total_with_bonus: [
              offer.pricing_data.net_price_total_with_bonus,
            ],
          });
        }

        return result;
      }, []);

      setAvailability(newData);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  }

  return { availability, isPending, fetchDataAvailability };
};
