import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";
import classes from "../styles/UserInvoicesPage.module.css";
import InvoiceDetailsModal from "../components/InvoiceDetailsModal";
import { useDisclosure } from "@mantine/hooks";

const UserInvoicesPage = () => {
  const [invoices, setInvoices] = useState();
  const { isAuthenticated, requestWithToken } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure();
  const [invoiceId, setInvoiceId] = useState();

  const fetchInvoices = async () => {
    try {
      const response = await requestWithToken(`/invoices/user`);
      if (response.status === 200) {
        setInvoices(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch Invoices");
    }
  };

  const formatDate = (dateString) => {
    let formattedDate = new Date(dateString).toLocaleDateString("en-GB");
    return formattedDate.replace(/\//g, ".");
  };

  const openModal = (invoiceId) => {
    setInvoiceId(invoiceId);
    open();
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchInvoices();
    }
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <>
      <h1>All invoices of a user</h1>
      {invoices &&
        invoices.map((invoice) => {
          return (
            <div
              key={invoice._id}
              className={classes.invoiceCtn}
              onClick={() => openModal(invoice._id)}
            >
              <p>
                Date: {formatDate(invoice.createdAt)} - Items:{" "}
                {invoice.fromOrder.items.length} - Total Paid:{" "}
                {(invoice.fromOrder.totalInEuroCentAfterDiscount / 100).toFixed(
                  2
                )}
                €
              </p>
            </div>
          );
        })}
      <InvoiceDetailsModal
        opened={opened}
        close={close}
        invoiceId={invoiceId}
      />
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default UserInvoicesPage;
