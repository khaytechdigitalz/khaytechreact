import { useState,useEffect } from 'react';
import {Link as RouterLink,useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

  // @mui
import { useTheme,styled, alpha } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  Stack,
  TableHead,
  CardHeader,
  TableContainer,
  OutlinedInput,
} from '@mui/material';
import axios from '../../../utils/axios';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// utils
import { fCurrency } from '../../../utils/formatNumber';
// _mock_
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import useAuth from '../../../hooks/useAuth';

import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
} from '../../../components/table';

import {
  SkeletonProductItem,
} from '../../../components/skeleton';
import useTable, { emptyRows } from '../../../hooks/useTable';
import { PATH_PAGE } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function AppNewTRX() {
  const theme = useTheme();
  const [post, setPost] = useState(null);
  const { user,general } = useAuth();
  const params = useParams();
  const trx = params.id;
  const { enqueueSnackbar } = useSnackbar();
  const link = `/user/plinkrequests/`;

  const ContentStyle = styled(Card)(({ theme }) => ({
    marginTop: 2,
    boxShadow: 'none',
    padding: theme.spacing(5),
    paddingTop: theme.spacing(5),
    color: theme.palette.common.white,
    backgroundImage: `linear-gradient(135deg,
      ${theme.palette.primary.main} 0%,
      ${theme.palette.primary.dark} 100%)`,
  }));
  
  useEffect(() => {
    axios.get(link+trx).then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return <SkeletonProductItem  sx={{ width: 40 }} />;
  const results = JSON.stringify(post.data.data.requests);
  const rep = (Object.values(results));
  const personObject = JSON.parse(results);
  const isNotFound = (!personObject.length );
  const url = window.location.origin+PATH_PAGE.paymentlink+trx;;

  const copylink = async () => {

    const copyText = document.getElementById("PaymentURL");
    copyText.select();
    copyText.setSelectionRange(0, 99999);  
    document.execCommand("copy");
    enqueueSnackbar('Payment Link Copied');
  
  
      };


  return (
    
    <Card>
       
      <CardHeader title="My Payment Link Payments" sx={{ mb: 3 }} />
      
       <Scrollbar>
      
      <ContentStyle>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
       
       <OutlinedInput
         id="PaymentURL"
        value={url}
         size="small"
         placeholder="Email"
         sx={{
           width: 1,
           color: 'white',
           fontWeight: 'fontWeightMedium',
           bgcolor: (theme) => alpha(theme.palette.common.black, 0.16),
           '& input::placeholder': {
             color: (theme) => alpha(theme.palette.common.white, 0.48),
           },
           '& fieldset': { display: 'none' },
         }}
       /> 

       <Button onClick={copylink} color="primary" variant="contained">
       Copy
       </Button>
        
     </Stack>
     </ContentStyle>
     <br/>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TRX ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Charge</TableCell>
                <TableCell>Payable</TableCell>
                <TableCell>Status</TableCell>                 
              </TableRow>
            </TableHead>
            <TableBody>
              {personObject.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{`TRX-${row.trx}`}</TableCell>
                  <TableCell>{row.recipient}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{general.cur_sym}{fCurrency(row.amount)}</TableCell>
                  <TableCell>{general.cur_sym}{fCurrency(row.charge)}</TableCell>
                  <TableCell>{general.cur_sym}{fCurrency(row.receive)}</TableCell>
                  <TableCell>
                  <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.status === 'inactive' && 'warning') ||
                        'success'
                      }
                    >
                    {row.status}
                    </Label>
                  </TableCell> 
                  
                </TableRow>
              ))}

          <TableEmptyRows height={1} emptyRows={emptyRows(12, 4, 5)} />

         <TableNoData isNotFound={isNotFound} />
            </TableBody>


          </Table>

          
        </TableContainer>
      </Scrollbar>
 
    </Card>
  );
}

// ----------------------------------------------------------------------

 