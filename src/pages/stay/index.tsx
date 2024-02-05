import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Filter,
  Wallet,
  Utensils,
  Loader2,
  TagIcon,
  InfoIcon,
  GridIcon,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import HeadersDeals from "@/components/HeadersDeals";
import Layout from "@/components/layouts/Layout";
import { Button } from "@/components/ui/button";
import DealsCard from "@/components/DealsCard";

import { convertDataAvability } from "@/utils/hooks/convertDataAvability";
import { Property, getProperty } from "@/utils/apis/stay";

const index = () => {
  const { availability, isPending } = convertDataAvability();
  const [searchParams, setSearchParams] = useSearchParams();
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
  }, []);

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
          <Tabs defaultValue="deals" className="w-full">
            <TabsList className="w-full grid grid-cols-3 md:flex md:grid-cols-none gap-x-6 bg-transparent">
              <TabsTrigger value="deals">
                <div className="flex items-center justify-center gap-x-1">
                  <TagIcon size={18} />{" "}
                  <span className="hidden md:block">DEALS</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="photos" disabled>
                <div className="flex items-center justify-center gap-x-1">
                  <GridIcon size={18} />{" "}
                  <span className="hidden md:block">PHOTOS</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="info" disabled>
                <div className="flex items-center justify-center gap-x-1">
                  <InfoIcon size={18} />{" "}
                  <span className="hidden md:block">INFO</span>
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="deals" className="w-full">
              <div className="w-full flex flex-col md:flex-row items-center gap-x-2 md:gap-x-4 gap-y-4 md:gap-y-0 justify-center my-4 md:my-10">
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
                    Clear All
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
              {isPending ? (
                <div className="flex h-full mx-auto items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <p>Loading</p>
                </div>
              ) : (
                <ul className="w-full flex flex-col gap-y-14">
                  {availability?.map((room) => (
                    <li key={room.room_name}>
                      <DealsCard room={room} />
                    </li>
                  ))}
                </ul>
              )}
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
