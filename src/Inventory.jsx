import React, { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddModal from "./AddModal";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from '@mui/icons-material/Add';
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import AddStockEdit from "./AddStockEdit";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";

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

export default function Inventory() {

////////////////////rrrrr


  const [state,setState]=useState("")

  const headers = {
     
    'token':localStorage.getItem("token")
  }  
  
  
     useEffect(()=>{
       
    axios.get("http://localhost:8080/user/showuser", {
      headers: headers
    }).then(response=>{

         
         const realdata=response.data.data
          //console.log(realdata)
          realdata.map(ele=>{
            setState(ele.role)
            console.log(state)
          })
          //console.log(headers)
        

    }).catch(err=>{
      console.log(err)
    })

},[])

       
       



/////////////////////rrrrrr
  const [rows, setRows] = useState([]);
  const [flag, setFlag] = useState(false);
  const [key, setKey] = useState();
  const [sort, setSort] = useState(1);

  const onDeleteHandle = async (i) => {
    console.log("Delete Handler", i);
    await axios
      .delete(`http://localhost:8080/delete/${i}`)
      .then((res) => {
        setFlag(true);
        alert("Record Deleted Sucesfully.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080")
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag]);

  //search
  const onSerachHandle = (e) => {
    setKey(e.target.value);
    console.log(key);
    axios
      .get(`http://localhost:8080/search/${key}`)
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
      .get(`http://localhost:8080/sort/?num=${sort}`)
      .then((res) => {
        setRows(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


              if(localStorage.getItem("admin")&&(state!=='admin')){
  return (
    <div>
      <Box sx={{ flexGrow: 1, marginBottom: 3, marginTop: 3, marginRight: 3 }}>
        <AddModal />
      </Box>
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
                Name
              </StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">catagory</StyledTableCell>
              <StyledTableCell align="center">company</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>

                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.qty}</StyledTableCell>
                <StyledTableCell align="center">{row.price}</StyledTableCell>
                <StyledTableCell align="center">{row.catagory}</StyledTableCell>
                <StyledTableCell align="center">{row.company}</StyledTableCell>
                <StyledTableCell align="center">
                  <AddStockEdit id={row} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <DeleteIcon onClick={() => onDeleteHandle(row._id)} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

 else {
                return(<><Alert severity="error" >Restricted Access</Alert></>)

               

              }
}