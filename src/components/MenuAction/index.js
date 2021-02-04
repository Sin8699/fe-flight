import React from "react";
import { MenuItem, ListItemIcon } from "@material-ui/core";
import styled from "styled-components";

const MenuAction = ({ listActions }) => {
  return listActions.map((action) => {
    const Icon = action.icon;
    return (
      <MenuItemAction
        key={action.key}
        onClick={() => {
          action.onClick();
        }}
      >
        <ListItemMenuIcon style={{ minWidth: 34 }}>
          <Icon className="icon" />
        </ListItemMenuIcon>
        {action.label}
      </MenuItemAction>
    );
  });
};

const MenuItemAction = styled(MenuItem)`
  display: flex;
  align-items: center;
  color: #192637;
`;

const ListItemMenuIcon = styled(ListItemIcon)`
  .icon {
    color: #cacfd3;
    g {
      fill: #cacfd3;
    }
  }
  svg {
    color: #cacfd3;
  }
`;

export default MenuAction;
