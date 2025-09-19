# Claude_In4u_Rule Convention 총정리

## 1. ClassNameConvention.md - CSS 클래스 네이밍 규칙

### 핵심 구조: `Header__Block__Element_Modifier`
- **구분자**: Block과 Element 앞에는 `__` (언더스코어 2개)
- **Modifier 앞에는 `_` (언더스코어 1개만)**
- 평평한 Element 구조 유지 (중첩 금지)
- 역할 중심 네이밍 (태그명이 아닌 기능 기준)

### 예시:
- ✅ `navbar__menu__profile_button`
- ✅ `login__form__input_text`
- ❌ `navbar__menu__item__button` (Element 중첩)
- ❌ `login__form__input-text` (하이픈 사용)

## 2. StyleFontVariableConvention.md - 폰트 스타일 규칙

### Font Size 변수 (rem 단위 사용)
- `--font-size-12`: 0.75rem (메타데이터, 저작권 정보)
- `--font-size-14`: 0.875rem (표준 본문 텍스트, 폼 요소)
- `--font-size-16`: 1rem (강조 문단, 사이드바 메뉴)
- `--font-size-18`: 1.125rem (섹션 제목 h3)
- `--font-size-20`: 1.25rem (페이지 제목 h2)
- `--font-size-25`: 1.5625rem (최상위 제목 h1)

### Font Weight 변수
- `--font-weight-normal`: 400 (기본 본문)
- `--font-weight-medium`: 500 (라벨, 버튼 - 가장 많이 사용)
- `--font-weight-semibold`: 600 (제목, 중요 정보)
- `--font-weight-bold`: 700 (핵심 키워드, 경고)

### 기본 폰트
- Pretendard 폰트 사용

## 3. StyleColorVariableConvention.md - 색상 변수 규칙

### 원칙
- 하드코딩된 색상값 사용 금지
- 모든 색상은 CSS 변수 사용 (`--color-*`)
- 미존재 변수는 제안 후 사용
- 투명도는 rgba/hsla 활용

### 신규 변수 추가 시
- 형식: [HEX 코드, 변수명(제안), 주요 사용처]
- 중복 확인 필수
- theme.css 파일 확인 후 추가

## 4. Bootstrap5ComponentsConvention.md - Bootstrap 컴포넌트 규칙

### CDN 설정
```html
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- Bootstrap JS (body 끝부분) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

### 핵심 원칙
1. **계획 설계**: UI 적용 계획 세우고 제안 후 적용
2. **재사용성 확인**: 기존 컴포넌트 확인
3. **무결성 유지**: Bootstrap 기본 구조 유지
4. **데이터 속성 활용**: `data-bs-*` 우선 사용
5. **접근성 준수**: `aria-*` 속성 활용

### 주요 컴포넌트별 주의사항
- **Alert**: `role="alert"` 필수
- **Button**: 버튼 그룹에 `role="group"` 필수
- **Modal**: `tabindex="-1"`, `aria-labelledby` 필수, 중첩 금지
- **Dropdown**: `aria-expanded="false"` 포함
- **Toast**: `role="alert"`, `aria-live="assertive"` 필수

## 5. Bootstrap5InputConvention.md - Bootstrap Input 규칙

### Input 컴포넌트 원칙
1. **레이블 필수**: 모든 입력 요소에 연결된 레이블
2. **유효성 검사**: Bootstrap validation 클래스 활용
3. **접근성 우선**: ARIA 속성과 적절한 type 사용
4. **일관된 크기**: 동일 폼 내 일관된 입력 크기
5. **상태 표시**: disabled, readonly 등 명확히 표현

### 컴포넌트별 지침
- **Select**: 첫 옵션은 `selected disabled`로 플레이스홀더
- **Range**: min, max, step 속성 필수
- **Checkbox**: 그룹은 fieldset과 legend로 묶기
- **Radio**: 같은 그룹은 동일한 name 속성
- **Number**: min, max, step으로 범위 제한
- **Date/Time**: 적절한 min, max로 유효 범위 설정

## 프로젝트 적용 시 주의사항

1. **요청 사항만 정확히 수행**
   - 의도하지 않은 스타일 수정 금지
   - 독자적인 추가 수정 금지

2. **컨벤션 위반 발견 시**
   - 즉시 지적하고 올바른 방법 제안
   - 모든 새 코드는 컨벤션 준수

3. **우선순위**
   - 재사용 가능한 Component 우선 확인
   - Bootstrap5 사용 시 계획 세우고 제안
   - 모든 컨벤션 규칙 준수