import { Loader, Modal } from "@mantine/core";
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
            {invoice.fromOrder.items.map((game) => {
              return (
                <p key={game._id}>
                  {game.gameId.title}:{" "}
                  {game.defaultPriceInEuroCent === game.finalItemPrice ? (
                    `${(game.finalItemPrice / 100).toFixed(2)}€`
                  ) : (
                    <>
                      <span className={classes.crossText}>
                        {(game.defaultPriceInEuroCent / 100).toFixed(2)}€
                      </span>{" "}
                      {(game.finalItemPrice / 100).toFixed(2)}€
                    </>
                  )}
                </p>
              );
            })}

            {/*only show discount if there was a code used, show price difference if discount was applied */}
            {invoice.fromOrder.discountCodePercentage > 0 && (
              <p>Discount: {invoice.fromOrder.discountCodePercentage}%</p>
            )}
            {invoice.fromOrder.totalInEuroCentBeforeDiscount ===
            invoice.fromOrder.totalInEuroCentAfterDiscount ? (
              <p className={classes.priceTotal}>
                Total:{" "}
                {(invoice.fromOrder.totalInEuroCentAfterDiscount / 100).toFixed(
                  2
                )}
                €
              </p>
            ) : (
              <p className={classes.priceTotal}>
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
      <Loader color="blue" size="xl" type="dots" />
    </>
  );
};

export default InvoiceDetailsModal;
