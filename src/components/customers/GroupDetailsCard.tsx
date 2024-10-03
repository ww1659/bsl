//Redux
import { useAppSelector } from "@/redux/hooks";

//Supabase Hooks
import { useFetchGroupById } from "@/hooks/useFetchGroupById";

//UI
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//Utils
import { toTitleCase } from "@/lib/utils";

function GroupDetailsCard() {
  const groupId = useAppSelector((state) => state.group.groupId);
  const { data, isLoading, isError, error } = useFetchGroupById(groupId || "");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <>
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle>Group Details</CardTitle>
              <CardDescription>Update or view here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row">
                <h4 className="underline">Name</h4>
              </div>
              <div className="flex flex-row align-center flex-wrap">
                <p className="pr-1 text-sm">Group Name:</p>
                <p className="font-bold text-sm">
                  {toTitleCase(data.group_name || "")}
                </p>
              </div>
              <div className="flex flex-row">
                <h4 className="underline">Address</h4>
              </div>
              <div className="flex flex-row align-center flex-wrap">
                <p className="pr-1 text-sm">House Number:</p>
                <p className="font-bold text-sm">{data.house_number}</p>
              </div>
              <div className="flex flex-row align-center flex-wrap">
                <p className="pr-1 text-sm">Street:</p>
                <p className="font-bold text-sm">
                  {toTitleCase(data?.street_name || "")}
                </p>
              </div>
              <div className="flex flex-row align-center flex-wrap">
                <p className="pr-1 text-sm">Postcode:</p>
                <p className="font-bold text-sm">
                  {data.postcode?.toUpperCase()}
                </p>
              </div>
              <div className="flex flex-row align-center flex-wrap">
                <p className="pr-1 text-sm">Email:</p>
                <p className="font-bold text-sm">{data.email}</p>
              </div>
            </CardContent>
          </div>
          <CardFooter></CardFooter>
        </Card>
      </>
    );
}

export default GroupDetailsCard;
