// @mui
import { useState,useEffect } from 'react';
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
    axios.get('/user/withdraw/history').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return <SkeletonPost  sx={{ width: 40 }} />;
  const results = JSON.stringify(post.data.data.withdrawals);
  const rep = (Object.values(results));
  const personObject = JSON.parse(results);
  const isNotFound = (!personObject.length );
   
 return (
    <Card>

      <CardHeader title="Payout History" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer>
          <Table>
             <TableHead>
              <TableRow>
                <TableCell>Plan </TableCell>
                <TableCell>Amount </TableCell>
                <TableCell> Date </TableCell>
                <TableCell>Fees </TableCell>
                <TableCell>Trx </TableCell>
                 <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personObject.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {row.method.name}
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
                        <Typography variant="subtitle2"> {fDateTime(row.created_at)}</Typography>
                      </Box>
                    </Box>
                  </TableCell> 
 
                  <TableCell>
                    <Box>
                       <Box>
                        <Typography variant="subtitle2"> {general.cur_sym}{fCurrency(row.charge)}</Typography>
                      </Box>
                    </Box>
                  </TableCell> 

                   

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box>
                        <Typography variant="subtitle2"> {row.trx}</Typography>
                      </Box>
                    </Box>
                  </TableCell> 
                  
                  <TableCell align="right">
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.status === 'success' && 'success') || 'error'
                      }
                    >
                      {row.status}
                    </Label>
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
