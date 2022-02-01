import React from "react";
import { Loading, Grid } from "@nextui-org/react";

export default function Loader({ show }) {
  return (
    show && (
      <div className="Loader flex">
        <Grid.Container gap={2}>
          <Grid>
            <Loading type="points" size="xl" color="warning" />
          </Grid>
        </Grid.Container>
      </div>
    )
  );
}
