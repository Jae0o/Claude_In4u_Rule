// Dashboard JavaScript for BXG Dashboard
class DashboardController {
  constructor(dashboardId, chartConfig, skipAutoInit = false) {
    this.dashboardId = dashboardId;
    this.chartConfig = chartConfig;
    this.currentFilters = {};
    this.rawData = null;
    if (!skipAutoInit) {
      this.init();
    }
  }

  async init() {
    try {
      await this.loadInitialData();
      this.setupFilterEventListeners();
      this.renderChart();
    } catch (error) {
      console.error("Dashboard initialization failed:", error);
      this.showError("대시보드 초기화에 실패했습니다.");
    }
  }

  async loadInitialData() {
    try {
      this.showLoading(true);

      // Mock 데이터 생성
      const mockData = this.generateMockData();
      this.rawData = mockData;
      this.updateStats(mockData.length, mockData.length);
    } catch (error) {
      console.error("데이터 로딩 오류:", error);
      this.showError("데이터를 불러올 수 없습니다.");
    } finally {
      this.showLoading(false);
    }
  }

  generateMockData() {
    // 기본 Mock 데이터 생성 (단일 차트용)
    const months = ['2023.01', '2023.02', '2023.03', '2023.04', '2023.05', '2023.06', '2023.07', '2023.08', '2023.09'];
    const channels = ['온라인', '오프라인'];
    const products = ['전자', '의류', '식품', '스포츠', '생활용품', '자동차용품', '건강기능식품', '화장품', '도서', '기타'];

    const mockData = [];

    months.forEach(month => {
      channels.forEach(channel => {
        products.forEach(product => {
          mockData.push({
            달력_연도_월: month,
            유통경로: channel,
            제품군: product,
            총매출액: Math.floor(Math.random() * 5000) + 1000, // 1000-6000 사이 랜덤값
            count: Math.floor(Math.random() * 100) + 10 // 10-110 사이 랜덤값
          });
        });
      });
    });

    return mockData;
  }

  setupFilterEventListeners() {
    // 모든 필터 요소에 이벤트 리스너 추가
    document.querySelectorAll("[data-column]").forEach((element) => {
      element.addEventListener("change", () => {
        this.applyFilters();
      });
    });
  }

  async applyFilters() {
    const filters = this.collectFilterValues();

    try {
      this.showLoading(true);

      // Mock 데이터에 필터 적용
      const allData = this.generateMockData();
      let filteredData = allData;

      // 필터 적용 로직 (예시)
      Object.keys(filters).forEach(column => {
        const filterValue = filters[column];
        // 더 엄격한 필터 값 검증
        if (filterValue !== null && filterValue !== undefined && filterValue !== '') {
          if (Array.isArray(filterValue)) {
            // 배열인 경우 길이가 0보다 커야 함
            if (filterValue.length > 0) {
              filteredData = filteredData.filter(row => filterValue.includes(row[column]));
            }
          } else {
            filteredData = filteredData.filter(row => row[column] === filterValue);
          }
        }
      });

      this.rawData = filteredData;
      this.updateStats(filteredData.length, allData.length);
      this.renderChart();
    } catch (error) {
      console.error("필터링 오류:", error);
      this.showError("필터링 중 오류가 발생했습니다.");
    } finally {
      this.showLoading(false);
    }
  }

  collectFilterValues() {
    const filters = {};

    document.querySelectorAll("[data-column]").forEach((element) => {
      const column = element.getAttribute("data-column");
      const type = element.getAttribute("data-type");

      if (type === "date_start" || type === "date_end") {
        if (!filters[column]) filters[column] = {};
        filters[column][type.replace("date_", "")] = element.value;
      } else if (type === "multi_select") {
        const selected = Array.from(element.selectedOptions).map((opt) => opt.value);
        if (selected.length > 0) {
          filters[column] = selected;
        }
      } else if (element.value && element.value !== '') {
        filters[column] = element.value;
      }
    });

    return filters;
  }

