# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

현재 프로젝트는 Dashboard 템플릿을 만들기 위한 UI 개선 프로젝트입니다. Frontend-only project using static HTML files with Bootstrap and Plotly.js for charting with Mock data system.

## Development Environment

### Running the Project

No build process required. Open `src/base.html` in Live Server or any local web server.

**Entry Point**: `src/base.html` - Always use this as the main entry point for Live Server

### File Structure

```
src/
├── base.html              # Main entry point with navigation and multi-chart layout
├── base-layout.css        # Base styling (navbar, global styles)
├── base-dashboard.css     # Dashboard-specific styles (filters, charts, responsive grid)
└── base-dashboard.js      # Complete dashboard system with controllers and mock data
```

## Architecture

### Dashboard Controller System

The application uses a dual-controller architecture:

1. **DashboardController** - Single chart dashboards with basic filtering
2. **MultiChartDashboardController** - Multi-chart layouts extending base controller

Both controllers share:

- Mock data generation systems (`generateMockData()`, `generateMultiChartMockData()`)
- Filter management and real-time data updates
- Plotly.js integration with Korean localization

### Mock Data System

The project is designed to work entirely with generated mock data:

- **Single Chart Data**: Basic data with 달력*연도*월, 유통경로, 제품군, 총매출액
- **Multi-Chart Data**: Three separate datasets for different chart types
- **Filter Integration**: Mock data responds to filter changes in real-time

Current multi-chart configuration:

- Chart 1: 달력*연도*월별 총매출액 분석 (single series bar chart)
- Chart 2: 달력*연도*월별 유통경로별 총매출액 분석 (multi-series by 유통경로)
- Chart 3: 달력*연도*월별 제품군별 총매출액 분석 (multi-series by 제품군)

### Technology Stack

- **UI Framework**: Bootstrap 5 with custom CSS
- **Charts**: Plotly.js 3.1.0 for interactive data visualization
- **Data Processing**: Mock data generation (no external APIs)
- **Fonts**: Google Fonts (Inter), Pretendard for Korean text
- **Icons**: Bootstrap Icons

### Responsive Multi-Chart Layout

CSS Grid system in `base-dashboard.css` with automatic chart sizing:

- 1 chart: Full width
- 2 charts: 50/50 split
- 3 charts: Responsive grid layout
- Mobile: Stack vertically

## UI Development Guidelines

- 요청 사항 수행 시 정확하게 요청 한 부분에 대해서만 수정을 진행
  - 의도하지 않은 스타일 수정 금지
  - 요청 사항 외 독자적인 추가 수정 금지
- Maintain existing Bootstrap classes and structure
- Follow Korean localization patterns (button text, labels, etc.)

### Adding New Charts

Charts are configured via JavaScript objects in the initialization:

```javascript
{
  title: "차트 제목",
  x_axis: "달력_연도_월",
  y_axis: "총매출액",
  chart_type: "bar",
  is_multi_series: true,
  group_by_column: "유통경로" // for multi-series only
}
```

### Filter System

Filters in the sidebar automatically connect to mock data:

- 달력 연도월 (multi-select): 2023.01 - 2023.09
- 유통경로 (single select): 온라인, 오프라인
- 제품군 (multi-select): 전자, 의류, 식품, etc.

## Important Notes

- .claude 폴더 내부 ordering_images 폴더에 이미지가 존재한다면 이미지들을 미리 파악
- No build process, no package.json - pure static HTML/CSS/JS
- All dependencies loaded via CDN (Bootstrap 5.3.0, Plotly.js 3.1.0)
- Dashboard ID is set to "mock-dashboard" - no server communication needed
- CSS and HTML element structure must be maintained when making changes

## Code Convention Guide

- .claude 폴더 내부 Convention 폴더 내부 개발 시 지켜야할 코드 컨벤션을 반드시 참고하여 반영
- Convention 위반 코드 발견 시 즉시 지적하고 올바른 방법을 제안

```
📦.claude
 ┃
 ┣ 📂Convention
    ┗ 📜ClassNameConvention.md
    ┗ 📜StyleFontVariableConvention.md

```

- ClassNameConvention.md의 네이밍 규칙을 모든 CSS 클래스명에 적용
- 모든 CSS 변수와 폰트 이름은 StyleFontVariableConvention.md의 명명 규칙을 따르세요.
- 모든 CSS 변수와 폰트 관련 스타일은 StyleFontVariableConvention.md의 가이드라인을 준수해야 합니다.
