import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const InvoiceDetailsModal = () => {
  const [opened, { open, close }] = useDisclosure();
  return (
    <>
      <h1>Details of one invoice</h1>
      <Modal>hmmm</Modal>
    </>
  );
};

export default InvoiceDetailsModal;
