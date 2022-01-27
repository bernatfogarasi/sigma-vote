import styled from "styled-components";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";
import theme from "styles/theme";

const Wrapper = styled.canvas``;

const Pie = ({ className, data, update, ...props }) => {
  const ref = useRef();

  useEffect(() => {
    const colors = [
      theme.colors.primary,
      theme.colors.secondary,
      theme.colors.success,
      theme.colors.warning,
      theme.colors.error,
    ];
    if (!Object.keys(data)?.length) return;
    Chart.register(...registerables);
    const canvas = new Chart(ref.current, {
      type: "pie",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: "Results",
            data: Object.values(data),
            backgroundColor: Array(
              Math.ceil(Object.keys(data).length / colors.length)
            )
              .fill(colors)
              .flat(),
            hoverOffset: 4,
          },
        ],
      },
    });
    return () => canvas.destroy();
  }, [update ? data : null]);

  return <Wrapper className={className} ref={ref} {...props}></Wrapper>;
};

export default Pie;
