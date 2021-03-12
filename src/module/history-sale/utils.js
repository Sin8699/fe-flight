import { DeleteRounded, Edit } from "@material-ui/icons";
import { ROLE_PERMISSION } from "@/constants/permission";

export const renderAction = ({
  onViewDetail,
  onCancelTicket,
  selectedItem,
}) => {
  let LIST_ACTIONS = [
    {
      key: "view",
      icon: Edit,
      label: "View Detail",
      onClick: onViewDetail,
    },
  ];
  if (!selectedItem?.status) {
    LIST_ACTIONS.unshift({
      key: "cancel",
      icon: DeleteRounded,
      label: "Cancel Ticket",
      onClick: onCancelTicket,
    });
  }
  return LIST_ACTIONS;
};
