# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

현재 프로젝트는 Dashboard 템플릿을 만들기 위한 UI 개선 프로젝트입니다. Frontend-only project using static HTML files with Bootstrap and Plotly.js for charting.

## Repository Status

## Initial Setup Guidance

1. UI 구조 및 스타일 개발만을 위해 Mock Data를 구성
2. Live Server 를 통해 테스트 환경 구성
   (Live Server 진입점은 항상 src/base.html 파일)

## Architecture

### File Structure

- `src/base.html` - Base template with navigation, includes Bootstrap 5, Plotly.js, and Crossfilter.js
- `src/dashboard.html` - Main dashboard template with filtering panel and chart area
- `.claude/ordering_images/` - Image assets directory (currently empty)

### Technology Stack

- **UI Framework**: Bootstrap 5 with custom CSS
- **Charts**: Plotly.js 3.1.0 for interactive data visualization
- **Data Processing**: Crossfilter.js for client-side filtering
- **Fonts**: Google Fonts (Inter), Pretendard for Korean text
- **Icons**: Bootstrap Icons

### Dashboard Architecture

The dashboard system supports both single and multi-chart layouts:

- **Single Chart Mode**: Traditional layout with sidebar filters and main chart area
- **Multi-Chart Mode**: Grid-based responsive layout supporting 1-3 charts with automatic sizing
- **Responsive Design**: Mobile-first approach with collapsible layouts

## Development Workflow

### Entry Point

- **Development**: Use Live Server with `src/base.html` as entry point
- 프로젝트의 진입점은 src/base.html 파일

### UI Development Guidelines

- 요청 사항 수행 시 정확하게 요청 한 부분에 대해서만 수정을 진행
  - 의도하지 않은 스타일 수정 금지
  - 요청 사항 외 독자적인 추가 수정 금지
- Maintain existing Bootstrap classes and structure
- Follow Korean localization patterns (button text, labels, etc.)

### Chart System

The JavaScript includes two main controllers:

- `DashboardController` - Single chart dashboards
- `MultiChartDashboardController` - Multi-chart layouts with grid system

Charts support:

- Real-time filtering with statistics updates
- Korean/English mixed content
- Responsive grid layouts (1, 2, or 3 charts)
- Multiple chart types (bar, line, scatter, etc.)

## Common Development Tasks

### Running the Project

No build process required. Open `src/base.html` in Live Server or any local web server.

### Adding New Charts

Charts are configured via JavaScript objects with properties:

- `x_axis`, `y_axis` - Data column mappings
- `chart_type` - Plotly chart type (bar, line, scatter)
- `title` - Chart display title
- `is_multi_series` - Enable grouping by additional column

### Styling Modifications

- Custom styles are embedded in `dashboard.html` template
- Bootstrap 5 utilities should be preferred over custom CSS
- Maintain consistent spacing using Bootstrap margin/padding classes

## Notes

- .claude 폴더 내부 ordering_images 폴더에 이미지가 존재한다면 이미지들을 미리 파악

## Technical Notes

### Template System

Files use Jinja2-style template syntax (`{% %}`, `{{ }}`) suggesting this may integrate with a Python web framework, though currently developed as static files.

### JavaScript Dependencies

All external dependencies are loaded via CDN:

- Bootstrap 5.3.0
- Plotly.js 3.1.0
- Crossfilter 1.5.4
- Bootstrap Icons 1.10.0

### Korean Localization

- UI text is in Korean
- Fonts configured for proper Korean rendering (Pretendard)
- Number formatting includes Korean locale settings
