import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useFetchGroupedCustomers } from '@/hooks/customer/useFetchCustomersByGroup';
import { useAppSelector } from '@/redux/hooks';

import { Input } from '../ui/input';
import CustomerCard from './CustomerCard';

type CustomerListProps = {
  groupName: string | undefined;
};

function CustomerList({ groupName }: CustomerListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const groupId = useAppSelector((state) => state.group.groupId);

  const { data, isLoading, isError, error } = useFetchGroupedCustomers(
    groupId || '',
    debouncedSearchTerm
  );

  const sortedData = data?.sort((a, b) =>
    (a.customer_name ?? '').localeCompare(b.customer_name ?? '')
  );

  const debouncedSetSearchTerm = useCallback((value: string) => {
    debounce(() => setDebouncedSearchTerm(value), 300)();
  }, []);

  useEffect(() => {
    debouncedSetSearchTerm(searchTerm);
  }, [searchTerm, debouncedSetSearchTerm]);

  return (
    <Card className="w-full">
      <CardHeader className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <CardTitle>Customers</CardTitle>
          <CardDescription>
            Select or search for a customer here.
          </CardDescription>
        </div>
        <Input
          placeholder="Search for Customer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </CardHeader>
      <CardContent className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 pt-4">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {error.message}</p>}
        {sortedData &&
          sortedData.length > 0 &&
          sortedData.map((customer) => (
            <CustomerCard
              key={customer.id}
              customerId={customer.id}
              customerName={customer.customer_name}
              groupName={groupName}
            />
          ))}
      </CardContent>
    </Card>
  );
}

export default CustomerList;
