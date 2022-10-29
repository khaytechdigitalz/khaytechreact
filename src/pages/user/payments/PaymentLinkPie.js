import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
 import React from "react";

import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../components/chart';
import axios from '../../../utils/axios';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

export default function AppLoginSession() {
  const theme = useTheme();
  const [post, setPost] = React.useState(null);
 
  const {general} = useAuth();
  React.useEffect(() => {
    axios.get('/user/plinkchart').then((response) => {
      setPost(response);     
    });
  }, []);
  if (!post) return null; 


  const chart = JSON.stringify(post.data.data.piechart);
  const ChartObject = JSON.parse(chart);
  const keys = Object.keys(ChartObject);
  const values = Object.values(ChartObject);
  
  console.log(values);
  const CHART_DATA = values;
  const chartOptions = merge(BaseOptionChart(), {
    /*
    colors: [
      theme.palette.primary.lighter,
      theme.palette.primary.light,
      theme.palette.primary.main,
      theme.palette.primary.dark,
    ],
    */
    
    labels: keys,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            {
              offset: 0,
              color: theme.palette.primary.light,
            },
            {
              offset: 100,
              color: theme.palette.primary.main,
            },
          ],
          [
            {
              offset: 0,
              color: theme.palette.warning.light,
            },
            {
              offset: 100,
              color: theme.palette.warning.main,
            },
          ],
        ],
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90%',
          labels: {
            value: {
              formatter: (val) => fNumber(val),
            },
            total: {
              formatter: (w) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return general.cur_sym+fNumber(sum);
              },
            },
          },
        },
      },
    },
  });

  return (
    <Card>
        
      <CardHeader title="Payment Status" />
      <ChartWrapperStyle dir="ltr"> 
        <ReactApexChart type="donut" series={CHART_DATA} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
