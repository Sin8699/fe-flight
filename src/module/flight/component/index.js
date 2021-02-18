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
import { flightColumn } from "../constants";
import { TYPE_MODAL } from "@/constants/modal";
import FightModal from "./FlightModal";
import DeleteModal from "@/components/DeleteModal";
import { useSelector } from "react-redux";
import flightDispatcher from "../action";

const FlightManagement = () => {
  const { list } = useSelector((state) => state.flight);

  const [selectedItem, setSelectedItem] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
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
        {flightColumn.map((item) => (
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
        title="Flight Management"
        data={list}
        header={TableHeader}
        onAddNew={() => onShowModal(TYPE_MODAL.Create)}
        renderRow={(row) => (
          <>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.flightCode}</TableCell>
            <TableCell>{row.airportFrom}</TableCell>
            <TableCell>{row.airportTo}</TableCell>
            <TableCell>{row.dateStar}</TableCell>
            <TableCell>{row.timeStar}</TableCell>
            <TableCell>{row.vipPrice}</TableCell>
            <TableCell>{row.normalPrice}</TableCell>
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
        maxWidth="lg"
        fullWidth
        open={showModal}
        onClose={onCloseModal}
      >
        <FightModal
          onClose={onCloseModal}
          selectedItem={selectedItem}
          typeModal={typeModal}
        />
      </Dialog>
      {deleteModal && (
        <DeleteModal
          showModal={deleteModal}
          selectedItem={selectedItem}
          onClose={() => setDeleteModal(false)}
          onDelete={handleDeleteItem}
          modalName="Flight"
          title={selectedItem.name}
        />
      )}
    </PaperWrapped>
  );
};

export default FlightManagement;
