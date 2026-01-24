function formatStructuredValue(props) {
    const parts = [];
    for (const [key, value] of Object.entries(props)) {
        if (value !== undefined) {
            const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
            parts.push(`${capitalizedKey}: ${value}`);
        }
    }
    return `(${parts.join(", ")})`;
}
function formatAnchor(anchor) {
    const props = {};
    if (anchor.full !== undefined)
        props.Full = anchor.full;
    if (anchor.horizontal !== undefined)
        props.Horizontal = anchor.horizontal;
    if (anchor.vertical !== undefined)
        props.Vertical = anchor.vertical;
    if (anchor.width !== undefined)
        props.Width = anchor.width;
    if (anchor.height !== undefined)
        props.Height = anchor.height;
    if (anchor.top !== undefined)
        props.Top = anchor.top;
    if (anchor.bottom !== undefined)
        props.Bottom = anchor.bottom;
    if (anchor.left !== undefined)
        props.Left = anchor.left;
    if (anchor.right !== undefined)
        props.Right = anchor.right;
    if (anchor.minWidth !== undefined)
        props.MinWidth = anchor.minWidth;
    if (anchor.maxWidth !== undefined)
        props.MaxWidth = anchor.maxWidth;
    return `(${Object.entries(props)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ")})`;
}
function formatPadding(padding) {
    const props = {};
    if (padding.full !== undefined)
        props.Full = padding.full;
    if (padding.horizontal !== undefined)
        props.Horizontal = padding.horizontal;
    if (padding.vertical !== undefined)
        props.Vertical = padding.vertical;
    if (padding.top !== undefined)
        props.Top = padding.top;
    if (padding.bottom !== undefined)
        props.Bottom = padding.bottom;
    if (padding.left !== undefined)
        props.Left = padding.left;
    if (padding.right !== undefined)
        props.Right = padding.right;
    return `(${Object.entries(props)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ")})`;
}
function formatBackground(bg) {
    const props = [];
    if (bg.color !== undefined) {
        if (bg.opacity !== undefined) {
            props.push(`Color: ${bg.color}(${bg.opacity})`);
        }
        else {
            props.push(`Color: ${bg.color}`);
        }
    }
    if (bg.texturePath !== undefined) {
        props.push(`TexturePath: "${bg.texturePath}"`);
    }
    if (bg.border !== undefined) {
        props.push(`Border: ${bg.border}`);
    }
    if (bg.horizontalBorder !== undefined) {
        props.push(`HorizontalBorder: ${bg.horizontalBorder}`);
    }
    if (bg.verticalBorder !== undefined) {
        props.push(`VerticalBorder: ${bg.verticalBorder}`);
    }
    return `(${props.join(", ")})`;
}
function formatStyle(style) {
    const props = [];
    if (style.fontSize !== undefined)
        props.push(`FontSize: ${style.fontSize}`);
    if (style.textColor !== undefined)
        props.push(`TextColor: ${style.textColor}`);
    if (style.renderBold !== undefined)
        props.push(`RenderBold: ${style.renderBold}`);
    if (style.renderUppercase !== undefined)
        props.push(`RenderUppercase: ${style.renderUppercase}`);
    if (style.horizontalAlignment !== undefined)
        props.push(`HorizontalAlignment: ${style.horizontalAlignment}`);
    if (style.verticalAlignment !== undefined)
        props.push(`VerticalAlignment: ${style.verticalAlignment}`);
    if (style.letterSpacing !== undefined)
        props.push(`LetterSpacing: ${style.letterSpacing}`);
    if (style.wrap !== undefined)
        props.push(`Wrap: ${style.wrap}`);
    if (style.fontName !== undefined)
        props.push(`FontName: "${style.fontName}"`);
    return `(${props.join(", ")})`;
}
export class UIElement {
    _elementType;
    _id;
    _template;
    _isSlot = false;
    _text;
    _placeholder;
    _texturePath;
    _value;
    _min;
    _max;
    _anchor;
    _padding;
    _background;
    _style;
    _layoutMode;
    _visible;
    _flexWeight;
    _children = [];
    _rawProps = new Map();
    _templateParams = new Map();
    constructor(elementType, props) {
        this._elementType = elementType;
        if (props) {
            this._id = props.id;
            this._text = props.text;
            this._placeholder = props.placeholder;
            this._texturePath = props.texturePath;
            this._value = props.value;
            this._min = props.min;
            this._max = props.max;
        }
    }
    template(templateRef) {
        this._template = templateRef;
        return this;
    }
    text(value) {
        this._text = value;
        return this;
    }
    anchor(props) {
        this._anchor = props;
        return this;
    }
    padding(props) {
        this._padding = props;
        return this;
    }
    background(props) {
        this._background = props;
        return this;
    }
    style(props) {
        this._style = props;
        return this;
    }
    layoutMode(mode) {
        this._layoutMode = mode;
        return this;
    }
    visible(value) {
        this._visible = value;
        return this;
    }
    flexWeight(value) {
        this._flexWeight = value;
        return this;
    }
    children(...elements) {
        this._children = elements;
        return this;
    }
    raw(property, value) {
        this._rawProps.set(property, value);
        return this;
    }
    param(name, value) {
        this._templateParams.set(name, value);
        return this;
    }
    build(indent = 0) {
        const indentStr = "  ".repeat(indent);
        const childIndent = "  ".repeat(indent + 1);
        const lines = [];
        let elementHeader;
        if (this._isSlot && this._id) {
            elementHeader = `#${this._id}`;
        }
        else if (this._template) {
            elementHeader = `${this._template}${this._id ? ` #${this._id}` : ""}`;
        }
        else {
            elementHeader = `${this._elementType}${this._id ? ` #${this._id}` : ""}`;
        }
        lines.push(`${indentStr}${elementHeader} {`);
        for (const [paramName, paramValue] of this._templateParams) {
            lines.push(`${childIndent}@${paramName} = ${paramValue};`);
        }
        if (this._text !== undefined) {
            lines.push(`${childIndent}Text: "${this._text}";`);
        }
        if (this._placeholder !== undefined) {
            lines.push(`${childIndent}PlaceholderText: "${this._placeholder}";`);
        }
        if (this._texturePath !== undefined) {
            lines.push(`${childIndent}TexturePath: "${this._texturePath}";`);
        }
        if (this._value !== undefined) {
            lines.push(`${childIndent}Value: ${this._value};`);
        }
        if (this._min !== undefined) {
            lines.push(`${childIndent}Min: ${this._min};`);
        }
        if (this._max !== undefined) {
            lines.push(`${childIndent}Max: ${this._max};`);
        }
        if (this._anchor) {
            lines.push(`${childIndent}Anchor: ${formatAnchor(this._anchor)};`);
        }
        if (this._layoutMode) {
            lines.push(`${childIndent}LayoutMode: ${this._layoutMode};`);
        }
        if (this._background) {
            lines.push(`${childIndent}Background: ${formatBackground(this._background)};`);
        }
        if (this._padding) {
            lines.push(`${childIndent}Padding: ${formatPadding(this._padding)};`);
        }
        if (this._style) {
            lines.push(`${childIndent}Style: ${formatStyle(this._style)};`);
        }
        if (this._visible !== undefined) {
            lines.push(`${childIndent}Visible: ${this._visible};`);
        }
        if (this._flexWeight !== undefined) {
            lines.push(`${childIndent}FlexWeight: ${this._flexWeight};`);
        }
        for (const [prop, val] of this._rawProps) {
            lines.push(`${childIndent}${prop}: ${val};`);
        }
        for (const child of this._children) {
            lines.push(child.build(indent + 1));
        }
        lines.push(`${indentStr}}`);
        return lines.join("\n");
    }
}
export class UIBuilder {
    _imports = new Map();
    _roots = [];
    import(alias, path) {
        this._imports.set(alias, path);
        return this;
    }
    root(element) {
        this._roots = [element];
        return this;
    }
    roots(...elements) {
        this._roots = elements;
        return this;
    }
    build() {
        const parts = [];
        if (this._imports.size > 0) {
            const importLines = [];
            for (const [alias, path] of this._imports) {
                importLines.push(`$${alias} = "${path}";`);
            }
            parts.push(importLines.join("\n"));
            parts.push("");
        }
        for (const root of this._roots) {
            parts.push(root.build(0));
        }
        return parts.join("\n");
    }
}
export function group(props) {
    return new UIElement("Group", props);
}
class SlotElement extends UIElement {
    constructor(id) {
        super("", { id });
        this._isSlot = true;
    }
}
export function slot(id) {
    return new SlotElement(id);
}
export function label(props) {
    return new UIElement("Label", props);
}
export function textButton(props) {
    return new UIElement("TextButton", props);
}
export function button(props) {
    return new UIElement("Button", props);
}
export function textField(props) {
    return new UIElement("TextField", props);
}
export function sprite(props) {
    return new UIElement("Sprite", props);
}
export function checkbox(props) {
    return new UIElement("CheckBox", props);
}
export function slider(props) {
    return new UIElement("Slider", props);
}
export function progressBar(props) {
    return new UIElement("ProgressBar", props);
}
export function backButton() {
    return new UIElement("BackButton");
}
export function timerLabel(props) {
    return new UIElement("TimerLabel", props);
}
export function multilineTextField(props) {
    return new UIElement("MultilineTextField", props);
}
export function compactTextField(props) {
    return new UIElement("CompactTextField", props);
}
export function numberField(props) {
    return new UIElement("NumberField", props);
}
export function dropdownBox(props) {
    return new UIElement("DropdownBox", props);
}
export function colorPicker(props) {
    return new UIElement("ColorPicker", props);
}
export function assetImage(props) {
    return new UIElement("AssetImage", props);
}
export function itemSlot(props) {
    return new UIElement("ItemSlot", props);
}
export function itemIcon(props) {
    return new UIElement("ItemIcon", props);
}
export function itemGrid(props) {
    return new UIElement("ItemGrid", props);
}
export function itemSlotButton(props) {
    return new UIElement("ItemSlotButton", props);
}
