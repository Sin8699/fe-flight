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
import { midAirportColumn } from "../constants";
import { TYPE_MODAL } from "@/constants/modal";
import MiddleAirportModal from "./MiddleAirportModal";
import DeleteModal from "@/components/DeleteModal";
import { useSelector } from "react-redux";
import midAirportDispatcher from "../action";
import flightDispatcher from "@/module/flight/action";

const MiddleAirportManagement = () => {
  const { list } = useSelector((state) => state.middleAirport);
  const { list: flightList } = useSelector((state) => state.flight);

  const [selectedItem, setSelectedItem] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    midAirportDispatcher.getData();
    flightDispatcher.getData();
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

  const onSuccess = () => {
    onCloseModal();
    midAirportDispatcher.getData();
  };

  const handleSubmit = (data) => {
    if (typeModal === TYPE_MODAL.Create)
      midAirportDispatcher.createData(data, onSuccess);
    else midAirportDispatcher.updateData({ data, id: data.id }, onSuccess);
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
        {midAirportColumn.map((item) => (
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
        title="Middle Airport Management"
        data={list}
        header={TableHeader}
        onAddNew={() => onShowModal(TYPE_MODAL.Create)}
        renderRow={(row) => (
          <>
            <TableCell>{row.flightCode}</TableCell>
            <TableCell>{row.timeDelay}</TableCell>
            <TableCell>{row.order}</TableCell>
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
        <MiddleAirportModal
          onClose={onCloseModal}
          selectedItem={selectedItem}
          typeModal={typeModal}
          onSubmit={handleSubmit}
          flightList={flightList}
        />
      </Dialog>
      {deleteModal && (
        <DeleteModal
          showModal={deleteModal}
          selectedItem={selectedItem}
          onClose={() => setDeleteModal(false)}
          onDelete={handleDeleteItem}
          modalName="MiddleAirport"
          title={selectedItem.name}
        />
      )}
    </PaperWrapped>
  );
};

export default MiddleAirportManagement;
