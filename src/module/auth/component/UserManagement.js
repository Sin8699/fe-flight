import React, { useState, useEffect } from "react";
import { PaperWrapped } from "@/componentsUI";
import {
  TableHead,
  TableRow,
  TableCell,
  Dialog,
  Menu,
  IconButton,
} from "@material-ui/core";
import { MoreVertRounded } from "@material-ui/icons";
import TableContainer from "@/components/TableContainer";
import MenuAction from "@/components/MenuAction";
import { renderAction } from "../utils";
import { userColumn } from "../constants";
import { TYPE_MODAL } from "@/constants/modal";
import UserModal from "./UserModal";
import DeleteModal from "@/components/DeleteModal";
import { useSelector } from "react-redux";
import authDispatcher from "../action";

const UserManagement = () => {
  const { listUser } = useSelector((state) => state.auth);

  const [selectedItem, setSelectedItem] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    authDispatcher.getAllData();
  }, []);

  const onShowModal = (type) => {
    setShowModal(true);
    setTypeModal(type);
    setAnchorEl(null);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setTypeModal(null);
  };
  const onSuccessAction = () => {
    onCloseModal();
    authDispatcher.getAllData();
  };

  const handleSubmit = (data) => {
    authDispatcher.updateData({ data, id: data.email }, onSuccessAction);
  };

  const handleDeleteItem = () => {};

  const listActions = renderAction({
    onEdit: () => {
      setAnchorEl(null);
      setTypeModal(TYPE_MODAL.Edit);
      setShowModal(true);
    },

    onDelete: () => {
      setAnchorEl(null);
    },
  });

  const TableHeader = () => (
    <TableHead>
      <TableRow>
        {userColumn.map((item) => (
          <TableCell key={item.stateValue}>{item.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  return (
    <PaperWrapped>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {anchorEl && <MenuAction listActions={listActions} />}
      </Menu>
      <TableContainer
        title="User Management"
        data={listUser}
        header={TableHeader}
        renderRow={(row) => (
          <>
            <TableCell>{row.fullName}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.numberPhone}</TableCell>
            <TableCell>{row.accountBalance}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell align="right">
              <IconButton
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                  setSelectedItem(row);
                }}
              >
                <MoreVertRounded />
              </IconButton>
            </TableCell>
          </>
        )}
      />
      <Dialog
        disableEnforceFocus
        maxWidth="md"
        fullWidth
        open={showModal}
        onClose={onCloseModal}
      >
        <UserModal
          onClose={onCloseModal}
          selectedItem={selectedItem}
          typeModal={typeModal}
          onSubmit={handleSubmit}
        />
      </Dialog>
      {deleteModal && (
        <DeleteModal
          showModal={deleteModal}
          selectedItem={selectedItem}
          onClose={() => setDeleteModal(false)}
          onDelete={handleDeleteItem}
          modalName="User"
          title={selectedItem.name}
        />
      )}
    </PaperWrapped>
  );
};

export default UserManagement;
