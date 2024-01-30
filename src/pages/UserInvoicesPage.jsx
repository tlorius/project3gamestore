import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { UserContext } from "../providers/UserContext";
import { toast } from "react-toastify";
import classes from "../styles/UserInvoicesPage.module.css";

const UserInvoicesPage = () => {
  const [invoices, setInvoices] = useState();
  const { isAuthenticated, requestWithToken } = useContext(AuthContext);
  const { user } = useContext(UserContext);

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

  const openModal = (invoiceId) => {};

  useEffect(() => {
    fetchInvoices();
  }, []);

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
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default UserInvoicesPage;
