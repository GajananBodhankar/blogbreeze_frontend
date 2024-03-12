import { Box, Button, CircularProgress } from "@mui/material";
import { getAllBlogs } from "../api/apicalls";
import { useState } from "react";

function Pagination({ allBlogs, page, setPage, setAllBlogs }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      position={"absolute"}
      gap={5}
      sx={{
        bottom: -70,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {allBlogs?.hasNext ? (
        <>
          {page == 1 ? (
            loading ? (
              <CircularProgress />
            ) : (
              <>
                <Button
                  disabled
                  variant="outlined"
                  style={{
                    color: "#ee6c02",
                    outlineColor: "#ee6c02",
                    border: "2px solid #ee6c02",
                    opacity: "50%",
                  }}
                >
                  Prev
                </Button>
                <Button
                  color="warning"
                  variant="outlined"
                  style={{
                    border: "2px solid #ee6c02",
                  }}
                  onClick={async () => {
                    setLoading(true);
                    setPage(page + 1);
                    await getAllBlogs(allBlogs, setAllBlogs, page + 1);
                    setLoading(false);
                  }}
                >
                  Next
                </Button>
              </>
            )
          ) : loading ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                variant="outlined"
                style={{
                  color: "#ee6c02",
                  outlineColor: "#ee6c02",
                  border: "2px solid #ee6c02",
                }}
                onClick={async () => {
                  setLoading(true);
                  setPage(page - 1);
                  await getAllBlogs(allBlogs, setAllBlogs, page - 1);
                  setLoading(false);
                }}
              >
                Prev
              </Button>
              <Button
                variant="outlined"
                style={{
                  color: "#ee6c02",
                  outlineColor: "#ee6c02",
                  border: "2px solid #ee6c02",
                  opacity: "50%",
                }}
                onClick={async () => {
                  setLoading(true);
                  setPage(page + 1);
                  await getAllBlogs(allBlogs, setAllBlogs, page + 1);
                  setLoading(false);
                }}
              >
                Next
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          {page > 1 ? (
            loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="outlined"
                style={{
                  color: "#ee6c02",
                  outlineColor: "#ee6c02",
                  border: "2px solid #ee6c02",
                }}
                onClick={async () => {
                  setLoading(true);
                  await getAllBlogs(allBlogs, setAllBlogs, page - 1);
                  setPage(page - 1);
                  setLoading(false);
                }}
              >
                Prev
              </Button>
            )
          ) : null}
        </>
      )}
    </Box>
  );
}

export default Pagination;
