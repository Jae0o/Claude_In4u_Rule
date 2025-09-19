# BootStrap5 Input Guide

---

## BootStrap5 기본 구조 및 CDN 설정

Bootstrap5 설치 시 html에 적용 가능한 방법 제시

- Bootstrap5 다운로드를 위한 `<link>` 태그의 위치는 `<head>` 태그 안에서 적절한 위치라면 제약 없음
- 아래의 Format 양식을 지켜 `<link>` 태그 적용
- 주석은 아래와 동일하게 반드시 적용

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <!-- 다른 내용 -->

    <!-- Bootstrap CSS -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <!-- 페이지 내용 -->

    <!-- Bootstrap JS (body 끝부분에 배치) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
```

---

## **BootStrap5 Input Components 핵심 원칙**

1. **계획 설계**: UI 적용 과정에서는 반드시 적용 계획을 세우고 제안 후 적용
2. **재사용성 확인**: 기존에 구현된 동일/유사한 컴포넌트가 있는지 확인하여 코드 재사용성을 높임
3. **레이블 필수**: 모든 입력 요소는 연결된 레이블 포함
4. **유효성 검사**: Bootstrap의 validation 클래스 체계 활용
5. **접근성 우선**: ARIA 속성과 적절한 `type` 속성 사용
6. **일관된 크기**: 동일 폼 내에서는 일관된 입력 크기 유지
7. **상태 표시**: 비활성화, 읽기전용 등 상태를 명확히 표현
8. **데이터 속성 활용**: JavaScript 초기화보다 `data-bs-*` 속성 우선 사용
9. **성능 최적화**: 불필요한 이벤트 핸들러 방지, 효율적인 폼 검증

---

## **BootStrap5 Input Components 별 지침**

### Select Component

**Select 사용 지침**

1. 첫 번째 옵션은 `selected disabled` 속성으로 플레이스홀더 역할
2. 다중 선택 시 `multiple` 속성과 `size` 속성으로 보이는 옵션 수 조절
3. 그룹화할 때는 `<optgroup label="그룹명">` 사용
4. 유효성 검사를 위해 `required` 속성과 `invalid-feedback` 클래스 활용

```html
<!-- 기본 Select -->
<div class="mb-3">
  <label
    for="basicSelect"
    class="form-label"
    >Country</label
  >
  <select
    class="form-select"
    id="basicSelect"
    required
  >
    <option
      selected
      disabled
      value=""
    >
      Choose...
    </option>
    <option value="kr">South Korea</option>
    <option value="us">United States</option>
    <option value="jp">Japan</option>
  </select>
  <div class="invalid-feedback">Please select a valid country.</div>
</div>

<!-- 다중 선택 Select -->
<div class="mb-3">
  <label
    for="multiSelect"
    class="form-label"
    >Skills (Hold Ctrl/Cmd for multiple)</label
  >
  <select
    class="form-select"
    id="multiSelect"
    multiple
    aria-label="Multiple select skills"
    size="4"
  >
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
    <option value="react">React</option>
  </select>
  <div class="form-text">Select multiple skills by holding Ctrl (or Cmd on Mac)</div>
</div>

<!-- 그룹화된 Select -->
<div class="mb-3">
  <label
    for="groupedSelect"
    class="form-label"
    >Choose Technology</label
  >
  <select
    class="form-select"
    id="groupedSelect"
  >
    <option
      selected
      disabled
    >
      Choose technology...
    </option>

    <optgroup label="Frontend">
      <option value="react">React</option>
      <option value="vue">Vue.js</option>
      <option value="angular">Angular</option>
    </optgroup>

    <optgroup label="Backend">
      <option value="nodejs">Node.js</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
    </optgroup>
  </select>
</div>
```

---

### Range Component

**Range 사용 지침**

1. `min`, `max`, `step`, `value` 속성으로 범위와 기본값 설정
2. 현재 값 표시를 위해 `<output>` 태그 또는 JavaScript 활용
3. 눈금 표시를 위해 하단에 범위 레이블 추가
4. CSS 커스텀 속성으로 색상 및 스타일 조정 가능

```html
<!-- 기본 Range Slider -->
<div class="mb-3">
  <label
    for="basicRange"
    class="form-label"
    >Volume</label
  >
  <input
    type="range"
    class="form-range"
    min="0"
    max="100"
    step="1"
    value="50"
    id="basicRange"
  />
  <div class="d-flex justify-content-between">
    <span>0</span>
    <span>50</span>
    <span>100</span>
  </div>
