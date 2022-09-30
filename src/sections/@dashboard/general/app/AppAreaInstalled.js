import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useState,useEffect } from 'react';

import { Card, CardHeader, Box, TextField } from '@mui/material';
// components
import { BaseOptionChart } from '../../../../components/chart';
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

export default function AppAreaInstalled() {
  const [seriesData, setSeriesData] = useState(2019);
  const [post, setPost] = useState(null);
  

  useEffect(() => {
    axios.post('/user/loginchart').then((response) => {
      setPost(response);     
    });
  }, []);
  if (!post) return null;
  const credit = JSON.stringify(post.data.data.credit);
  const debit = JSON.stringify(post.data.data.debit);
  const CreditObject = JSON.parse(credit);
  const DebitObject = JSON.parse(debit);


  const creditchart = Object.values(CreditObject);
  const debitchart = Object.values(DebitObject);

  const call = Object.entries(credit).forEach(([value]) => {
    console.log(value)
  });


const CHART_DATA = [
  {
    year: 2019,
    data: [
      { name: 'Credit', data: creditchart },
      { name: 'Debit', data: debitchart },
    ],
  },
   
];

  

  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'],
    },
  });

  return (
    <Card>
      <CardHeader
        title="Transaction Chart"
        subheader="This Year"
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': {
                pl: 1,
                py: 0.5,
                pr: '24px !important',
                typography: 'subtitle2',
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: 0.75,
                bgcolor: 'background.neutral',
              },
              '& .MuiNativeSelect-icon': {
                top: 4,
                right: 0,
                width: 20,
                height: 20,
              },
            }}
          >
            {CHART_DATA.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="bar" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
