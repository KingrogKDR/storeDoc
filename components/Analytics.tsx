"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { calculatePercentage, convertFileSize } from "@/lib/utils";

const chartConfig = {
  size: {
    label: "Size",
  },
  used: {
    label: "Used",
    color: "white",
  },
} satisfies ChartConfig;

export const Analytics = ({ used = 0 }: { used: number }) => {
  const chartData = [{ storage: "used", used: 10, fill: "white" }];

  return (
    <Card className="flex max-xl:flex-col items-center gap-4 rounded-[20px] p-5 xl:flex-row shadow-md">
      <CardContent className="flex-1 p-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square w-[180px] xl:w-[250px]">
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={Number(calculatePercentage(used)) + 90}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-black/70 last:fill-gray-50 shadow-lg shadow-gray-400"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="storage" background cornerRadius={10} fill="black"/>
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-black text-xl lg:text-2xl leading-[14px] font-bold"
                        >
                          {used && calculatePercentage(used)
                            ? calculatePercentage(used)
                                .toString()
                                .replace(/^0(\d)/, "0.$1")
                            : "0"}
                          %
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 36}
                          className="fill-black/70 text-[16px] lg:text-xs"
                        >
                          Space used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardHeader className="flex-1 items-start px-3 py-0 sm:px-5 lg:p-3 xl:pr-5">
        <CardTitle className="h3 font-bold md:text-center lg:text-left lg:text-xl">Available Storage</CardTitle>
        <CardDescription className="text-[14px] leading-[20px] font-semibold mt-2 w-full text-gray-500 md:text-center lg:text-left">
          {used ? convertFileSize(used) : "2GB"} / 2GB
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