  renderChart() {
    // Plotly 라이브러리 확인
    if (typeof Plotly === "undefined") {
      console.error("Plotly is not loaded");
      this.showError("차트 라이브러리를 불러올 수 없습니다.");
      return;
    }

    // 차트 설정 유효성 검사
    const validatedConfig = this.validateChartConfig();
    if (!validatedConfig) {
      this.showError("차트 설정이 올바르지 않습니다.");
      return;
    }

    if (!this.rawData || this.rawData.length === 0) {
      // 데이터가 없을 때 빈 차트 표시
      const emptyTrace = {
        x: [],
        y: [],
        type: validatedConfig.chart_type || "bar",
        name: "데이터 없음",
      };

      const layout = {
        title: validatedConfig.title || "대시보드 차트",
        xaxis: { title: this.getAxisTitle(validatedConfig.x_axis) },
        yaxis: { title: this.getAxisTitle(validatedConfig.y_axis) },
      };

      Plotly.newPlot("chart", [emptyTrace], layout);
      return;
    }

    // 다중 시리즈 vs 단일 시리즈 분기 처리
    let traces, layout;

    // 디버깅 정보 출력
    console.log("Chart config:", validatedConfig);
    console.log("Is multi-series:", validatedConfig.is_multi_series);

    if (validatedConfig.is_multi_series && validatedConfig.group_by_column) {
      // 다중 시리즈 차트
      traces = this.processMultiSeriesData(validatedConfig);
      console.log("Multi-series traces:", traces);

      layout = {
        title: validatedConfig.title || "대시보드 차트",
        xaxis: {
          title: this.getAxisTitle(validatedConfig.x_axis),
          type: this.getXAxisType(null, validatedConfig.x_axis),
        },
        yaxis: {
          title: this.getAxisTitle(validatedConfig.y_axis),
        },
        barmode: "group", // 그룹화된 막대
        legend: {
          orientation: "v",
          x: 1.02,
          y: 1,
          bgcolor: "rgba(255,255,255,0.8)",
          bordercolor: "rgba(0,0,0,0.2)",
          borderwidth: 1,
        },
        margin: { t: 50, r: 120, b: 50, l: 80 }, // 범례 공간 확보
      };
    } else {
      // 기존 단일 시리즈 로직
      const processedData = this.processChartData(validatedConfig);
      console.log("Single-series data:", processedData);

      traces = [
        {
          x: processedData.xData,
          y: processedData.yData,
          type:
            validatedConfig.chart_type === "grouped_bar"
              ? "bar"
              : validatedConfig.chart_type || "bar",
          name: this.getAxisTitle(validatedConfig.y_axis),
          marker: {
            color: "#3498db",
          },
          hovertemplate: "%{y:,}", // 천단위 콤마 전체 숫자 표시
        },
      ];

      layout = {
        title: validatedConfig.title || "대시보드 차트",
        xaxis: {
          title: this.getAxisTitle(validatedConfig.x_axis),
          type: this.getXAxisType(processedData.xData, validatedConfig.x_axis),
        },
        yaxis: {
          title: this.getAxisTitle(validatedConfig.y_axis),
          tickformat: this.isLargeNumber(processedData.yData) ? ",.2s" : ".2f",
        },
        margin: { t: 50, r: 50, b: 50, l: 80 },
      };
    }

    Plotly.newPlot("chart", traces, layout);
  }

  validateChartConfig() {
    if (!this.chartConfig) {
      console.error("Chart configuration is null or undefined");
      return null;
    }

    const config = { ...this.chartConfig };

    // x_axis와 y_axis가 같고 count가 아닌 경우 수정
    if (config.x_axis === config.y_axis && config.y_axis !== "count") {
      console.warn("x_axis and y_axis are the same, adjusting to count chart");
      config.y_axis = "count";
      config.aggregation = "count";
      config.title = config.title || `${config.x_axis}별 건수 분석`;
    }

    // 필수 속성 확인
    if (!config.x_axis || !config.y_axis) {
      console.error("Chart configuration missing x_axis or y_axis");
      return null;
    }

    return config;
  }