</div>

<!-- 현재 값 표시 -->
<div class="mb-3">
  <label
    for="rangeWithValue"
    class="form-label"
    >Price Range</label
  >
  <input
    type="range"
    class="form-range"
    min="0"
    max="1000"
    step="50"
    value="500"
    id="rangeWithValue"
    oninput="this.nextElementSibling.value = this.value"
  />
  <output class="form-text">500</output>
  <div class="d-flex justify-content-between small text-muted">
    <span>$0</span>
    <span>$1,000</span>
  </div>
</div>

<!-- 커스텀 스타일 Range -->
<div class="mb-3">
  <label
    for="customRange"
    class="form-label"
    >Custom Range</label
  >
  <input
    type="range"
    class="form-range"
    min="0"
    max="5"
    step="0.5"
    value="2.5"
    id="customRange"
    style="--bs-range-thumb-bg: #dc3545;"
  />
  <div class="d-flex justify-content-between small">
    <span>Poor</span>
    <span>Fair</span>
    <span>Good</span>
    <span>Great</span>
    <span>Excellent</span>
  </div>
</div>
```

---

### Checkbox Component

**Checkbox 사용 지침**

1. 체크박스 그룹은 `<fieldset>`과 `<legend>` 태그로 그룹화
2. 인라인 배치시 `form-check-inline` 클래스 사용
3. 스위치 형태는 `form-switch` 클래스와 `role="switch"` 속성 필수
4. 같은 그룹의 체크박스는 동일한 `name` 속성 사용

```html
<!-- 기본 Checkbox -->
<div class="form-check">
  <input
    class="form-check-input"
    type="checkbox"
    value=""
    id="flexCheckDefault"
  />
  <label
    class="form-check-label"
    for="flexCheckDefault"
  >
    Default checkbox
  </label>
</div>

<!-- 체크박스 그룹 -->
<fieldset class="mb-3">
  <legend class="form-label">Choose your interests</legend>

  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      value="technology"
      id="interest1"
      name="interests"
    />
    <label
      class="form-check-label"
      for="interest1"
      >Technology</label
    >
  </div>

  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      value="sports"
      id="interest2"
      name="interests"
    />
    <label
      class="form-check-label"
      for="interest2"
      >Sports</label
    >
  </div>
</fieldset>

<!-- Checkbox Switch -->
<div class="form-check form-switch">
  <input
    class="form-check-input"
    type="checkbox"
    role="switch"
    id="flexSwitchCheckDefault"
  />
  <label
    class="form-check-label"
    for="flexSwitchCheckDefault"
    >Default switch</label
  >
</div>
```

---

### Radio Component

**Radio 사용 지침**

1. 같은 그룹의 라디오 버튼은 동일한 `name` 속성 필수
2. 그룹은 `<fieldset>`과 `<legend>`로 묶어 접근성 확보
3. 기본 선택값이 있다면 `checked` 속성 사용
4. 버튼 스타일 라디오는 `btn-check` 클래스와 `autocomplete="off"` 속성 필요

```html
<!-- 기본 Radio Button -->
<fieldset class="mb-3">
  <legend class="form-label">Choose payment method</legend>

  <div class="form-check">
    <input
      class="form-check-input"
      type="radio"
      name="payment"
      id="creditCard"
      value="credit"
      checked
    />
    <label
      class="form-check-label"
      for="creditCard"
      >Credit Card</label
    >
  </div>

  <div class="form-check">
    <input
      class="form-check-input"
      type="radio"
      name="payment"
      id="paypal"
      value="paypal"
    />
    <label
      class="form-check-label"
      for="paypal"
      >PayPal</label
    >
  </div>
</fieldset>

