type GroupCardProps = {
  groupName: string;
}; /* use `interface` if exporting so that consumers can extend */
import { Link } from "react-router-dom";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function GroupCard({ groupName }: GroupCardProps) {
  const formattedGroupName = groupName.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link to={`/customers/${formattedGroupName}`}>
      <Card>
        <CardHeader>
          <CardTitle>{groupName}</CardTitle>
          <CardDescription>Group</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default GroupCard;
