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
    axios.get('/user/airtimeconversion').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return <SkeletonPost  sx={{ width: 40 }} />;
  const results = JSON.stringify(post.data.data.manual);
  const rep = (Object.values(results));
  const personObject = JSON.parse(results);
  const isNotFound = (!personObject.length );
  
  const location = "assets/images/bills/";
  const png = ".jpg";
 return (
    <Card>

      <CardHeader title="Manual Airtime Conversion" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer>
          <Table>
             <TableHead>
              <TableRow>
                <TableCell>Network </TableCell>
                <TableCell>Amount </TableCell>
                <TableCell>Sender </TableCell>
                <TableCell>Beneficiary </TableCell>
                <TableCell>Type </TableCell>
                <TableCell>Trx </TableCell>
                <TableCell>Date </TableCell>
                 <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personObject.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar alt={row.network} src={HOST_URL+location+row.network+png} />
                     
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
                        <Typography variant="subtitle2"> {row.sender}</Typography>
                      </Box>
                    </Box>
                  </TableCell> 

                  <TableCell>
                    <Box>
                       <Box>
                        <Typography variant="subtitle2"> {row.beneficiary}</Typography>
                      </Box>
                    </Box>
                  </TableCell> 

                  <TableCell>
                    <Box>
                       <Box>
                       <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.type === 'manual' && 'info') || 'primary'
                      }
                    >
                      {row.type}
                    </Label>
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

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box>
                        <Typography variant="subtitle2"> {fDateTime(row.created_at)}</Typography>
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
