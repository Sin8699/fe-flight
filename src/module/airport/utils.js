import { DeleteRounded, Edit } from "@material-ui/icons";

export const renderAction = ({
  onEdit,
  onDelete,
  onViewDetail,
  onBookTicket,
}) => {
  const LIST_ACTIONS = [
    {
      key: "view",
      icon: Edit,
      label: "View",
      onClick: onViewDetail,
    },
    {
      key: "edit",
      icon: Edit,
      label: "Edit",
      onClick: onEdit,
    },
    {
      key: "bookTicket",
      icon: Edit,
      label: "Book Ticket",
      onClick: onBookTicket,
    },
    {
      key: "delete",
      icon: DeleteRounded,
      label: "Delete",
      onClick: onDelete,
    },
  ];
  return LIST_ACTIONS;
};
