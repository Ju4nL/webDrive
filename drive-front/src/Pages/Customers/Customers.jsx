import React, { useEffect, useState, useMemo } from 'react';
import CardContainer from '../../components/CardContainer';
import UsersIcon from '../../components/icons/Users';
import GenericTable from '../../components/GenericTable';
import Avatar from '../../components/Avatar';

const exampleCustomerData = [
  { name: 'Michael Scott', image: 'https://via.placeholder.com/150', accountNumber: '98765432', accountName: 'Michael Account', amount: '$3000.00' },
  { name: 'Pam Beesly', image: 'https://via.placeholder.com/150', accountNumber: '23456789', accountName: 'Pam Account', amount: '$1200.00' },
  { name: 'Jim Halpert', image: 'https://via.placeholder.com/150', accountNumber: '34567890', accountName: 'Jim Account', amount: '$2500.00' },
  { name: 'Dwight Schrute', image: 'https://via.placeholder.com/150', accountNumber: '45678901', accountName: 'Dwight Account', amount: '$3200.00' },
  { name: 'Angela Martin', image: 'https://via.placeholder.com/150', accountNumber: '56789012', accountName: 'Angela Account', amount: '$900.00' },
  { name: 'Kevin Malone', image: 'https://via.placeholder.com/150', accountNumber: '67890123', accountName: 'Kevin Account', amount: '$700.00' },
  { name: 'Oscar Martinez', image: 'https://via.placeholder.com/150', accountNumber: '78901234', accountName: 'Oscar Account', amount: '$1300.00' },
  { name: 'Stanley Hudson', image: 'https://via.placeholder.com/150', accountNumber: '89012345', accountName: 'Stanley Account', amount: '$1500.00' },
  { name: 'Phyllis Vance', image: 'https://via.placeholder.com/150', accountNumber: '90123456', accountName: 'Phyllis Account', amount: '$1700.00' },
  { name: 'Meredith Palmer', image: 'https://via.placeholder.com/150', accountNumber: '01234567', accountName: 'Meredith Account', amount: '$600.00' },
];

const CustomersPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(exampleCustomerData);
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
    <CardContainer Icon={UsersIcon} title="Clientes" subtitle="Listado de clientes">
      <GenericTable columns={columns} data={data} />
    </CardContainer>
  );
}

export default CustomersPage;
