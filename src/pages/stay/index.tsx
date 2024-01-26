import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Filter, Wallet, Utensils, Loader2 } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DealsCard from "@/components/elements/DealsCard";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layouts/Layout";
import { Button } from "@/components/ui/button";

import { convertDataAvability } from "@/utils/hooks/convertDataAvability";
import { Property, getProperty } from "@/utils/apis/stay";
import HeadersDeals from "@/components/elements/HeadersDeals";

const index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { availability, fetchDataAvailability } = convertDataAvability();
  const [property, setProperty] = useState<Property>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const params = useParams();

  useEffect(() => {
    if (params) {
      searchParams.set("checkin", "2024-06-01");
      searchParams.set("checkout", "2024-06-03");
      searchParams.set("number_of_room", "1");
      searchParams.set("guest_per_room", "2");
      setSearchParams(searchParams);
    }
    fetchDataProperty();
    fetchDataAvailability();
  }, [searchParams]);

  async function fetchDataProperty() {
    setIsLoading(true);
    try {
      const response = await getProperty({ id: +params.property_id! });
      setProperty(response);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function filterDataBreakfast(key: string) {
    if (key !== "") {
      searchParams.set("free_breakfast", key);
    } else {
      searchParams.delete("free_breakfast");
    }
    setSearchParams(searchParams);
  }

  function filterDataCancelation(key: string) {
    if (key !== "") {
      searchParams.set("free_cancellation", key);
    } else {
      searchParams.delete("free_cancellation");
    }
    setSearchParams(searchParams);
  }

  function clearFilter() {
    searchParams.delete("free_breakfast");
    searchParams.delete("free_cancellation");
    setSearchParams(searchParams);
  }

  console.log(availability);

  return (
    <Layout>
      {isLoading ? (
        <div className="flex h-full mx-auto items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <p>Loading</p>
        </div>
      ) : (
        <div className="flex flex-col w-full justify-start">
          <HeadersDeals property={property!} />
          <Tabs defaultValue="deals" className="w-full mt-2">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="deals">DEALS</TabsTrigger>
              <TabsTrigger value="photos" disabled>
                PHOTOS
              </TabsTrigger>
              <TabsTrigger value="info" disabled>
                INFO
              </TabsTrigger>
            </TabsList>
            <TabsContent value="deals" className="w-full">
              <div className="w-full flex flex-col md:flex-row items-center gap-x-2 md:gap-x-4 gap-y-4 md:gap-y-0 justify-center my-4">
                <p className="font-medium flex items-center">
                  <Filter size={16} className="mr-1" />
                  Filter rooms by
                </p>
                <div className="flex gap-x-2 md:gap-x-4">
                  <Button
                    onClick={() => clearFilter()}
                    variant={"outline"}
                    className="rounded-full h-6 md:h-8 text-sm md:text-base"
                  >
                    clear
                  </Button>
                  <Button
                    onClick={() => filterDataBreakfast("true")}
                    variant={"outline"}
                    className="rounded-full h-6 md:h-8 text-sm md:text-base"
                  >
                    <Utensils size={14} className="mr-2" /> Free Breakfast
                  </Button>
                  <Button
                    onClick={() => filterDataCancelation("true")}
                    variant={"outline"}
                    className="rounded-full h-6 md:h-8 text-sm md:text-base"
                  >
                    <Wallet size={14} className="mr-2" /> Free Cancellation
                  </Button>
                </div>
              </div>
              {/* DATA MAPPING DARI ROOM */}
              <ul className="w-full flex flex-col gap-y-6">
                {availability?.map((room) => (
                  <DealsCard key={room.room_name} room={room} />
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="photos">
              <p>PHOTOS</p>
            </TabsContent>
            <TabsContent value="info">
              <p>INFO</p>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </Layout>
  );
};

export default index;
