import { Typography, Grid } from "@mui/material";

type Props = {
  children: JSX.Element;
  title: string;
};

const AuthLayout = ({ children, title }: Props) => {
  return (
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
      <Grid
        container
        className="box-shadow "
        sx={{
          width: { sm: 480 },
          backgroundColor: "white",
          borderRadius: 2,
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography variant="h5" textAlign={"center"} sx={{ mb: 1, mt: 2 }}>
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
