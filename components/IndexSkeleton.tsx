import React from "react";
import { Box, Skeleton, Grid, Card, CardContent, Typography } from "@mui/material";

const IndexSkeleton = () => {
    return (
        <Box display="flex" height="85vh" >

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


            <Box flex="1" p={1}>
                <Box
                    p={1}
                    sx={{
                        overflowY: "auto",
                        height: "90%",
                    }}
                >
                    <Typography variant="h6">
                        <Skeleton variant="text" width="40%" height={30} />
                    </Typography>
                    {Array.from(new Array(3)).map((_, index) => (
                        <Card key={index} sx={{ mb: 2 }}>
                            <CardContent>
                                <Skeleton variant="text" width="70%" height={20} />
                                <Skeleton variant="text" width="50%" height={20} />
                                <Skeleton variant="text" width="30%" height={20} />
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                <Box
                    sx={{
                        height: "10%",
                    }}
                    p={1}
                >
                    <Box mt={2}>
                        <Skeleton variant="text" width="30%" height={30} />
                        <Skeleton variant="rectangular" width="100px" height={40} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default IndexSkeleton;