  processChartData(config) {
    const xAxis = config.x_axis;
    const yAxis = config.y_axis;

    let xData, yData;

    if (yAxis === "count") {
      // 카운트 차트의 경우 집계 수행
      const countMap = {};
      this.rawData.forEach((row) => {
        const key = row[xAxis];
        countMap[key] = (countMap[key] || 0) + 1;
      });

      // x축 정렬 (숫자인 경우 숫자 정렬, 문자인 경우 문자 정렬)
      const sortedEntries = Object.entries(countMap).sort((a, b) => {
        const aVal = isNaN(a[0]) ? a[0] : parseFloat(a[0]);
        const bVal = isNaN(b[0]) ? b[0] : parseFloat(b[0]);
        if (typeof aVal === "number" && typeof bVal === "number") {
          return aVal - bVal;
        }
        return aVal > bVal ? 1 : -1;
      });

      xData = sortedEntries.map(([key]) => key);
      yData = sortedEntries.map(([, value]) => value);
    } else {
      // 일반적인 경우 - 연도 데이터 특별 처리 추가
      xData = this.rawData.map((row) => row[xAxis]);
      yData = this.rawData.map((row) => parseFloat(row[yAxis]) || 0);

      // 년월 데이터인 경우 문자열 그대로 정렬
      if (this.isYearMonthColumn(xAxis)) {
        const dataPoints = this.rawData
          .map((row) => ({
            x: row[xAxis].toString(), // 문자열 그대로 유지
            y: parseFloat(row[yAxis]) || 0,
          }))
          .sort((a, b) => a.x.localeCompare(b.x)); // 문자열 정렬

        xData = dataPoints.map((point) => point.x);
        yData = dataPoints.map((point) => point.y);
      }
      // 연도 데이터인 경우 정수로 변환하여 정렬
      else if (this.isYearColumn(xAxis)) {
        const dataPoints = this.rawData
          .map((row) => ({
            x: parseInt(row[xAxis]), // 정수로 변환
            y: parseFloat(row[yAxis]) || 0,
          }))
          .sort((a, b) => a.x - b.x); // x축 기준 정렬

        xData = dataPoints.map((point) => point.x.toString()); // 문자열로 변환하여 카테고리 축으로 처리
        yData = dataPoints.map((point) => point.y);
      }
    }

    return { xData, yData };
  }

  processMultiSeriesData(config) {
    const xAxis = config.x_axis;
    const yAxis = config.y_axis;
    const groupBy = config.group_by_column;

    console.log("Processing multi-series data:", {
      xAxis,
      yAxis,
      groupBy,
      dataLength: this.rawData ? this.rawData.length : 0,
      rawData: this.rawData?.slice(0, 3), // 처음 3개 행만 로그에 출력
    });

    // 그룹별로 데이터 분리 및 집계
    const groupedData = {};

    this.rawData.forEach((row) => {
      const groupValue = row[groupBy];
      const xValue = row[xAxis];
      const yValue = parseFloat(row[yAxis]) || 0;

      if (!groupedData[groupValue]) {
        groupedData[groupValue] = {};
      }

      // X값별로 Y값 집계 (동일한 X값이 여러 개 있을 경우 합산)
      if (!groupedData[groupValue][xValue]) {
        groupedData[groupValue][xValue] = 0;
      }
      groupedData[groupValue][xValue] += yValue;
    });

    // 상위 N개 + 기타 그룹 처리
    const maxSeries = config.max_series_count || 8;
    const groupNames = Object.keys(groupedData);

    let finalGroupData = groupedData;
    let finalGroupNames = groupNames;

    if (groupNames.length > maxSeries && config.show_others_group) {
      // 각 그룹의 총합을 계산하여 상위 그룹 선정
      const groupTotals = groupNames
        .map((groupName) => {
          const total = Object.values(groupedData[groupName]).reduce((sum, val) => sum + val, 0);
          return { groupName, total };
        })
        .sort((a, b) => b.total - a.total);

      const topGroups = groupTotals.slice(0, maxSeries - 1);
      const otherGroups = groupTotals.slice(maxSeries - 1);

      finalGroupData = {};
      finalGroupNames = [];

      // 상위 그룹들
      topGroups.forEach(({ groupName }) => {
        finalGroupData[groupName] = groupedData[groupName];
        finalGroupNames.push(groupName);
      });

      // "기타" 그룹 생성
      if (otherGroups.length > 0) {
        finalGroupData["기타"] = {};
        otherGroups.forEach(({ groupName }) => {
          Object.entries(groupedData[groupName]).forEach(([xValue, yValue]) => {
            if (!finalGroupData["기타"][xValue]) {
              finalGroupData["기타"][xValue] = 0;
            }
            finalGroupData["기타"][xValue] += yValue;
          });
        });
        finalGroupNames.push("기타");
      }
    }

    // 모든 X값 수집 (정렬을 위해)
    const allXValues = new Set();
    Object.values(finalGroupData).forEach((groupData) => {
      Object.keys(groupData).forEach((xValue) => allXValues.add(xValue));
    });

    // X값 정렬 (년월/연도에 따라 다른 정렬 방식 적용)
    const sortedXValues = Array.from(allXValues).sort((a, b) => {
      if (this.isYearMonthColumn(xAxis)) {
        return a.toString().localeCompare(b.toString()); // 년월은 문자열 정렬
      } else if (this.isYearColumn(xAxis)) {
        return parseInt(a) - parseInt(b); // 연도는 숫자 정렬
      }
      return a.toString().localeCompare(b.toString());
    });

    // Plotly traces 생성
    const traces = [];
    const colorPalette = this.getColorPalette(finalGroupNames.length);

    finalGroupNames.forEach((groupName, index) => {
      const xData = [];
      const yData = [];

      sortedXValues.forEach((xValue) => {
        xData.push(xValue);
        yData.push(finalGroupData[groupName][xValue] || 0);
      });

      traces.push({
        x: xData,
        y: yData,
        type: "bar",
        name: groupName,
        marker: {
          color: colorPalette[index],
          line: { width: 1, color: "white" },
        },
        hovertemplate: "%{y:,}", // 천단위 콤마 전체 숫자 표시
      });
    });

    return traces;
  }

