import { Modal } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";
import classes from "../styles/InvoiceDetailsModal.module.css";

const InvoiceDetailsModal = ({ opened, close, invoiceId }) => {
  const { isAuthenticated, requestWithToken } = useContext(AuthContext);
  const [invoice, setInvoice] = useState();

  const fetchInvoice = async () => {
    try {
      const response = await requestWithToken(`/invoices/user/${invoiceId}`);
      if (response.status === 200) {
        console.log(response.data);
        setInvoice(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch Invoices");
    }
  };

  useEffect(() => {
    if (isAuthenticated && opened) {
      fetchInvoice();
    }
  }, [isAuthenticated, opened]);

  return isAuthenticated ? (
    <>
      <Modal opened={opened} onClose={close} title="Invoice Details">
        {invoice && (
          <div>
            <p>render all games here</p>
            {invoice.fromOrder.discountCodePercentage > 0 && (
              <p>Discount:{invoice.fromOrder.discountCodePercentage}%</p>
            )}
            {invoice.fromOrder.totalInEuroCentBeforeDiscount ===
            invoice.fromOrder.totalInEuroCentAfterDiscount ? (
              <p>
                Total:{" "}
                {(invoice.fromOrder.totalInEuroCentAfterDiscount / 100).toFixed(
                  2
                )}
                €
              </p>
            ) : (
              <p>
                Total:{" "}
                <span className={classes.crossText}>
                  {(
                    invoice.fromOrder.totalInEuroCentBeforeDiscount / 100
                  ).toFixed(2)}
                  €
                </span>{" "}
                {(invoice.fromOrder.totalInEuroCentAfterDiscount / 100).toFixed(
                  2
                )}
                €
              </p>
            )}
          </div>
        )}
      </Modal>
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default InvoiceDetailsModal;
