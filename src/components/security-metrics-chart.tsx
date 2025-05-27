import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { Card, CardBody, CardHeader, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";

interface SecurityMetricsProps {
  metrics: {
    timeData: Array<{
      time: string;
      qber: number;
      keyRate: number;
      entropy: number;
    }>;
    radarData: Array<{
      subject: string;
      value: number;
      fullMark: number;
    }>;
  };
}

export const SecurityMetricsChart: React.FC<SecurityMetricsProps> = ({ metrics }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex gap-3">
            <Icon icon="lucide:activity" className="text-primary-500 w-5 h-5" />
            <div className="flex flex-col">
              <p className="text-md font-medium">Quantum Bit Error Rate</p>
              <p className="text-small text-default-500">Real-time monitoring</p>
            </div>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={metrics.timeData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--heroui-default-200))" />
                <XAxis dataKey="time" stroke="hsl(var(--heroui-default-500))" />
                <YAxis stroke="hsl(var(--heroui-default-500))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--heroui-content1))",
                    borderColor: "hsl(var(--heroui-default-200))",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="qber"
                  name="QBER (%)"
                  stroke="hsl(var(--heroui-primary-500))"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader className="flex gap-3">
            <Icon icon="lucide:key" className="text-primary-500 w-5 h-5" />
            <div className="flex flex-col">
              <p className="text-md font-medium">Secure Key Rate</p>
              <p className="text-small text-default-500">Bits per second</p>
            </div>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                data={metrics.timeData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorKeyRate" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--heroui-success-500))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--heroui-success-500))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--heroui-default-200))" />
                <XAxis dataKey="time" stroke="hsl(var(--heroui-default-500))" />
                <YAxis stroke="hsl(var(--heroui-default-500))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--heroui-content1))",
                    borderColor: "hsl(var(--heroui-default-200))",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="keyRate"
                  name="Key Rate (kbps)"
                  stroke="hsl(var(--heroui-success-500))"
                  fillOpacity={1}
                  fill="url(#colorKeyRate)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex gap-3">
            <Icon icon="lucide:bar-chart" className="text-primary-500 w-5 h-5" />
            <div className="flex flex-col">
              <p className="text-md font-medium">Entropy Analysis</p>
              <p className="text-small text-default-500">Bits per byte</p>
            </div>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={metrics.timeData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--heroui-default-200))" />
                <XAxis dataKey="time" stroke="hsl(var(--heroui-default-500))" />
                <YAxis stroke="hsl(var(--heroui-default-500))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--heroui-content1))",
                    borderColor: "hsl(var(--heroui-default-200))",
                  }}
                />
                <Bar
                  dataKey="entropy"
                  name="Entropy"
                  fill="hsl(var(--heroui-secondary-500))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader className="flex gap-3">
            <Icon icon="lucide:shield" className="text-primary-500 w-5 h-5" />
            <div className="flex flex-col">
              <p className="text-md font-medium">Security Assessment</p>
              <p className="text-small text-default-500">Multi-factor analysis</p>
            </div>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart outerRadius={90} data={metrics.radarData}>
                <PolarGrid stroke="hsl(var(--heroui-default-300))" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "hsl(var(--heroui-default-500))" }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Security Score"
                  dataKey="value"
                  stroke="hsl(var(--heroui-primary-500))"
                  fill="hsl(var(--heroui-primary-500))"
                  fillOpacity={0.6}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--heroui-content1))",
                    borderColor: "hsl(var(--heroui-default-200))",
                  }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};