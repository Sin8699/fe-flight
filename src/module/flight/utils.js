import { DeleteRounded, Edit } from "@material-ui/icons";
import { ROLE_PERMISSION } from "@/constants/permission";

export const renderAction = ({
  onEdit,
  onDelete,
  onViewDetail,
  onBookTicket,
  role,
}) => {
  let LIST_ACTIONS = [
    // {
    //   key: "delete",
    //   icon: DeleteRounded,
    //   label: "Delete",
    //   onClick: onDelete,
    // },
  ];
  if (role === ROLE_PERMISSION.Admin) {
    LIST_ACTIONS.unshift({
      key: "edit",
      icon: Edit,
      label: "Edit",
      onClick: onEdit,
    });
  } else
    LIST_ACTIONS.unshift(
      {
        key: "view",
        icon: Edit,
        label: "View",
        onClick: onViewDetail,
      },
      {
        key: "bookTicket",
        icon: Edit,
        label: "Book Ticket",
        onClick: onBookTicket,
      }
    );
  return LIST_ACTIONS;
};
