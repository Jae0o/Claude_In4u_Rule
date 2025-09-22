# CSS theme Guide

## CSS theme Core Principles

### 1. Centralized Variable Management

- **Required**: All theme-related CSS variables must be defined and managed exclusively in the `theme.css` file
- **Prohibited**: Direct definition of theme variables in other CSS files is forbidden
- **Usage**: Other files should only reference variables using `var(--variable-name)` format

### 2. Change Approval Process

- **Prior Proposal**: Any addition/modification/deletion of variables in `theme.css` file requires prior proposal and approval request
- **No Unauthorized Changes**: Arbitrary changes to theme variables without approval are strictly prohibited
- **Documentation**: After approval, all changes must be documented with reasons for the changes

---

## Workflow

### 1. Variable Addition/Modification Process

1. **Current State Analysis**: Review existing `theme.css` file
2. **Change Proposal**: Specify variables to be added/modified and provide justification
3. **Approval Pending**: Wait until change approval is received
4. **Apply After Approval**: Apply only the approved content accurately
5. **Documentation**: Record change history as comments

### 2. Variable Usage Guidelines

```scss
/* ✅ Correct Usage */
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
}

/* ❌ Incorrect Usage */
.button {
  background-color: #3498db; /* Hard-coding prohibited */
  --custom-color: #red; /* Variable definition outside theme file prohibited */
}
```

---

## Maintenance and Validation

### 1. Code Validation Checklist

- [ ] Are all colors defined as CSS variables?
- [ ] Are there any hard-coded values?
- [ ] Does it follow naming conventions?
- [ ] Does it work properly in both dark/light themes?
- [ ] Does it comply with accessibility guidelines? (contrast ratios, etc.)

### 2. Prohibited Actions

- Defining CSS variables outside of `theme.css`
- Using hard-coded color values
- Changing theme variables without approval
- Inconsistent naming
- Duplicate variable definitions

### 3. Exception Handling

- **Emergency Fixes**: Even for critical bug fixes, report immediately after changes
- **Legacy Code**: Propose modifications when hard-coded values are found in existing code

### 4. Comment Writing Guidelines

```scss
*/**
 * Variable: --color-primary
 * Usage: Main brand color, used for buttons and links
 * Added: 2025-09-22
 * Change History:
 *   - 2025-09-22: Initial creation (Reason: Brand guideline implementation)
 **/*
--color-primary: #3498db;
```
