# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

현재 프로젝트는 Dashboard 템플릿을 만들기 위한 UI 개선 프로젝트입니다. Frontend-only project using static HTML files with Bootstrap and Plotly.js for charting.

## Development Commands

### Running the Project

No build process required. Open `src/base.html` in Live Server or any local web server.

```bash
# Entry point for development
# Live Server 진입점은 항상 src/base.html 파일
```

## Architecture

### File Structure

- `src/base.html` - Main entry point with navigation, includes Bootstrap 5, Plotly.js, and Crossfilter.js
- `src/base-dashboard.js` - JavaScript controllers for single and multi-chart dashboards
- `src/base-dashboard.css` - Dashboard-specific styling
- `src/base-layout.css` - Layout and responsive design styles
- `src/theme.css` - Theme variables and color definitions
- `.claude/Convention/` - Code conventions and naming rules
- `.claude/ordering_images/` - UI reference images

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

JavaScript controllers:

- `DashboardController` - Single chart dashboards
- `MultiChartDashboardController` - Multi-chart layouts with grid system

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

## Code Convention Guide

- .claude 폴더 내부 Convention 폴더 내부 개발 시 지켜야할 코드 컨벤션을 반드시 참고하여 반영
- Convention 위반 코드 발견 시 즉시 지적하고 올바른 방법을 제안

```
📦.claude
 ┃
 ┣ 📂Convention
    ┗ 📜ClassNameConvention.md
    ┗ 📜StyleFontVariableConvention.md
    ┗ 📜StyleColorVariableConvention.md
    ┗ 📜Bootstrap5ComponentsConvention.md
    ┗ 📜Bootstrap5InputConvention.md
```

- **(매우 중요) 작업 전 필수**: .claude/Convention 폴더의 관련 규칙을 확인하고 적용하세요.
- **(매우 중요) 작업 전 필수 주의 사항 1**: 매번 CSS 스타일 변수 수정및 추가에 대해서는 반드시 제안 해야하고 승인했을 경우에만 변경하세요.
- **(매우 중요) Convention 위반**: 매번 발견 즉시 지적하고 올바른 방법을 제안하세요.

- 작업 계획: 매번 모든 UI 디자인 작업은 변경 계획 수립 → 제안 → 승인 후 작업 진행하세요.

- UI 구현 우선순위: 1순위 기존 구현 컴포넌트 재사용 확인 → 2순위 Bootstrap5 사용을 검토하세요.

- CSS 클래스명: ClassNameConvention.md의 Header**Block**Element_Modifier 네이밍 규칙을 모든 CSS 클래스명에 엄격히 적용하세요.

- 폰트 스타일: StyleFontVariableConvention.md의 명명 규칙을 모든 CSS 폰트 변수와 폰트 이름에 적용하세요.
- 폰트 관련: 모든 폰트 관련 스타일은 StyleFontVariableConvention.md 가이드라인을 완전히 준수해야 합니다.

- 색상 스타일: StyleColorVariableConvention.md의 명명 규칙을 모든 CSS 색상 변수와 색상 이름에 적용하세요.
- 색상 관련: 모든 색상 관련 스타일은 StyleColorVariableConvention.md 가이드라인을 완전히 준수해야 합니다.

- 컨벤션 적용 우선순위: Bootstrap5 사용 시 1순위 프로젝트 컨벤션(ClassNameConvention, StyleFontVariableConvention, StyleColorVariableConvention 등등) 적용 후 → 2순위 Bootstrap5 컨벤션을 적용하세요.

- Bootstrap5 사용 프로세스: 사용 계획 수립 → 제안 → 승인 후 구현 진행하세요.
- Bootstrap5 컴포넌트: Bootstrap5ComponentsConvention.md 규칙을 모든 Bootstrap 5 컴포넌트에 엄격히 적용하세요.
- Bootstrap5 입력요소: Bootstrap5InputConvention.md 규칙을 모든 Bootstrap 5 입력 요소에 엄격히 적용하세요.

  1. CSS 클래스명 변경 시 필수 체크리스트

  **CSS 클래스명 변경 작업 시 필수 절차:**

  1. CSS 파일에서 클래스명 변경
  2. HTML 파일에서 해당 클래스명 변경
  3. JavaScript 파일에서 querySelector/querySelectorAll 검색 및 변경
  4. 기타 템플릿 파일(.jsx, .vue, .php 등)에서 검색 및 변경
  5. 변경 완료 후 grep으로 이전 클래스명 잔존 여부 최종 검증

  6. 영향 범위 분석 의무화

  **CSS/HTML 구조 변경 시 영향 범위 분석 필수:**

  - 변경 전: 해당 클래스명을 사용하는 모든 파일 검색 (Grep 도구 사용)
  - 영향받는 파일 목록 작성 및 사용자에게 보고
  - 각 파일별 수정 계획 수립 후 진행

  3. 자동 검증 규칙

  **변경 작업 완료 후 자동 검증:**

  - `grep -r "이전_클래스명" .` 실행하여 잔존 확인
  - 결과가 0개가 될 때까지 작업 미완료 처리
  - 새로운 클래스명이 의도한 모든 위치에 적용되었는지 확인

  4. 작업 패턴 표준화

  **CSS 구조 변경 작업의 표준 시퀀스:**

  1. 영향 범위 분석 (Grep으로 모든 사용처 검색)
  2. 변경 계획 수립 및 사용자 승인
  3. 파일별 순차 변경 (CSS → HTML → JS → 기타)
  4. 단계별 검증 (각 파일 변경 후 즉시 확인)
  5. 최종 전체 검증 (이전 클래스명 완전 제거 확인)

  6. 실수 방지 체크 포인트

  **필수 질문 리스트:**

  - "이 클래스명을 JavaScript에서 사용하고 있나요?"
  - "HTML 템플릿 외에 다른 파일에서도 참조하고 있나요?"
  - "동적으로 생성되는 클래스명은 없나요?"
  - "CSS-in-JS나 인라인 스타일에서 참조하고 있나요?"
