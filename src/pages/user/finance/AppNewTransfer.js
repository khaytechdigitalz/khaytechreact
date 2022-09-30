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

// utils
import { fCurrency } from '../../../utils/formatNumber';
// _mock_
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function AppNewTRX() {
  const theme = useTheme();
  const [post, setPost] = useState(null);
  const {general} = useAuth();


  useEffect(() => {
    axios.post('/user/transferlog').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return null;
  const results = JSON.stringify(post.data.data.userTRX);
  const rep = (Object.values(results));
   const personObject = JSON.parse(results);
    
  return (
    
    <Card>
      

      <CardHeader title="Fund Transfer Log" sx={{ mb: 3 }} />
       <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TRX ID</TableCell>
                <TableCell >Beneficiary</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                 
              </TableRow>
            </TableHead>
            <TableBody>
              {personObject.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{`TRX-${row.trx}`}</TableCell>
                  <TableCell>{row.details}</TableCell>
                  <TableCell>{row.created_at.toString().split('T')[0]}</TableCell>
                  <TableCell>{general.cur_sym}{fCurrency(row.amount)}</TableCell>
                  <TableCell>
                  <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.status !== 1 && 'warning') ||
                        'success'
                      }
                    >
                    {(() => {
                if (row.status === 1) {
                  return (
                    <div>Successful</div>
                  )
                }
                if (row.status !== 1) {
                  return (
                    <div>Pending</div>
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

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

 