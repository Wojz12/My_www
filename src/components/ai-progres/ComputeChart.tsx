'use client'

// Default data if no props provided
const defaultData = [
    { year: 2012, value: 10 },
    { year: 2014, value: 15 },
    { year: 2016, value: 22 },
    { year: 2017, value: 32 },
    { year: 2018, value: 45 },
    { year: 2019, value: 55 },
    { year: 2020, value: 65 },
    { year: 2021, value: 72 },
    { year: 2022, value: 78 },
    { year: 2023, value: 85 },
    { year: 2024, value: 92 },
    { year: 2025, value: 98 },
]

interface ComputeChartProps {
    data?: { year: number; value: number }[]
}

export default function ComputeChart({ data = defaultData }: ComputeChartProps) {
    const chartData = data.length > 0 ? data : defaultData
    const width = 300
    const height = 80
    const padding = 10

    const maxValue = Math.max(...chartData.map((d) => d.value))
    const minValue = Math.min(...chartData.map((d) => d.value))

    const getX = (index: number) => {
        return padding + (index / (chartData.length - 1)) * (width - 2 * padding)
    }

    const getY = (value: number) => {
        return (
            height -
            padding -
            ((value - minValue) / (maxValue - minValue)) * (height - 2 * padding)
        )
    }

    // Create SVG path for the line
    const pathData = chartData
        .map((point, index) => {
            const x = getX(index)
            const y = getY(point.value)
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
        })
        .join(' ')

    // Create gradient area path
    const areaPath = `${pathData} L ${getX(chartData.length - 1)} ${height - padding} L ${padding} ${height - padding} Z`

    // Get year range from data
    const startYear = chartData[0]?.year || 2012
    const endYear = chartData[chartData.length - 1]?.year || 2025

    return (
        <div className="w-full overflow-hidden">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-20"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Grid lines */}
                {[0.25, 0.5, 0.75].map((ratio) => (
                    <line
                        key={ratio}
                        x1={padding}
                        y1={padding + ratio * (height - 2 * padding)}
                        x2={width - padding}
                        y2={padding + ratio * (height - 2 * padding)}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                    />
                ))}

                {/* Area fill */}
                <path d={areaPath} fill="url(#chartGradient)" />

                {/* Line */}
                <path
                    d={pathData}
                    fill="none"
                    stroke="rgb(168, 85, 247)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Data points */}
                {chartData.map((point, index) => (
                    <circle
                        key={index}
                        cx={getX(index)}
                        cy={getY(point.value)}
                        r="3"
                        fill="rgb(168, 85, 247)"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                ))}
            </svg>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{startYear}</span>
                <span>{endYear}</span>
            </div>
        </div>
    )
}
