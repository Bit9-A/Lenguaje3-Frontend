import React, { useEffect, useRef, useState } from 'react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import { helpHttp } from '../../helpers/helpHTTP';
import { baseUrl } from '../../config';

const api = helpHttp();

const MainChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    projects: [],
    proposals: [],
    payments: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const dashboardRes = await api.get(`${baseUrl}/dashboard`);

      if (!dashboardRes.err) {
        const { currentProjects, receivedProposals, billingAndPayments } = dashboardRes;

        setChartData({
          projects: currentProjects,
          proposals: receivedProposals,
          payments: billingAndPayments
        });
      } else {
        console.error('Error fetching data for chart');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          );
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color');
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          );
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color');
          chartRef.current.update();
        });
      }
    });
  }, [chartRef]);

  const getMonthlyData = (data, dateField) => {
    const monthlyData = new Array(12).fill(0);
    data.forEach(item => {
      const date = new Date(item[dateField]);
      const month = date.getMonth();
      monthlyData[month]++;
    });
    return monthlyData;
  };

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Projects',
              backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
              borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: getMonthlyData(chartData.projects, 'start_date'),
              fill: true,
            },
            {
              label: 'Proposals',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-success'),
              pointHoverBackgroundColor: getStyle('--cui-success'),
              borderWidth: 2,
              data: getMonthlyData(chartData.proposals, 'proposal_date'),
            },
            {
              label: 'Payments',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-danger'),
              pointHoverBackgroundColor: getStyle('--cui-danger'),
              borderWidth: 1,
              borderDash: [8, 5],
              data: getMonthlyData(chartData.payments, 'payment_date'),
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  );
};

export default MainChart;