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
  TableSkeleton,
} from '../../../components/table';
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
  if (!post) return <TableSkeleton  sx={{ width: 40 }} />;
  const results = JSON.stringify(post.data.data.transactions);
  const refers = JSON.stringify(post.data.data.ref);
  const personObject = JSON.parse(results);
  const ReferedObject = JSON.parse(refers);
  return (
    
    <Card>
        <CardHeader title="Referrals" sx={{ mb: 3 }} />
       <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TRX</TableCell>
                <TableCell>Location</TableCell>
                <TableCell >Date</TableCell>
                <TableCell>Status</TableCell>
                 
              </TableRow>
            </TableHead>
            <TableBody>
              {ReferedObject.map((row) => (
                <TableRow key={row.id}>
                <TableCell>{row.username}</TableCell>
                  <TableCell>{row.address.country}</TableCell>
                  <TableCell>{fDate(row.created_at)}</TableCell>
                   <TableCell>
                  <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.kyc !== 1 && 'warning') ||
                        (row.status === 1 && 'error') ||
                        'success'
                      }
                    >
                    {(() => {
                if (row.status !== '1') {
                  return (
                    <div>Not Verified</div>
                  )
                }
                if (row.status === '1') {
                  return (
                    <div>Verified</div>
                  )
                }
                 
              })()}
                    </Label>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>

          
        </TableContainer>

        
      </Scrollbar>

      <Divider />

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

 