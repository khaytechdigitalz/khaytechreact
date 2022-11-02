// @mui
import { useState,useEffect } from 'react';
import {Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer,
  Button,
} from '@mui/material';
// utils
import { fDateTime } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// _mock_
import { _ecommerceBestSalesman } from '../../../_mock';
// components
import Label from '../../../components/Label';
import Image from '../../../components/Image';
import Scrollbar from '../../../components/Scrollbar';
import axios from '../../../utils/axios';
import useAuth from '../../../hooks/useAuth';


import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
} from '../../../components/table';
import useTable, { emptyRows } from '../../../hooks/useTable';

import {
  SkeletonPost,
} from '../../../components/skeleton';
import { HOST_URL } from '../../../config';

// ----------------------------------------------------------------------

export default function EcommerceBestSalesman() {
  const theme = useTheme();
  const [post, setPost] = useState(null);
  const {general } = useAuth();


  useEffect(() => {
    axios.get('/user/vpinbatch').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return <SkeletonPost  sx={{ width: 40 }} />;
  const results = JSON.stringify(post.data.data.bills);
  const rep = (Object.values(results));
  const personObject = JSON.parse(results);
  const isNotFound = (!personObject.length );
   
 return (
    <Card>
      <CardHeader title="VPin Printing History" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer>
          <Table>
             <TableHead>
              <TableRow>
                <TableCell>TRX ID</TableCell>
                <TableCell>Unit </TableCell>
                <TableCell>Value </TableCell>
                 <TableCell>Total </TableCell>
                <TableCell> Date </TableCell>
                 <TableCell align="right">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personObject.map((row) => (
                <TableRow key={row.id}>
                 <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box>
                        <Typography variant="subtitle2"> {row.trx}</Typography>
                      </Box>
                    </Box>
                  </TableCell> 
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {row.unit}
                  </Box>
                </TableCell> 
                  
                  
                <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box>
                        <Typography variant="subtitle2"> {general.cur_sym}{fCurrency(row.amount)}</Typography>
                      </Box>
                    </Box>
                  </TableCell> 
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box>
                        <Typography variant="subtitle2"> {general.cur_sym}{fCurrency(row.total)}</Typography>
                      </Box>
                    </Box>
                  </TableCell> 


                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box>
                        <Typography variant="subtitle2"> {fDateTime(row.created_at)}</Typography>
                      </Box>
                    </Box>
                  </TableCell> 
   
                  <TableCell align="right">
                  <Button 
                  component={RouterLink} to={`${row.trx}`}
                  color="primary" size="small" variant="contained">
                   View
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableEmptyRows height={1} emptyRows={emptyRows(12, 4, 5)} />

          <TableNoData isNotFound={isNotFound} />
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
