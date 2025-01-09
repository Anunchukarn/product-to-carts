import React from "react";
import { Box, Grid, Skeleton,FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function ManageProductsSkeleton() {
  return (
    <Box display="flex" height="85vh">
      <Box
        flex="2"
        p={2}
        sx={{
          borderRight: "1px solid #ccc",
        }}
      >
        <Skeleton variant="rectangular" height={40} width="100%" sx={{ mb: 2 }} />
        <Box sx={{ overflowY: "auto", height: "90%" }}>
          <Grid container spacing={2}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Grid item xs={12} sm={12} md={12} key={index}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Skeleton variant="rectangular" width={100} height={100} />
                  <Box flex="1">
                    <Skeleton variant="text" width="80%" height={30} />
                    <Skeleton variant="text" width="60%" height={20} />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box
        flex="1"
        p={2}
        sx={{
          overflowY: "auto",
          height: "100%",
        }}
      >
        <Skeleton variant="text" width="60%" height={30} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="50%" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={100} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>
            <Skeleton variant="text" width="60%" height={20} />
          </InputLabel>
          <Select disabled>
            <MenuItem>
              <Skeleton variant="text" width="100%" height={20} />
            </MenuItem>
          </Select>
        </FormControl>
        <Skeleton variant="rectangular" width="50%" height={40} sx={{ mt: 4 }} />
      </Box>
    </Box>
  );
}
