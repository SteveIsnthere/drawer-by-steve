# Drawer by Steve

The drawer for the rest of us.

## Installation

```bash
npm install drawer-by-steve
```

## Usage

```javascript
import { DBS } from 'drawer-by-steve';
// DBS stands for Drawer By Steve, giggity

<DBS open={isOpen}
     onClose={() => setIsOpen(false)}
     title="Drawer Title">
    <div>Drawer content goes here</div>
</DBS>
```