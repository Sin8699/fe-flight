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
import FlightModal from "./FlightModal";
import DeleteModal from "@/components/DeleteModal";
import { useSelector } from "react-redux";
import flightDispatcher from "../action";
import airportDispatcher from "@/module/airport/action";
import saleDispatcher from "@/module/history-sale/action";
import moment from "moment";

const FlightManagement = () => {
  const { list } = useSelector((state) => state.flight);
  const { userInfo } = useSelector((state) => state.auth);
  const { list: airportList } = useSelector((state) => state.airport);

  const [selectedItem, setSelectedItem] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    flightDispatcher.getData();
    airportDispatcher.getData();
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
    flightDispatcher.getData();
  };

  const handleSubmit = (data) => {
    console.log('data: ', data);
    if (typeModal === TYPE_MODAL.Create)
      flightDispatcher.createData(data, onSuccessAction);
    else {
      if (typeModal === TYPE_MODAL.BookTicket) {
        moment().isAfter(
          moment(selectedItem.dateStart).subtract(30, "m") &&
            saleDispatcher.createData(data, onCloseModal)
        );
      } else flightDispatcher.updateData(data, onSuccessAction);
    }
  };

  const handleDeleteItem = () => {};

  const listActions = renderAction({
    onViewDetail: () => {
      setAnchorEl(null);
      setTypeModal(TYPE_MODAL.View);
      setShowModal(true);
    },
    onEdit: () => {
      setAnchorEl(null);
      setTypeModal(TYPE_MODAL.Edit);
      setShowModal(true);
    },
    onBookTicket: () => {
      setAnchorEl(null);
      setTypeModal(TYPE_MODAL.BookTicket);
      setShowModal(true);
    },
    onDelete: () => {
      setAnchorEl(null);
    },
    role: userInfo?.role,
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
        title="Flight"
        data={list}
        header={TableHeader}
        onAddNew={() => onShowModal(TYPE_MODAL.Create)}
        renderRow={(row) => (
          <>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.airportFrom}</TableCell>
            <TableCell>{row.airportTo}</TableCell>
            <TableCell>{row.dateStart}</TableCell>
            <TableCell>{row.dateEnd}</TableCell>
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
        <FlightModal
          onClose={onCloseModal}
          selectedItem={selectedItem}
          typeModal={typeModal}
          airportList={airportList}
          onSubmit={handleSubmit}
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
