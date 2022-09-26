import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Note } from "../../generalTypes/notes.interface";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useForm } from "../../hooks/useForm";
import useGetNote from "../../hooks/useGetNote";
import { setActiveNote } from "../../store/journal/journalSlice";
import {
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store/journal/journalThunks";
import ImageGallery from "../../ui/components/imageGallery/ImageGallery";

const JournalNoteView = () => {
  const dispatch = useAppDispatch();
  const { activeNote, msgSaved, isSaving } = useGetNote();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { body, title, date, formState, onInputChange } = useForm(activeNote);

  const dateString = useMemo(() => {
    const activeDateNote = new Date(date);

    return activeDateNote.toUTCString();
  }, [date]);

  useEffect(() => {
    console.log("En efecto cambio la nota");
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (msgSaved.length > 0) {
      Swal.fire(msgSaved, "", "success");
    }
  }, [msgSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onInputFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) return;

    dispatch(startUploadingFiles(target.files));
  };

  const onDeleteNote =() => {
    dispatch(startDeletingNote());
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize="39" fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid>
        <input
          type="file"
          multiple
          name=""
          onChange={onInputFileChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadFileOutlined />
        </IconButton>

        <Button
          onClick={onSaveNote}
          disabled={isSaving}
          color="primary"
          sx={{ p: 1 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          <Typography>Save</Typography>
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Title"
          label="Title"
          name="title"
          value={title}
          onChange={onInputChange}
          sx={{ border: "none", mb: 1 }}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What's happening today"
          minRows={6}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button
        onClick={onDeleteNote}
        sx={{mt: 2}}
        color="error"
        >
          <DeleteOutline></DeleteOutline>
        </Button>
      </Grid>

      <ImageGallery images={activeNote?.imageUrls || []} />
    </Grid>
  );
};

export default JournalNoteView;