  getColorPalette(count) {
    // Plotly 기본 색상 팔레트 + 추가 색상
    const colors = [
      "#1f77b4",
      "#ff7f0e",
      "#2ca02c",
      "#d62728",
      "#9467bd",
      "#8c564b",
      "#e377c2",
      "#7f7f7f",
      "#bcbd22",
      "#17becf",
      "#aec7e8",
      "#ffbb78",
      "#98df8a",
      "#ff9896",
      "#c5b0d5",
    ];
    return colors.slice(0, Math.max(count, colors.length));
  }

  // 년월 컬럼 판별 헬퍼 함수 추가 (예: 2023.01, 2023.02)
  isYearMonthColumn(columnName) {
    if (!columnName) return false;
    const lowerName = columnName.toLowerCase();
    return (
      lowerName.includes("달력_연도_월") ||
      lowerName.includes("연도_월") ||
      lowerName.includes("year_month")
    );
  }

  // 연도 컬럼 판별 헬퍼 함수 추가
  isYearColumn(columnName) {
    if (!columnName) return false;
    const lowerName = columnName.toLowerCase();
    // "달력_연도_월"은 년월 데이터이므로 연도 컬럼으로 처리하지 않음
    if (lowerName.includes("달력_연도_월") || lowerName.includes("연도_월")) {
      return false;
    }
    return (
      lowerName.includes("year") ||
      lowerName === "year_id" ||
      lowerName === "yearid" ||
      lowerName.includes("month") ||
      lowerName === "month_id" ||
      lowerName === "monthid" ||
      lowerName.includes("년도") ||
      lowerName.includes("연도")
    );
  }

  // X축 타입 결정 로직 개선
  getXAxisType(data, columnName) {
    // 년월 또는 연도 컬럼은 항상 카테고리로 처리
    if (this.isYearMonthColumn(columnName) || this.isYearColumn(columnName)) {
      return "category";
    }

    // 나머지는 기존 로직 사용
    return this.isNumericAxis(data) ? "linear" : "category";
  }

  getAxisTitle(columnName) {
    // 컬럼명을 사용자 친화적으로 변환
    if (!columnName) return "";

    const titleMap = {
      YEAR_ID: "연도",
      total_sales: "총매출",
      SALES: "매출액",
      ORDERNUMBER: "주문번호",
      ORDERDATE: "주문일자",
      count: "건수",
    };

    return titleMap[columnName] || columnName.replace(/_/g, " ");
  }

  isNumericAxis(data) {
    if (!data || data.length === 0) return false;
    return data.every((val) => !isNaN(parseFloat(val)));
  }

  isLargeNumber(data) {
    const maxVal = Math.max(...data);
    return maxVal > 1000;
  }

  updateStats(filteredCount, totalCount) {
    document.getElementById("filtered-count").textContent = filteredCount.toLocaleString();
    document.getElementById("total-count").textContent = totalCount.toLocaleString();
  }

  showLoading(show) {
    document.getElementById("loading").style.display = show ? "block" : "none";
  }

  showError(message) {
    document.getElementById("chart").innerHTML = `
            <div class="alert alert-danger" role="alert">
                <i class="bi bi-exclamation-triangle"></i> ${message}
            </div>
        `;
  }
}

// Multi-chart Dashboard Controller Extension
class MultiChartDashboardController extends DashboardController {
  constructor(dashboardId, chartConfigs, isMultiChart = false) {
    // 부모 생성자에서 자동 초기화 건너뛰기
    super(dashboardId, {}, true);
    this.isMultiChart = isMultiChart;
    this.chartConfigs = Array.isArray(chartConfigs) ? chartConfigs : [chartConfigs];
    this.chartData = {};
    this.chartCount = this.chartConfigs.length;

    // 다중 차트용 수동 초기화
    this.init();
  }

