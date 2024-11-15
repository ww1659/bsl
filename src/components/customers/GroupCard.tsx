type GroupCardProps = {
  groupName: string;
  groupId: string;
};

import { Link } from "react-router-dom";
import { toTitleCase } from "@/lib/utils";
import { setGroupId } from "@/redux/features/groups/groupSlice";
import { useAppDispatch } from "@/redux/hooks";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function GroupCard({ groupName, groupId }: GroupCardProps) {
  const dispatch = useAppDispatch();
  const formattedGroupName = groupName.toLowerCase().replace(/\s+/g, "-");

  const handleClick = () => {
    dispatch(setGroupId(groupId));
  };

  return (
    <Link to={`/customers/${formattedGroupName}`} onClick={handleClick}>
      <Card>
        <CardHeader>
          <CardTitle>{toTitleCase(groupName)}</CardTitle>
          <CardDescription>
            {groupId == "private" ? "Private Owners" : "Customer Group"}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default GroupCard;
