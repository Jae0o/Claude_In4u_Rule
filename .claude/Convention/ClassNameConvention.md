# **Class Naming Convention 🎨**

코드의 일관성과 유지보수성을 높이기 위해, BEM 방법론을 우리 팀에 맞게 수정한 Custom 규칙

### **1. 기본 구조**

클래스 네임은 **Header, Block, Element, Modifier** 4가지 요소를 조합하여 구성.

각 부분은 `__` (언더스코어 2개)로 연결하고, Modifier는 \_(언더스코어 1개)로 구분

```tsx
<div className="Header__Block__Element_Modifier" />
```

### **2. 구성 요소 정의**

- **`Header` (페이지 / 최상위 컴포넌트)**
  - **역할**: 페이지 또는 기능의 가장 큰 단위 컨테이너를 의미하며, 스타일 충돌을 방지하는 접두사(prefix) 역할
  - **예시**: `login`, `signup`, `navbar`, `product-detail`
- **`Block` (기능 블록)**
  - **역할:** `Header` 내에서 특정 역할을 수행하는 논리적인 UI 단위
  - **규칙 :** 반드시 **`Block`** 앞 `__` (언더스코어 2개 ) 추가
  - **예시:** `login__form`, `navbar__menu`, `product-detail__gallery`
- **`Element` (하위 요소)**
  - **역할**: `Block`을 구성하는 작은 부품이며, **Element 안에 또 다른 Element를 중첩하여 정의하지 않음**
  - **규칙 :** 반드시 **`Element`** 앞 `__` (언더스코어 2개 ) 추가
  - **예시**: `login__form__input`, `navbar__menu__item`, `product-detail__gallery__image`
- **`Modifier` (요소의 형태/타입)**
  - **역할**: Element가 어떤 형태(예: 버튼, 박스, 텍스트)로 보이는지 구체적인 시각적 타입을 정의합니다.
  - **규칙 :** 반드시 **`Modifier`** 앞 `_` (언더스코어 1개 ) 추가
  - **예시**: `...--text`, `...--button`, `...--box`

### **3. 적용 예시 (React)**

아래 예시는 `navbar`라는 **Header** 안에 `menu`라는 **Block**이 있고, 그 안에 여러 **Element**들이 포함된 구조.

Element들은 역할에 따라 `item`, `profile-button` 등으로 구체적으로 명명

```tsx
const Navbar = () => {
  return (
    // Header: navbar
    <nav className="navbar">
      {/* Block: menu */}
      <ul className="navbar__menu">
        {/* Element: item */}
        <li className="navbar__menu__item">
          {/* Element: profile-button (역할 기반 이름) */}
          <button className="navbar__menu__profile_button">Profile</button>
        </li>

        <li className="navbar__menu__item">
          {/* Element: notification-button */}
          <button className="navbar__menu__notification_button">Alerts</button>
        </li>

        <li className="navbar__menu__item">
          {/* Element: logout-button */}
          <button className="navbar__menu__logout_button">Logout</button>
        </li>
      </ul>
    </nav>
  );
};
```

### **4. 핵심 원칙**

1. **계층 구조 준수**: 클래스 이름은 항상 `Header__Block__Element` 순서를 따름
2. **평평한 Element 구조**: `...__item__button` 과 같이 Element를 중첩하지 않으며, `item`과 `button`은 모두 `menu`라는 Block에 속한 동등한 Element
3. **역할 중심적 이름**: `<button>` 태그라고 해서 `...__button`으로 짓는 것이 아니라, `profile_button`처럼 **역할과 기능**이 드러나도록 이름을 지음

---