<!-- Button-style Radio -->
<div class="mb-3">
  <span class="form-label d-block">Difficulty Level</span>

  <div
    class="btn-group"
    role="group"
    aria-label="Difficulty selection"
  >
    <input
      type="radio"
      class="btn-check"
      name="difficulty"
      id="easy"
      value="easy"
      autocomplete="off"
      checked
    />
    <label
      class="btn btn-outline-success"
      for="easy"
      >Easy</label
    >

    <input
      type="radio"
      class="btn-check"
      name="difficulty"
      id="medium"
      value="medium"
      autocomplete="off"
    />
    <label
      class="btn btn-outline-warning"
      for="medium"
      >Medium</label
    >

    <input
      type="radio"
      class="btn-check"
      name="difficulty"
      id="hard"
      value="hard"
      autocomplete="off"
    />
    <label
      class="btn btn-outline-danger"
      for="hard"
      >Hard</label
    >
  </div>
</div>
```

---

### Number Component

**Number 사용 지침**

1. `min`, `max`, `step` 속성으로 입력 범위와 단위 제한
2. 소수점 입력시 `step="0.01"` 등 적절한 스텝 값 설정
3. 커스텀 스핀 버튼 구현시 접근성과 키보드 네비게이션 고려
4. 유효성 검사 메시지로 입력 범위 안내

```html
<!-- 기본 Number Input -->
<div class="mb-3">
  <label
    for="basicNumber"
    class="form-label"
    >Age</label
  >
  <input
    type="number"
    class="form-control"
    id="basicNumber"
    min="1"
    max="120"
    step="1"
    value="25"
  />
  <div class="form-text">Enter your age (1-120)</div>
</div>

<!-- 소수점 허용 -->
<div class="mb-3">
  <label
    for="decimalNumber"
    class="form-label"
    >Price ($)</label
  >
  <input
    type="number"
    class="form-control"
    id="decimalNumber"
    min="0"
    max="9999.99"
    step="0.01"
    placeholder="0.00"
  />
  <div class="form-text">Enter price in USD (max $9,999.99)</div>
</div>

<!-- 스핀 버튼 스타일링 -->
<div class="mb-3">
  <label
    for="quantity"
    class="form-label"
    >Quantity</label
  >
  <div
    class="input-group"
    style="max-width: 200px;"
  >
    <button
      class="btn btn-outline-secondary"
      type="button"
      onclick="decreaseValue('quantity')"
    >
      -
    </button>
    <input
      type="number"
      class="form-control text-center"
      id="quantity"
      min="1"
      max="99"
      value="1"
      readonly
    />
    <button
      class="btn btn-outline-secondary"
      type="button"
      onclick="increaseValue('quantity')"
    >
      +
    </button>
  </div>
</div>
```

---

### Date/Time Component

**Date/Time 사용 지침**

1. 적절한 `min`, `max` 속성으로 유효한 날짜 범위 설정
2. 시간 입력시 `step` 속성으로 분 단위 간격 조절 (예: step="900" = 15분)
3. 비즈니스 로직에 따른 제한사항을 도움말 텍스트로 명시
4. 브라우저 호환성을 위해 폴백 UI 고려

```html
<!-- 기본 날짜 -->
<div class="mb-3">
  <label
    for="birthDate"
    class="form-label"
    >Birth Date</label
  >
  <input
    type="date"
    class="form-control"
    id="birthDate"
    min="1900-01-01"
    max="2024-12-31"
  />
</div>

<!-- 시간 -->
<div class="mb-3">
  <label
    for="meetingTime"
    class="form-label"
    >Meeting Time</label
  >
  <input
    type="time"
    class="form-control"
    id="meetingTime"
    min="09:00"
    max="18:00"
    step="900"
  />
  <div class="form-text">Business hours: 9:00 AM - 6:00 PM (15-minute intervals)</div>
</div>

<!-- 날짜와 시간 -->
<div class="mb-3">
  <label
    for="appointment"
    class="form-label"
    >Appointment</label
  >
  <input
    type="datetime-local"
    class="form-control"
    id="appointment"
  />
</div>

<!-- 월 선택 -->
<div class="mb-3">
  <label
    for="reportMonth"
    class="form-label"
    >Report Month</label
  >
  <input
    type="month"
    class="form-control"
    id="reportMonth"
  />
</div>
```