  async init() {
    try {
      await this.loadInitialData();
      this.setupFilterEventListeners();
      // 다중 차트는 renderChart() 대신 renderAllCharts() 사용
      // (loadInitialData에서 자동으로 호출됨)
    } catch (error) {
      console.error("Multi-chart dashboard initialization failed:", error);
      this.showError("다중 차트 대시보드 초기화에 실패했습니다.");
    }
  }

  async loadInitialData() {
    try {
      this.showLoading(true);

      // Multi-chart를 위한 Mock 데이터 생성
      const mockData = this.generateMultiChartMockData();

      if (this.isMultiChart) {
        // 다중 차트 데이터 처리
        mockData.datasets.forEach((dataset) => {
          this.chartData[dataset.chart_index] = dataset.data;
        });
        this.updateStats(mockData.filtered_count, mockData.total_count);
        this.renderAllCharts();
      } else {
        // 단일 차트 처리 (기존 로직)
        this.rawData = mockData.data;
        this.updateStats(mockData.filtered_count, mockData.total_count);
        this.renderChart();
      }
    } catch (error) {
      console.error("데이터 로딩 오류:", error);
      this.showError("데이터를 불러올 수 없습니다.");
    } finally {
      this.showLoading(false);
    }
  }

  generateMultiChartMockData() {
    const months = ['2023.01', '2023.02', '2023.03', '2023.04', '2023.05', '2023.06', '2023.07', '2023.08', '2023.09'];
    const channels = ['온라인', '오프라인'];
    const products = ['전자', '의류', '식품', '스포츠', '생활용품', '자동차용품', '건강기능식품', '화장품', '도서', '기타'];

    // 차트 1 데이터: 달력_연도_월별 총매출액 (단일 시리즈)
    const chart1Data = months.map(month => ({
      달력_연도_월: month,
      총매출액: Math.floor(Math.random() * 3000) + 4000 // 4000-7000 사이
    }));

    // 차트 2 데이터: 달력_연도_월별 유통경로별 총매출액 (다중 시리즈)
    const chart2Data = [];
    months.forEach(month => {
      channels.forEach(channel => {
        chart2Data.push({
          달력_연도_월: month,
          유통경로: channel,
          총매출액: Math.floor(Math.random() * 4000) + 2000 // 2000-6000 사이
        });
      });
    });

    // 차트 3 데이터: 달력_연도_월별 제품군별 총매출액 (다중 시리즈)
    const chart3Data = [];
    months.forEach(month => {
      products.forEach(product => {
        chart3Data.push({
          달력_연도_월: month,
          제품군: product,
          총매출액: Math.floor(Math.random() * 2500) + 500 // 500-3000 사이
        });
      });
    });

    const totalCount = chart1Data.length + chart2Data.length + chart3Data.length;

    return {
      is_multi_chart: true,
      filtered_count: totalCount,
      total_count: totalCount,
      datasets: [
        { chart_index: 0, data: chart1Data },
        { chart_index: 1, data: chart2Data },
        { chart_index: 2, data: chart3Data }
      ]
    };
  }

  renderAllCharts() {
    this.chartConfigs.forEach((config, index) => {
      // 차트 헤더 업데이트
      const chartHeader = document.querySelector(`.dashboard__chart__item[data-chart-index="${index}"] .dashboard__chart__header h6`);
      if (chartHeader) {
        chartHeader.textContent = config.title || `Chart ${index + 1}`;
      }

      this.renderSingleChart(index, config, this.chartData[index] || []);
    });
  }

