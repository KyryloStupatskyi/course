import React from "react";
import { Collapse, List, ListItemButton, ListItemIcon, Typography } from "@mui/material"
import { AdminAbility } from "../utils/adminConsts";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import '../styles/css/AdminPage.css'
import '../styles/media/AdminPage.css'


const AdminAbilitiesList = observer(() => {
  const { admin } = React.useContext(Context)
  const [open, setOpen] = React.useState(true)

  const handleOpen = () => {
    open === true ? setOpen(false) : setOpen(true);
  }

  React.useEffect(() => {
    if (AdminAbility.length > 0) {
      admin.setSelectAdminAbility(AdminAbility[0].subItems[0]);
    }
  }, [admin]);

  return (
    <List className="ablility-list">
      {AdminAbility.map((item) => (
        <React.Fragment key={item.index}>
          <ListItemButton onClick={item.subItems ? handleOpen : () => admin.setSelectAdminAbility(item)}
            selected={item.subItems ? item.subItems.title === admin._selectAdminAbility.title : item.title === admin._selectAdminAbility.title}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <Typography className="list-item">{item.title}</Typography>
            {item.subItems ? (open ? <ExpandLess /> : <ExpandMore />) : null}
          </ListItemButton>

          {item.subItems && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.subItems.map((subItem) => (
                  <ListItemButton
                    key={subItem.index}
                    sx={{ pl: 4 }}
                    onClick={() => admin.setSelectAdminAbility(subItem)}
                    selected={subItem.title === admin._selectAdminAbility.title}
                  >
                    <ListItemIcon>{subItem.icon}</ListItemIcon>
                    <Typography className="list-item">{subItem.title}</Typography>
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List >
  )
})
export default AdminAbilitiesList