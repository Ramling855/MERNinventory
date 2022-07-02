import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "./reducers/Dataslice";
import TablePagination from "@mui/material/TablePagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddBoxSharpIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveSharpIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import Pagination from "@mui/material/Pagination";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Divider from "@mui/material/Divider";

// import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const AddOrder = () => {
  const [state, setState] = useState({ count: 0 });
  const [name, setName] = useState("");
  const [rows, setRows] = useState([]);
  const [flag, setFlag] = useState(false);
  const [key, setKey] = useState();
  const [sort, setSort] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:7001")
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag]);

  const increments = () => {
    setState({
      count: state.count + 1,
    });
  };
  const decrements = () => {
    setState({
      count: state.count - 1,
    });
  };
  const dispatch = useDispatch();
  // const OnbuybtnHandle = (e) => {
  //   console.log(e, state.count);

  //   dispatch(increment());
  //   dispatch(incrementByAmount(100));
  // };

  const OnbuybtnHandle = async (e) => {
    console.log(e, state.count, name);

    let data = {
      order: e,
      orderQty: state.count,
      custName: name,
      total: state.count * e.price,
    };
    console.log("data", data);
    await axios
      .post("http://localhost:7001/order", data)
      .then((res) => {
        alert("Record Saved");
        console.log("post", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //search
  const onSerachHandle = (e) => {
    setKey(e.target.value);
    console.log(key);
    axios
      .get(`http://localhost:7001/search/${key}`)
      .then((res) => {
        setRows(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //sort
  //name sort
  const sortHandle = async () => {
    if (sort === 1) {
      setSort(-1);
    } else {
      setSort(1);
    }
    await axios
      .get(`http://localhost:7001/sort/?num=${sort}`)
      .then((res) => {
        setRows(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, marginBottom: 1, marginTop: 1, marginRight: 3 }}>
        <Grid container direction="row" justifyContent="right">
          <TextField
            label="Enter Customer Name Here"
            onChange={(e) => setName(e.target.value)}
            color="secondary"
          />
        </Grid>
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1, marginBottom: 1, marginTop: 1, marginRight: 3 }}>
        <Grid container direction="row" justifyContent="right">
          <TextField
            label="Search Here"
            onChange={onSerachHandle}
            color="secondary"
          />
        </Grid>
      </Box>
      <Divider />

      <Box sx={{ flexGrow: 1, marginBottom: 1, marginTop: 1, marginRight: 3 }}>
        <Grid container direction="row" justifyContent="left">
          <p>* Click on name for filtering</p>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr.No</StyledTableCell>
              <StyledTableCell onClick={sortHandle} align="center">
                Product Name
              </StyledTableCell>
              <StyledTableCell align="center">Stock</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Total</StyledTableCell>
              <StyledTableCell align="center">Company</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                {/* <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell> */}
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.qty}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton aria-label="decrement" onClick={decrements}>
                    <RemoveSharpIcon />
                  </IconButton>
                  <span>{state.count}</span>
                  <IconButton aria-label="increment" onClick={increments}>
                    <AddBoxSharpIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">{row.price}</StyledTableCell>
                <StyledTableCell align="center">
                  {state.count * row.price}
                </StyledTableCell>
                <StyledTableCell align="center">{row.company}</StyledTableCell>
                <StyledTableCell align="center">
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      onClick={() => OnbuybtnHandle(row)}
                    >
                      Buy
                    </Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* // Product Table */}

      <Stack spacing={2} sx={{ mt: 2, ml: 42 }}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
    </div>
  );
};

export default AddOrder;
