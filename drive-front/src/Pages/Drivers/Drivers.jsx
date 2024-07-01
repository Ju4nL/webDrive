import React, { useEffect, useState } from 'react';
import CardContainer from '../../components/CardContainer';
import UsersIcon from '../../components/icons/Users';
import GenericTable from '../../components/GenericTable';
import Avatar from '../../components/Avatar';

const exampleData = [
    { name: 'John Doe', image: 'https://via.placeholder.com/150', accountNumber: '12345678', accountName: 'John Account', amount: '$500.00' },
    { name: 'Jane Smith', image: 'https://via.placeholder.com/150', accountNumber: '87654321', accountName: 'Jane Account', amount: '$1500.00' },
    { name: 'Alice Johnson', image: 'https://via.placeholder.com/150', accountNumber: '11223344', accountName: 'Alice Account', amount: '$2000.00' },
    { name: 'Bob Brown', image: 'https://via.placeholder.com/150', accountNumber: '44332211', accountName: 'Bob Account', amount: '$750.00' },
    { name: 'Charlie Black', image: 'https://via.placeholder.com/150', accountNumber: '55667788', accountName: 'Charlie Account', amount: '$950.00' },
    { name: 'Diana White', image: 'https://via.placeholder.com/150', accountNumber: '88776655', accountName: 'Diana Account', amount: '$1250.00' },
    { name: 'Edward Green', image: 'https://via.placeholder.com/150', accountNumber: '66778899', accountName: 'Edward Account', amount: '$300.00' },
    { name: 'Fiona Blue', image: 'https://via.placeholder.com/150', accountNumber: '99887766', accountName: 'Fiona Account', amount: '$650.00' },
    { name: 'George Red', image: 'https://via.placeholder.com/150', accountNumber: '77889900', accountName: 'George Account', amount: '$820.00' },
    { name: 'Hannah Yellow', image: 'https://via.placeholder.com/150', accountNumber: '33445566', accountName: 'Hannah Account', amount: '$920.00' },
  ];

const DriversPage = () => {
  const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('/api/drivers')
//       .then(response => response.json())
//       .then(data => setData(data));
//   }, []);

useEffect(() => {
    setData(exampleData);
  }, []);

    const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: "name",
      width: "300px",
      Cell: ({ row, value }) => {
        return (
          <div className="flex gap-2 items-center">
            <Avatar src={row.original.image} alt={`${value}'s Avatar`} />
            <div>{value}</div>
          </div>
        );
      },
    },
    {
      Header: "Account Number",
      accessor: "accountNumber",
    },
    {
      Header: "Account Name",
      accessor: "accountName",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
  ], []);

  return (
    <CardContainer Icon={UsersIcon} title="Conductores" subtitle="Lista de conductores activos">
      <GenericTable columns={columns} data={data} />
    </CardContainer>
  );
}

export default DriversPage;
