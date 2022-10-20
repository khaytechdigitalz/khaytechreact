import { useState,useEffect } from 'react';
  // @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
   TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
   TableContainer,
} from '@mui/material';
import axios from '../../../utils/axios';
import { fDate } from '../../../utils/formatTime';

// utils
import { fCurrency } from '../../../utils/formatNumber';
// _mock_

import {
  SkeletonProductItem,
} from '../../../components/skeleton';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function AppNewTRX() {
  const theme = useTheme();
  const [post, setPost] = useState(null);
  const { user,general } = useAuth();


  useEffect(() => {
    axios.get('/user/referrals').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return <SkeletonProductItem  sx={{ width: 40 }} />;
  const results = JSON.stringify(post.data.data.transactions);
  const refers = JSON.stringify(post.data.data.ref);
  const personObject = JSON.parse(results);
  const ReferedObject = JSON.parse(refers);
  return (
    
    <Card>
      
      <CardHeader title="Referral Earnings" sx={{ mb: 3 }} />
       <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TRX</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Details</TableCell>
                <TableCell >Date</TableCell>
                  
              </TableRow>
            </TableHead>
            <TableBody>
              {personObject.map((row) => (
                <TableRow key={row.id}>
                <TableCell>{`TRX-${row.trx}`}</TableCell>
                  <TableCell>{row.details}</TableCell>
                  <TableCell>{general.cur_sym}{fCurrency(row.amount)}</TableCell>
                  <TableCell>{fDate(row.created_at)}</TableCell>
                   </TableRow>
              ))}
            </TableBody>
          </Table>

          
        </TableContainer>

        
      </Scrollbar>
 
    </Card>
    

    
  );
}

// ----------------------------------------------------------------------

 