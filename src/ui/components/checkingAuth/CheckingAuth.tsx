import { CircularProgress, Grid, Typography } from "@mui/material";

type Props = {};

const CheckingAuth = (props: Props) => {
  return (
    <>
      <Grid
        container
        spacing="0"
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: "100vh",
          backgroundColor: "primary.main",
          p: 2,
        }}
      >
        <Grid container direction="row" justifyContent="center">
          <CircularProgress color="warning"></CircularProgress>
        </Grid>
      </Grid>
    </>
  );
};

export default CheckingAuth;
