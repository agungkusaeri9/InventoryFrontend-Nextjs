"use client";
import React, { useState } from "react";
// import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import dynamic from "next/dynamic";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type TimePeriod = "daily" | "weekly" | "monthly";

interface StockData {
  stockIn: {
    daily: Record<string, number>;
    weekly: Record<string, number>;
    monthly: Record<string, number>;
  };
  stockOut: {
    daily: Record<string, number>;
    weekly: Record<string, number>;
    monthly: Record<string, number>;
  };
}

interface Props {
  data?: StockData;
}

export default function StatisticsChart({ data }: Props) {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("monthly");

  // Get all unique dates from both stockIn and stockOut
  const getAllDates = () => {
    const stockInDates = data?.stockIn[timePeriod] ? Object.keys(data.stockIn[timePeriod]) : [];
    const stockOutDates = data?.stockOut[timePeriod] ? Object.keys(data.stockOut[timePeriod]) : [];
    const allDates = [...new Set([...stockInDates, ...stockOutDates])];
    return allDates.sort();
  };

  // Get values for a specific date, defaulting to 0 if not present
  const getValueForDate = (date: string, type: 'stockIn' | 'stockOut') => {
    return data?.[type][timePeriod]?.[date] ?? 0;
  };

  const dates = getAllDates();

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: ["#6B7280"],
      },
      markers: {
        size: 12,
        strokeWidth: 0,
        offsetX: 0,
        offsetY: 0
      },
    },
    colors: ["#465FFF", "#FF4B4B"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "bar",
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
        dataLabels: {
          position: 'top',
        },
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    fill: {
      opacity: 1,
      type: 'solid',
    },
    grid: {
      borderColor: '#f1f1f1',
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      x: {
        format: timePeriod === "daily" ? "dd MMM yyyy" : timePeriod === "weekly" ? "'Week' W, yyyy" : "MMM yyyy",
      },
      y: {
        formatter: (value) => `${value} units`,
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
      },
    },
    xaxis: {
      type: "category",
      categories: dates,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      labels: {
        style: {
          colors: ["#6B7280"],
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
        formatter: (value) => `${value}`,
      },
      title: {
        text: "Units",
        style: {
          fontSize: "12px",
          color: "#6B7280",
        },
      },
      min: 0,
      forceNiceScale: true,
    },
  };

  const series = [
    {
      name: "Stock In",
      data: dates.map(date => getValueForDate(date, 'stockIn')),
    },
    {
      name: "Stock Out",
      data: dates.map(date => getValueForDate(date, 'stockOut')),
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Stock In and Out Statistics
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab selected={timePeriod} onSelect={setTimePeriod} />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={310}
          />
        </div>
      </div>
    </div>
  );
}
