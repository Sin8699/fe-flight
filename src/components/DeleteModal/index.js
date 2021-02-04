import React from "react";
import { Modal, Typography } from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";
import { get } from "lodash";

const DeleteModal = ({
  showModal,
  onClose,
  selectedItem,
  onDelete,
  modalName,
  keyTitle,
  Icon = DeleteRounded,
  title,
  content = "Click “Continue” to delete",
}) => {
  return (
    <Modal open={showModal} onClose={onClose}>
      {/* <div>
        <ModalPresenter
          onClose={onClose}
          Icon={<Icon style={{ fontSize: 80, color: "#EA6B75" }} />}
          title={
            title ||
            `Delete '${get(selectedItem, keyTitle || "name")}' ${modalName}?`
          }
          onClick={onDelete}
        >
          <Typography style={{ textAlign: "center" }}>{content}</Typography>
        </ModalPresenter>
      </div> */}
    </Modal>
  );
};

export default DeleteModal;
