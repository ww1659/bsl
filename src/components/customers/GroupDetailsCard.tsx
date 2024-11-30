import { useState } from "react";

//Redux
import { useAppSelector } from "@/redux/hooks";

//Supabase Hooks
import { useFetchGroupById } from "@/hooks/fetch/useFetchGroupById";

//UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";

//Utils
import { toTitleCase } from "@/lib/utils";

//Components
import UpdateGroupForm from "./UpdateGroupForm";

function GroupDetailsCard() {
  const [isOpen, setIsOpen] = useState(false);
  const groupId = useAppSelector((state) => state.group.groupId);
  const { data, isLoading, isError, error } = useFetchGroupById(groupId || "");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handleEditGroup = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <CardTitle>Details</CardTitle>
            <Button variant="outline" onClick={handleEditGroup}>
              <p>Edit Details</p>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {data && (
            <>
              {data.groupName && (
                <div className="flex flex-row align-center flex-wrap py-1">
                  <p className="pr-1 text-sm text-muted-foreground">
                    Group Name:
                  </p>
                  <p className="text-sm font-bold">
                    {toTitleCase(data.groupName)}
                  </p>
                </div>
              )}
              {data.houseNumber && (
                <div className="flex flex-row align-center flex-wrap py-1">
                  <p className="pr-1 text-sm text-muted-foreground">
                    House Number:
                  </p>
                  <p className="font-bold text-sm">{data.houseNumber}</p>
                </div>
              )}
              {data.streetName && (
                <div className="flex flex-row align-center flex-wrap py-1">
                  <p className="pr-1 text-sm text-muted-foreground">Street:</p>
                  <p className="font-bold text-sm">
                    {toTitleCase(data?.streetName || "")}
                  </p>
                </div>
              )}
              {data.postcode && (
                <div className="flex flex-row align-center flex-wrap py-1">
                  <p className="pr-1 text-sm text-muted-foreground">
                    Postcode:
                  </p>
                  <p className="font-bold text-sm">
                    {data.postcode?.toUpperCase()}
                  </p>
                </div>
              )}
              {data.email && (
                <div className="flex flex-row align-center flex-wrap py-1">
                  <p className="pr-1 text-sm text-muted-foreground">Email:</p>
                  <p className="font-bold text-sm">{data.email}</p>
                </div>
              )}
              {data.standardDiscount !== null && (
                <div className="flex flex-row align-center flex-wrap py-1">
                  <p className="pr-1 text-sm text-muted-foreground">
                    Standard Discount:
                  </p>
                  <p className="font-bold text-sm">{data.standardDiscount}%</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Group Details</SheetTitle>
            <SheetDescription>
              Make changes to the group here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <UpdateGroupForm
            groupId={data?.id ?? null}
            groupName={data?.groupName ?? null}
            groupHouseNumber={data?.houseNumber ?? null}
            groupStreet={data?.streetName ?? null}
            groupPostcode={data?.postcode ?? null}
            groupEmail={data?.email ?? null}
            groupStandardDiscount={data?.standardDiscount ?? null}
            setIsSheetOpen={setIsOpen}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default GroupDetailsCard;
