import { DeleteRounded, Edit } from "@material-ui/icons";

export const renderAction = ({ onEdit, onDelete }) => {
  const LIST_ACTIONS = [
    {
      key: "edit",
      icon: Edit,
      label: "Edit",
      onClick: onEdit,
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
