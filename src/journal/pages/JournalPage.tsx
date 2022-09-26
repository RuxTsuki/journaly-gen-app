import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useGetNote from "../../hooks/useGetNote";
import { startNewNote } from "../../store/journal/journalThunks";
import JournalLayout from "../layout/JournalLayout";
import JournalNoteView from "../views/JournalNoteView";
import JournalNothingView from "../views/JournalNothingView";

const JournalPage = () => {
  const dispatch = useAppDispatch();
  const { isSaving, activeNote } = useGetNote();

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {activeNote ? <JournalNoteView /> : <JournalNothingView />}

      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};

export default JournalPage;
