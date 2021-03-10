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
import { saleColumn } from "../constants";
import { TYPE_MODAL } from "@/constants/modal";
import SaleModal from "./SaleModal";
import DeleteModal from "@/components/DeleteModal";
import { useSelector } from "react-redux";
import saleDispatcher from "../action";

const SaleManagement = () => {
  const { list } = useSelector((state) => state.historySale);
  console.log('list: ', list);

  const [selectedItem, setSelectedItem] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    saleDispatcher.getData();
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

  const handleSubmit = (data) => {
    if (typeModal === TYPE_MODAL.Create)
      saleDispatcher.createData(data, onCloseModal);
    else saleDispatcher.updateData(data, onCloseModal);
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
    selectedItem,
  });

  const TableHeader = () => (
    <TableHead>
      <TableRow>
        {saleColumn.map((item) => (
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
        title="History Sale"
        data={list}
        header={TableHeader}
        onAddNew={() => onShowModal(TYPE_MODAL.Create)}
        renderRow={(row) => (
          <>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.flightCode}</TableCell>
            <TableCell>{row.airportFrom}</TableCell>
            <TableCell>{row.airportTo}</TableCell>
            <TableCell>{row.dateStart}</TableCell>
            <TableCell>{row.dateEnd}</TableCell>
            <TableCell>{row.vipPrice}</TableCell>
            <TableCell>{row.normalPrice}</TableCell>
            <TableCell>{row.status}</TableCell>
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
        <SaleModal
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
          modalName="Sale"
          title={selectedItem.name}
        />
      )}
    </PaperWrapped>
  );
};

export default SaleManagement;
