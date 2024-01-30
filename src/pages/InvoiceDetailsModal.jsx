import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { UserContext } from "../providers/UserContext";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";

const InvoiceDetailsModal = () => {
  const [opened, { open, close }] = useDisclosure();
  const { isAuthenticated } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  return isAuthenticated ? (
    <>
      <Modal>One invoice :)</Modal>
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default InvoiceDetailsModal;
