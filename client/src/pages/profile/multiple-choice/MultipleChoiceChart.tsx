import { CardContent } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Aproved',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Disaproved',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

interface Props {
  aproved: number;
  disaproved: number;
}

export function MultipleChoiceChart({ aproved, disaproved }: Props) {
  const chartData = [
    { browser: 'Aproved', visitors: aproved, fill: 'var(--color-chrome)' },
    {
      browser: 'Disaproved',
      visitors: disaproved,
      fill: 'var(--color-safari)',
    },
  ];

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <div className="flex aspect-square flex-col rounded-none border-0 bg-transparent">
      <CardContent className="flex-1 p-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
          <PieChart className="">
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Attempts
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
