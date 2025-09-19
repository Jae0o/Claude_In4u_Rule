# 프로젝트 컨벤션 상세 가이드

## 1. CSS 클래스명 컨벤션 (ClassNameConvention.md)

### 핵심 원칙
- **구조**: `Header__Block__Element_Modifier`
- **연결 규칙**: 
  - Header, Block, Element 사이: `__` (언더스코어 2개)
  - Element와 Modifier 사이: `_` (언더스코어 1개)
- **평평한 구조**: Element 중첩 금지 (❌ `__item__button`)
- **역할 중심 네이밍**: 태그명이 아닌 기능/역할 기반 (✅ `profile_button`)

### 구성 요소
- **Header**: 페이지/최상위 컴포넌트 (`login`, `navbar`, `product-detail`)
- **Block**: Header 내 기능 블록 (`login__form`, `navbar__menu`)
- **Element**: Block 구성 요소 (`login__form__input`, `navbar__menu__item`)
- **Modifier**: 형태/타입 (`..._text`, `..._button`, `..._box`)

### 예시
```css
.navbar__menu__profile_button /* 올바른 예시 */
.navbar__menu__item /* Element */
.login__form__input_text /* Modifier 적용 */
```

## 2. 폰트 스타일 컨벤션 (StyleFontVariableConvention.md)

### Font Size 변수
- **필수**: 고정값 대신 CSS 변수 사용
- **단위**: `rem` 사용 (웹 접근성)

```css
--font-size-12: 0.75rem;   /* 메타데이터, 저작권 */
--font-size-14: 0.875rem;  /* 표준 본문 */
--font-size-16: 1rem;      /* 강조 문단 */
--font-size-18: 1.125rem;  /* 섹션 제목 (h3) */
--font-size-20: 1.25rem;   /* 페이지 제목 (h2) */
--font-size-25: 1.5625rem; /* 최상위 타이틀 (h1) */
```

### Font Weight 변수
```css
--font-weight-normal: 400;    /* 기본 본문 */
--font-weight-medium: 500;    /* 가장 많이 사용, 버튼/라벨 */
--font-weight-semibold: 600; /* 제목, 중요 정보 */
--font-weight-bold: 700;      /* 최고 강조, 경고 */
```

### Font Family
- 기본 폰트: Pretendard

## 3. 색상 변수 컨벤션 (StyleColorVariableConvention.md)

### 기본 원칙
- **필수**: 하드코딩 금지, CSS 변수 사용
- **미존재 변수**: 제안 후 사용
- **투명도**: `rgba(var(--color-primary-rgb), 0.5)` 형식
- **구체적 변수 우선**: `--color-text-header` > `--color-black`

### 신규 변수 제안
- 형식: [HEX 코드, 변수명(제안), 주요 사용처]
- 중복 확인 필수

## 4. Bootstrap5 컴포넌트 컨벤션

### 공통 원칙
1. **계획 설계**: UI 적용 계획 → 제안 → 승인 → 구현
2. **재사용성 확인**: 기존 컴포넌트 우선 활용
3. **무결성 유지**: Bootstrap 기본 구조 유지
4. **데이터 속성**: `data-bs-*` 우선 사용
5. **접근성**: `aria-*` 속성 필수

### CDN 설정
```html
<!-- Bootstrap CSS (head) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap JS (body 끝) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

### 컴포넌트별 규칙

#### Alert
- `role="alert"` 필수
- 해제 가능: `alert-dismissible fade show`
- 링크: `alert-link` 클래스

#### Button
- 그룹: `role="group"`, `aria-label` 필수
- 분할 드롭다운: `visually-hidden` 텍스트

#### Card
- 이미지: `alt` 속성 필수
- 제목: `card-title` 클래스

#### Modal
- 속성: `tabindex="-1"`, `aria-labelledby`, `aria-hidden`
- 중첩 모달 금지

#### Dropdown
- `aria-expanded="false"` 필수
- 구분선: `<hr class="dropdown-divider">`

## 5. Bootstrap5 입력 요소 컨벤션

### 공통 규칙
- **레이블 필수**: 모든 입력 요소
- **유효성 검사**: Bootstrap validation 클래스
- **일관된 크기**: 동일 폼 내 통일
- **상태 표시**: disabled, readonly 명확히

### 컴포넌트별 규칙

#### Select
- 첫 옵션: `selected disabled` (플레이스홀더)
- 그룹화: `<optgroup label="">`
- 다중 선택: `multiple`, `size` 속성

#### Range
- 속성: `min`, `max`, `step`, `value`
- 값 표시: `<output>` 태그 활용
- 눈금: 하단 레이블 추가

#### Checkbox
- 그룹화: `<fieldset>`, `<legend>`
- 스위치: `form-switch`, `role="switch"`
- 같은 그룹: 동일 `name` 속성

#### Radio
- 같은 그룹: 동일 `name` 필수
- 기본 선택: `checked` 속성
- 버튼 스타일: `btn-check`, `autocomplete="off"`

#### Number
- 범위: `min`, `max`, `step`
- 소수점: `step="0.01"`

#### Date/Time
- 범위: `min`, `max` 설정
- 시간 간격: `step` 속성 (예: step="900" = 15분)

## 우선순위 규칙
1. **프로젝트 컨벤션 최우선**
2. **Bootstrap 사용 시**: 프로젝트 컨벤션 → Bootstrap 컨벤션
3. **Convention 위반 시**: 즉시 지적 및 올바른 방법 제안