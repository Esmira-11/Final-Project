import React, { useEffect, useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/auth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import loadinggif from '../../assets/images/loading.gif';
import './favorites.scss'

function FavoritesPage() {
  const { favorites,setFavorites, removeFromFavorites } = useFavorites();
  const [auth] = useAuth();
  const [category, setcategory] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); 
    }, 5000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

//   useEffect(() => {
//     if (auth.user) {
//         axios.get('http://localhost:5000/api/favorites/getfavorites')
      
//         .then(response => setFavorites(response.data))
//         .catch(error => console.error(error));
//     }  
// }, [auth.user]);

  return (
    <>
    {isLoading ? (<><div
          className="loading-container"
          style={{ display: "flex", justifyContent: "center",paddingTop:'100px' }}
        >
          <img
            src={loadinggif}
            alt="Loading GIF"
            className="loading-gif"
            width={420}
          />
        </div></>) : (<>
          <div className='favorite-table'>
      {favorites?.length
              ? <TableContainer className="table" component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className="thead">
                  <TableRow>
                        <TableCell className="thcell">Name</TableCell>
                        <TableCell className="thcell">Photo</TableCell>
                        <TableCell className="thcell">Price</TableCell>
                        <TableCell className="thcell">Description</TableCell>
                        <TableCell className="thcell">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                      {favorites?.map((row) => (<>
                        <TableRow
                          key={row.product._id}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.product.name.substring(0,20)}...
                          </TableCell>
                          <TableCell component="th" scope="row" width={110}>
                            <img
                              style={{ width: "100%", height: "100%" }}
                              src={`https://mern-project-server-oonq.onrender.com/api/product/product-photo/${row.product._id}`}
                              alt="product-img"
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.product.price}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.product.description.substring(0,40)}...
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <button
                              id="delete"
                              className="btn btn-primary"
                              onClick={() => {removeFromFavorites(row.product._id)}}
                            >
                              Remove 
                            </button>
                          </TableCell>
                        </TableRow>
                        </>
                      ))}
                    </TableBody>
              </Table>
            </TableContainer>
              : <h4>Your Favorites Box Empty</h4>}
    </div>
        </>)}
     
    </>
   
  );
}

export default FavoritesPage;