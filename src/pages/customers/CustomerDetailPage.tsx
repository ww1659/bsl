import { useParams } from "react-router-dom";

function CustomerDetailPage() {
  const { customerName } = useParams();

  return (
    <div>
      <h1>Customer: {customerName}</h1>
    </div>
  );
}

export default CustomerDetailPage;
