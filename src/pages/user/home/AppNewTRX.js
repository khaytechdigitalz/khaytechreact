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
 
// ----------------------------------------------------------------------

export default function AppNewTRX() {
  const theme = useTheme();
  const [post, setPost] = useState(null);
  

  useEffect(() => {
    axios.post('/user/loginchart').then((response) => {
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
       {Array.isArray(results)
        ? rep.map((data, id) => (
    <div key={id}>
                <h2>Amount: {data?.id}</h2>
                <hr />
              </div>
    )) :null}
 

   
 


      <CardHeader title="Last 10 Transactions" sx={{ mb: 3 }} />
       <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TRX ID</TableCell>
                <TableCell >Details</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                 
              </TableRow>
            </TableHead>
            <TableBody>
              {personObject.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{`TRX-${row.trx}`}</TableCell>
                  <TableCell>{row.details}</TableCell>
                  <TableCell>{fCurrency(row.amount)}</TableCell>
                  <TableCell>
                  <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.trx_type === '-' && 'warning') ||
                        (row.trx_type === '!' && 'error') ||
                        'success'
                      }
                    >
                    {(() => {
                if (row.trx_type !== '+') {
                  return (
                    <div>Debit</div>
                  )
                }
                if (row.trx_type === '+') {
                  return (
                    <div>Credit</div>
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

 