  renderSingleChart(chartIndex, config, data) {
    console.log(`Rendering chart ${chartIndex}:`, config);

    const containerId = `chart-${chartIndex}`;
    const container = document.getElementById(containerId);

    if (!container) {
      console.error(`Chart container ${containerId} not found`);
      return;
    }

    // 차트 설정 검증 (개별 차트용)
    const validatedConfig = this.validateSingleChartConfig(config);
    if (!validatedConfig) {
      console.error(`Chart ${chartIndex} validation failed:`, config);
      container.innerHTML = `<div class="alert alert-warning">차트 설정이 올바르지 않습니다.</div>`;
      return;
    }

    // 다중 시리즈 vs 단일 시리즈 분기 처리
    let traces, layout;

    if (validatedConfig.is_multi_series && validatedConfig.group_by_column) {
      // 다중 시리즈 차트 처리
      console.log(`Processing multi-series chart ${chartIndex}:`, {
        groupBy: validatedConfig.group_by_column,
        dataLength: data.length,
        sampleData: data.slice(0, 3),
      });

      // processMultiSeriesDataForChart는 { traces, layout } 객체를 반환
      const multiSeriesResult = this.processMultiSeriesDataForChart(
        {
          ...validatedConfig,
          group_by: validatedConfig.group_by_column, // group_by 필드명 매핑
        },
        data
      );

      traces = multiSeriesResult.traces;
      layout = multiSeriesResult.layout;

      // 레이아웃에 다중 시리즈 특화 설정 추가
      layout.barmode = "group";
      layout.legend = {
        orientation: "v",
        x: 1.02,
        y: 1,
        font: { size: 10 },
      };
      layout.margin = { t: 40, r: 100, b: 40, l: 80 };
    } else {
      // 단일 시리즈 차트 처리
      const processedData = this.processChartDataForChart(validatedConfig, data);

      traces = [
        {
          x: processedData.xData,
          y: processedData.yData,
          type: config.chart_type || "bar",
          name: config.title || `차트 ${chartIndex + 1}`,
          marker: { color: this.getChartColor(chartIndex) },
          hovertemplate: "%{y:,}", // 천단위 콤마 전체 숫자 표시
        },
      ];

      layout = {
        title: { text: config.title, font: { size: 14 } },
        xaxis: {
          title: this.getAxisTitle(config.x_axis),
          type: this.getXAxisType(processedData.xData, config.x_axis),
        },
        yaxis: {
          title: this.getAxisTitle(config.y_axis),
          tickformat: this.isLargeNumber(processedData.yData) ? ",.0s" : ".2f",
        },
        margin: { t: 40, r: 20, b: 40, l: 80 },
      };
    }

    Plotly.newPlot(containerId, traces, layout);
  }

  validateSingleChartConfig(config) {
    if (!config) {
      console.error("Chart configuration is null or undefined");
      return null;
    }

    const validatedConfig = { ...config };

    // x_axis와 y_axis가 같고 count가 아닌 경우 수정
    if (validatedConfig.x_axis === validatedConfig.y_axis && validatedConfig.y_axis !== "count") {
      console.warn("x_axis and y_axis are the same, adjusting to count chart");
      validatedConfig.y_axis = "count";
      validatedConfig.aggregation = "count";
      validatedConfig.title = validatedConfig.title || `${validatedConfig.x_axis}별 건수 분석`;
    }

    // 필수 속성 확인
    if (!validatedConfig.x_axis || !validatedConfig.y_axis) {
      console.error("Chart configuration missing x_axis or y_axis:", validatedConfig);
      return null;
    }

    return validatedConfig;
  }

  processChartDataForChart(config, data) {
    // 기존 processChartData 로직을 개별 차트용으로 수정
    if (!data || data.length === 0) {
      return { xData: [], yData: [] };
    }

    const xAxis = config.x_axis;
    const yAxis = config.y_axis;

    let xData, yData;

    if (yAxis === "count") {
      // 카운트 차트의 경우 집계 수행
      const countMap = {};
      data.forEach((row) => {
        const key = row[xAxis];
        countMap[key] = (countMap[key] || 0) + 1;
      });

      const sortedEntries = Object.entries(countMap).sort((a, b) => {
        const aVal = isNaN(a[0]) ? a[0] : parseFloat(a[0]);
        const bVal = isNaN(b[0]) ? b[0] : parseFloat(b[0]);
        if (typeof aVal === "number" && typeof bVal === "number") {
          return aVal - bVal;
        }
        return aVal > bVal ? 1 : -1;
      });

      xData = sortedEntries.map(([key]) => key);
      yData = sortedEntries.map(([, value]) => value);
    } else {
      // 일반적인 경우
      xData = data.map((row) => row[xAxis]);
      yData = data.map((row) => parseFloat(row[yAxis]) || 0);

      // 년월 데이터인 경우 문자열 그대로 정렬
      if (this.isYearMonthColumn(xAxis)) {
        const dataPoints = data
          .map((row) => ({
            x: row[xAxis].toString(), // 문자열 그대로 유지
            y: parseFloat(row[yAxis]) || 0,
          }))
          .sort((a, b) => a.x.localeCompare(b.x)); // 문자열 정렬

        xData = dataPoints.map((point) => point.x);
        yData = dataPoints.map((point) => point.y);
      }
      // 연도 데이터인 경우 정수로 변환하여 정렬
      else if (this.isYearColumn(xAxis)) {
        const dataPoints = data
          .map((row) => ({
            x: parseInt(row[xAxis]),
            y: parseFloat(row[yAxis]) || 0,
          }))
          .sort((a, b) => a.x - b.x);

        xData = dataPoints.map((point) => point.x.toString());
        yData = dataPoints.map((point) => point.y);
      }
    }

    return { xData, yData };
  }

