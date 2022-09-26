import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Note } from "../../../generalTypes/notes.interface";
import { useMemo } from "react";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { setActiveNote } from "../../../store/journal/journalSlice";

const SideBarItem = ({ body, title, date, id, imageUrls = [] }: Note) => {
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  const dispatch = useAppDispatch();

  const onClickListItem = () => {
    dispatch(
      setActiveNote({
        body,
        title,
        date,
        id,
        imageUrls,
      })
    );
  };

  return (
    <ListItem disablePadding onClick={onClickListItem}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>

        <Grid container>
          <ListItemText primary={newTitle}></ListItemText>
          <ListItemText secondary={body}></ListItemText>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarItem;
