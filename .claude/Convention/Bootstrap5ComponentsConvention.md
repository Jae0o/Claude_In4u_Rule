# BootStrap5 Component Guide

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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- 다른 내용 -->
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- 페이지 내용 -->
    
    <!-- Bootstrap JS (body 끝부분에 배치) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

## BootStrap5 Component 핵심 원칙

1. **계획 설계 : UI 적용 과정에서는 반드시 적용 계획을 세우고 제안 후 적용**
2. **재사용성 확인 : 기존에 구현된 동일/유사한 컴포넌트가 있는지 확인하여 코드 재사용성을 높임**
3. **컴포넌트 무결성 유지**: Bootstrap에서 제공하는 기본 구조를 변경하지 않고 활용
4. **데이터 속성 활용**: JavaScript 초기화보다 `data-bs-*` 속성 우선 사용
5. **중첩 금지**: 동일한 성격의 컴포넌트는 중첩하지 않음 (예: 모달 안에 모달)
6. **상태 관리**: `active`, `disabled`, `show` 등 Bootstrap 상태 클래스 활용
7. **일관된 패턴**: 유사한 기능은 동일한 컴포넌트로 구현
8. **성능 최적화**: 불필요한 컴포넌트 로딩 방지, 커스텀 빌드 고려
9. **접근성 준수**: `aria-*` 속성과 Bootstrap의 접근성 기능 활용

---

## BootStrap5 Components 별 지침

### Alert Component

**Alert 사용 지침**

1. 항상 `role="alert"` 속성 추가로 접근성 확보
2. 해제 가능한 알럿에는 반드시 `alert-dismissible fade show` 클래스 조합 사용
3. 알럿 내부 링크는 `alert-link` 클래스로 스타일 통일

```html
<!-- 기본 알럿 -->
<div class="alert alert-primary" role="alert">
    기본 정보 메시지입니다.
</div>

<!-- 해제 가능한 알럿 -->
<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>주의!</strong> 중요한 경고 메시지입니다.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

<!-- 링크가 포함된 알럿 -->
<div class="alert alert-info" role="alert">
    정보를 확인하려면 <a href="#" class="alert-link">여기를 클릭</a>하세요.
</div>
```

---

### Button Component

**Button 사용 지침**

1. 버튼 그룹은 반드시 `role="group"`과 `aria-label` 속성 포함
2. 분할 드롭다운 버튼에는 `visually-hidden` 텍스트로 접근성 확보
3. 로딩 상태는 `disabled` 속성과 함께 스피너 아이콘 추가

```html
<!-- 기본 버튼 -->
<button type="button" class="btn btn-primary">Primary Button</button>
<button type="button" class="btn btn-outline-secondary">Outline Button</button>

<!-- 버튼 그룹 -->
<div class="btn-group" role="group" aria-label="Button group example">
    <button type="button" class="btn btn-outline-primary">Left</button>
    <button type="button" class="btn btn-outline-primary">Middle</button>
    <button type="button" class="btn btn-outline-primary">Right</button>
</div>

<!-- 드롭다운 버튼 -->
<div class="btn-group">
    <button type="button" class="btn btn-danger">Action</button>
    <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">
        <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
    </ul>
</div>
```

---

### Card Component

**Card 사용 지침**

1. 카드 내 이미지는 반드시 적절한 `alt` 속성 포함
2. 카드 제목은 `card-title` 클래스 사용하여 일관성 유지

```html
<!-- 표준 카드 구조 -->
<div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>

<!-- 헤더와 푸터가 있는 카드 -->
<div class="card">
    <div class="card-header">
        <h6 class="card-subtitle mb-0 text-muted">Card Header</h6>
    </div>
    <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">Content goes here.</p>
    </div>
    <div class="card-footer text-muted">
        <small>Last updated 3 mins ago</small>
    </div>
</div>

<!-- 카드 그룹 -->
<div class="card-group">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Card 1</h5>
            <p class="card-text">Content for card 1.</p>
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Card 2</h5>
            <p class="card-text">Content for card 2.</p>
        </div>
    </div>
</div>
```

---

### Modal Component

**Modal 사용 지침**

1. 모달은 반드시 `tabindex="-1"`, `aria-labelledby`, `aria-hidden` 속성 포함
2. 모달 제목과 `aria-labelledby` 속성의 ID 값 일치시키기
3. ESC 키로 닫기 기능은 기본 제공되므로 별도 구현 불필요
4. 중첩 모달은 지원하지 않으므로 사용 금지

```html
<!-- 모달 트리거 버튼 -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch Modal
</button>

<!-- 모달 구조 -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Modal content goes here...</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>

<!-- 크기별 모달 -->
<div class="modal fade" id="smallModal">
    <div class="modal-dialog modal-sm">
        <!-- 작은 모달: modal-sm -->
    </div>
</div>

<div class="modal fade" id="largeModal">
    <div class="modal-dialog modal-lg">
        <!-- 큰 모달: modal-lg, modal-xl -->
    </div>
</div>
```

---

### Dropdown Component

**Dropdown 사용 지침**

1. 드롭다운 버튼은 항상 `aria-expanded="false"` 속성 포함
2. 구분선은 `<hr class="dropdown-divider">` 사용
3. 네비게이션 내 드롭다운은 `nav-item dropdown` 구조 준수
4. 자동 닫기 기능이 필요 없으면 `data-bs-auto-close="false"` 추가

```html
<!-- 기본 드롭다운 -->
<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown button
    </button>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
</div>

<!-- 방향별 드롭다운 -->
<div class="btn-group dropup">
    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
        Dropup
    </button>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
    </ul>
</div>

<!-- 네비게이션 드롭다운 -->
<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
        Dropdown
    </a>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
    </ul>
</li>
```

---

### Toast Component

Toast 사용 지침

1. Toast는 반드시 `role="alert"`, `aria-live="assertive"`, `aria-atomic="true"` 속성 포함
2. 컨테이너는 `toast-container` 클래스로 위치 설정
3. JavaScript로 수동 초기화 필요: `new bootstrap.Toast(element)`
4. 접근성을 위해 중요한 알림은 `aria-live="assertive"` 사용