  processMultiSeriesDataForChart(config, data) {
    // 다중 시리즈 차트용 데이터 처리
    if (!data || data.length === 0) {
      return { traces: [], layout: {} };
    }

    const xAxis = config.x_axis;
    const yAxis = config.y_axis;
    const groupBy = config.group_by;

    console.log(
      `Processing multi-series chart: xAxis=${xAxis}, yAxis=${yAxis}, groupBy=${groupBy}`
    );

    if (!groupBy) {
      console.warn("Multi-series chart requires group_by field");
      // groupBy가 없으면 단일 시리즈로 처리
      return this.processChartDataForChart(config, data);
    }

    // 그룹별 데이터 분류
    const groupedData = {};
    data.forEach((row) => {
      const groupValue = row[groupBy];
      if (!groupedData[groupValue]) {
        groupedData[groupValue] = [];
      }
      groupedData[groupValue].push(row);
    });

    // 각 그룹에 대한 trace 생성
    const traces = [];
    const groups = Object.keys(groupedData).sort();

    groups.forEach((group, index) => {
      const groupData = groupedData[group];
      const processedData = this.processChartDataForChart(config, groupData);

      traces.push({
        x: processedData.xData,
        y: processedData.yData,
        type: config.chart_type === "grouped_bar" ? "bar" : config.chart_type || "bar",
        name: group,
        marker: { color: this.getChartColor(index) },
        hovertemplate: "%{y:,}", // 천단위 콤마 전체 숫자 표시
      });
    });

    const layout = {
      title: { text: config.title, font: { size: 14 } },
      xaxis: {
        title: this.getAxisTitle(config.x_axis),
        type: this.getXAxisType(
          data.map((row) => row[xAxis]),
          config.x_axis
        ),
      },
      yaxis: {
        title: this.getAxisTitle(config.y_axis),
        tickformat: this.isLargeNumber(data.map((row) => parseFloat(row[yAxis]) || 0))
          ? ",.0s"
          : ".2f",
      },
      margin: { t: 40, r: 20, b: 40, l: 80 },
      barmode: config.chart_type === "grouped_bar" ? "group" : "stack",
    };

    return { traces, layout };
  }

  getChartColor(index) {
    const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"];
    return colors[index % colors.length];
  }

  async applyFilters() {
    const filters = this.collectFilterValues();

    try {
      this.showLoading(true);

      // Mock 데이터에 필터 적용
      const mockData = this.generateMultiChartMockData();

      if (this.isMultiChart) {
        // 필터 적용된 데이터셋 생성
        const filteredDatasets = mockData.datasets.map(dataset => {
          let filteredData = dataset.data;

          Object.keys(filters).forEach(column => {
            const filterValue = filters[column];
            // 더 엄격한 필터 값 검증
            if (filterValue !== null && filterValue !== undefined && filterValue !== '') {
              // 차트에 해당 컬럼이 존재하는지 확인
              const hasColumn = filteredData.length > 0 && filteredData[0].hasOwnProperty(column);
              if (hasColumn) {
                if (Array.isArray(filterValue)) {
                  // 배열인 경우 길이가 0보다 커야 함
                  if (filterValue.length > 0) {
                    filteredData = filteredData.filter(row => filterValue.includes(row[column]));
                  }
                } else {
                  filteredData = filteredData.filter(row => row[column] === filterValue);
                }
              }
            }
          });

          return {
            ...dataset,
            data: filteredData
          };
        });

        filteredDatasets.forEach((dataset) => {
          this.chartData[dataset.chart_index] = dataset.data;
        });

        const totalFiltered = filteredDatasets.reduce((sum, dataset) => sum + dataset.data.length, 0);
        this.updateStats(totalFiltered, mockData.total_count);
        this.renderAllCharts();
      } else {
        // 단일 차트 처리
        let filteredData = mockData.data;

        Object.keys(filters).forEach(column => {
          const filterValue = filters[column];
          if (filterValue && filterValue !== '') {
            if (Array.isArray(filterValue)) {
              filteredData = filteredData.filter(row => filterValue.includes(row[column]));
            } else {
              filteredData = filteredData.filter(row => row[column] === filterValue);
            }
          }
        });

        this.rawData = filteredData;
        this.updateStats(filteredData.length, mockData.total_count);
        this.renderChart();
      }
    } catch (error) {
      console.error("필터링 오류:", error);
      this.showError("필터링 중 오류가 발생했습니다.");
    } finally {
      this.showLoading(false);
    }
  }

