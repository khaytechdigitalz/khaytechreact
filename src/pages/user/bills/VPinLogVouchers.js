// @mui
import { useState,useEffect } from 'react';
import {Link as RouterLink,useParams } from 'react-router-dom';
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
  const params = useParams();
  const trx = params.id;
  const url = "/user/vpinlog/";

  useEffect(() => {
    axios.get(url+trx).then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return <SkeletonPost  sx={{ width: 40 }} />;
  const results = JSON.stringify(post.data.data.log);
  const personObject = JSON.parse(results);
  const isNotFound = (!personObject.length );
 
  const batch = JSON.stringify(post.data.batch);
  const batchlog = JSON.parse(batch);
  console.log(batch);
 return (
    <Card>

      <CardHeader title="VPin Printing History" sx={{ mb: 3 }} />
      <Scrollbar>
      <TableContainer>
          <Table>
             <TableHead>
              <TableRow>
                <TableCell>Network</TableCell>
                <TableCell>Pin</TableCell>
                <TableCell>Serial Number</TableCell>
                <TableCell>Value </TableCell>
                 <TableCell>Code</TableCell>
                <TableCell> Date Generated </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personObject.map((row) => (
                <TableRow key={row.id}>
 
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box>
                        <Typography variant="subtitle2"> {row.mobilenetwork ? row.mobilenetwork : 'Universal'}</Typography>
                      </Box>
                    </Box>
                  </TableCell> 

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box>
                        <Typography variant="subtitle2"> {row.pin ? row.pin : 'N/A'}</Typography>
                      </Box>
                    </Box>
                  </TableCell> 
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box>
                        <Typography variant="subtitle2"> {row.sno ? row.sno : 'N/A'}</Typography>
                      </Box>
                    </Box>
                  </TableCell> 
                  
                
                  
                <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box>
                        <Typography variant="subtitle2"> {general.cur_sym}{row.amount ? fCurrency(row.amount) : fCurrency(batchlog.amount)}</Typography>
                      </Box>
                    </Box>
                  </TableCell> 
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box>
                        <Typography variant="subtitle2"> {row.code ? row.code : 'N/A'}</Typography>
                      </Box>
                    </Box>
                  </TableCell> 


                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box>
                        <Typography variant="subtitle2"> {fDateTime(batchlog.created_at)}</Typography>
                      </Box>
                    </Box>
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
