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
  SkeletonProductItem,
} from '../../../components/skeleton';
// ----------------------------------------------------------------------

export default function EcommerceBestSalesman() {
  const theme = useTheme();
  const [post, setPost] = useState(null);
  const {general } = useAuth();


  useEffect(() => {
    axios.get('/user/my-ecard').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return <SkeletonProductItem  sx={{ width: 40 }} />;
  const results = JSON.stringify(post.data.data.cards);
  console.log(results);
  const rep = (Object.values(results));
  const personObject = JSON.parse(results);
  const isNotFound = (!personObject.length );
  
 return (
    <Card>

      <CardHeader title="My E-Cards" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer>
          <Table>
             <TableHead>
              <TableRow>
                <TableCell>Card </TableCell>
                 <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personObject.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar alt={row.name} src='/images/mega-menu.png' />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle2"> {row.pan}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                         Balance: {general.cur_sym} {row.current_balance}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell> 
                  
                  <TableCell align="right">
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.status === 'active' && 'success') || 'error'
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