  showLoading(show) {
    if (this.isMultiChart) {
      // 다중 차트의 경우 모든 차트의 로딩 표시
      for (let i = 0; i < this.chartCount; i++) {
        const loadingElement = document.getElementById(`loading-${i}`);
        if (loadingElement) {
          loadingElement.style.display = show ? "block" : "none";
        }
      }
    } else {
      // 기존 단일 차트 로딩 표시
      const loadingElement = document.getElementById("loading");
      if (loadingElement) {
        loadingElement.style.display = show ? "block" : "none";
      }
    }
  }

  showError(message) {
    if (this.isMultiChart) {
      // 다중 차트의 경우 첫 번째 차트에 에러 표시
      const firstChart = document.getElementById("chart-0");
      if (firstChart) {
        firstChart.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <i class="bi bi-exclamation-triangle"></i> ${message}
                    </div>
                `;
      }
    } else {
      // 기존 단일 차트 에러 표시
      const chartElement = document.getElementById("chart");
      if (chartElement) {
        chartElement.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <i class="bi bi-exclamation-triangle"></i> ${message}
                    </div>
                `;
      }
    }
  }
}

function resetFilters() {
  document.querySelectorAll("[data-column]").forEach((element) => {
    if (element.type === "range") {
      element.value = element.min;
    } else if (element.multiple) {
      Array.from(element.options).forEach((option) => (option.selected = false));
    } else {
      element.value = "";
    }
  });

  // 필터 초기화 후 데이터 새로고침
  if (window.dashboardController) {
    window.dashboardController.applyFilters();
  }
}

// 페이지 로드 시 대시보드 초기화
document.addEventListener("DOMContentLoaded", function () {
  try {
    // Mock 환경에서는 대시보드 ID가 필요 없음
    const dashboardId = "mock-dashboard";

    // Check if Plotly is available
    if (typeof Plotly === "undefined") {
      console.error("Plotly.js is not loaded");
      document.getElementById("chart").innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <i class="bi bi-exclamation-triangle"></i> Plotly.js 라이브러리가 로드되지 않았습니다.
                    <br><small>base.html 템플릿에 Plotly.js를 포함시켜주세요.</small>
                </div>
            `;
      return;
    }

    // 다중 차트 설정
    const isMultiChart = true;
    const chartConfigs = [
      {
        title: "차트 1: 달력_연도_월별 총매출액 분석",
        x_axis: "달력_연도_월",
        y_axis: "총매출액",
        chart_type: "bar",
        is_multi_series: false
      },
      {
        title: "차트 2: 달력_연도_월별 유통경로별 총매출액 분석",
        x_axis: "달력_연도_월",
        y_axis: "총매출액",
        chart_type: "bar",
        is_multi_series: true,
        group_by_column: "유통경로"
      },
      {
        title: "차트 3: 달력_연도_월별 제품군별 총매출액 분석",
        x_axis: "달력_연도_월",
        y_axis: "총매출액",
        chart_type: "bar",
        is_multi_series: true,
        group_by_column: "제품군"
      }
    ];

    // Multi-chart 레이아웃 표시
    const multiChartContainer = document.querySelector('.dashboard__multi-chart__container');
    const singleChartContainer = document.querySelector('.dashboard__chart__container:not(.dashboard__chart__item)');

    if (isMultiChart && multiChartContainer) {
      multiChartContainer.style.display = 'block';
      multiChartContainer.setAttribute('data-chart-count', chartConfigs.length);

      if (singleChartContainer) {
        singleChartContainer.style.display = 'none';
      }
    }

    if (isMultiChart) {
      window.dashboardController = new MultiChartDashboardController(
        dashboardId,
        chartConfigs,
        true
      );
    } else {
      window.dashboardController = new DashboardController(
        dashboardId,
        chartConfigs[0]
      );
    }
  } catch (error) {
    console.error("Failed to initialize dashboard:", error);
    const chartElement = document.getElementById("chart") || document.getElementById("chart-0");
    if (chartElement) {
      chartElement.innerHTML = `
              <div class="alert alert-danger" role="alert">
                  <i class="bi bi-exclamation-triangle"></i> 대시보드 초기화 중 오류가 발생했습니다.
              </div>
          `;
    }
  }
});
