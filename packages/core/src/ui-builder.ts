export type LayoutMode = "Top" | "TopScrolling" | "Left" | "Right" | "Center" | "Middle" | "CenterMiddle" | "Full" | "LeftCenterWrap";

export type HorizontalAlignment = "Start" | "Center" | "End";
export type VerticalAlignment = "Top" | "Center" | "Bottom";

export interface AnchorProps {
  width?: number;
  height?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  full?: number;
  horizontal?: number;
  vertical?: number;
  minWidth?: number;
  maxWidth?: number;
}

export interface PaddingProps {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  full?: number;
  horizontal?: number;
  vertical?: number;
}

export interface BackgroundProps {
  color?: string;
  opacity?: number;
  texturePath?: string;
  border?: number;
  horizontalBorder?: number;
  verticalBorder?: number;
}

export interface StyleProps {
  fontSize?: number;
  textColor?: string;
  renderBold?: boolean;
  renderUppercase?: boolean;
  horizontalAlignment?: HorizontalAlignment;
  verticalAlignment?: VerticalAlignment;
  letterSpacing?: number;
  wrap?: boolean;
  fontName?: string;
}

export interface ElementProps {
  id?: string;
  text?: string;
  placeholder?: string;
  texturePath?: string;
  value?: boolean | number;
  min?: number;
  max?: number;
}

function formatStructuredValue(props: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined) {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      parts.push(`${capitalizedKey}: ${value}`);
    }
  }
  return `(${parts.join(", ")})`;
}

function formatAnchor(anchor: AnchorProps): string {
  const props: Record<string, unknown> = {};
  if (anchor.full !== undefined) props.Full = anchor.full;
  if (anchor.horizontal !== undefined) props.Horizontal = anchor.horizontal;
  if (anchor.vertical !== undefined) props.Vertical = anchor.vertical;
  if (anchor.width !== undefined) props.Width = anchor.width;
  if (anchor.height !== undefined) props.Height = anchor.height;
  if (anchor.top !== undefined) props.Top = anchor.top;
  if (anchor.bottom !== undefined) props.Bottom = anchor.bottom;
  if (anchor.left !== undefined) props.Left = anchor.left;
  if (anchor.right !== undefined) props.Right = anchor.right;
  if (anchor.minWidth !== undefined) props.MinWidth = anchor.minWidth;
  if (anchor.maxWidth !== undefined) props.MaxWidth = anchor.maxWidth;
  return `(${Object.entries(props)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ")})`;
}

function formatPadding(padding: PaddingProps): string {
  const props: Record<string, unknown> = {};
  if (padding.full !== undefined) props.Full = padding.full;
  if (padding.horizontal !== undefined) props.Horizontal = padding.horizontal;
  if (padding.vertical !== undefined) props.Vertical = padding.vertical;
  if (padding.top !== undefined) props.Top = padding.top;
  if (padding.bottom !== undefined) props.Bottom = padding.bottom;
  if (padding.left !== undefined) props.Left = padding.left;
  if (padding.right !== undefined) props.Right = padding.right;
  return `(${Object.entries(props)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ")})`;
}

function formatBackground(bg: BackgroundProps): string {
  const props: string[] = [];
  if (bg.color !== undefined) {
    if (bg.opacity !== undefined) {
      props.push(`Color: ${bg.color}(${bg.opacity})`);
    } else {
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

function formatStyle(style: StyleProps): string {
  const props: string[] = [];
  if (style.fontSize !== undefined) props.push(`FontSize: ${style.fontSize}`);
  if (style.textColor !== undefined) props.push(`TextColor: ${style.textColor}`);
  if (style.renderBold !== undefined) props.push(`RenderBold: ${style.renderBold}`);
  if (style.renderUppercase !== undefined) props.push(`RenderUppercase: ${style.renderUppercase}`);
  if (style.horizontalAlignment !== undefined) props.push(`HorizontalAlignment: ${style.horizontalAlignment}`);
  if (style.verticalAlignment !== undefined) props.push(`VerticalAlignment: ${style.verticalAlignment}`);
  if (style.letterSpacing !== undefined) props.push(`LetterSpacing: ${style.letterSpacing}`);
  if (style.wrap !== undefined) props.push(`Wrap: ${style.wrap}`);
  if (style.fontName !== undefined) props.push(`FontName: "${style.fontName}"`);
  return `(${props.join(", ")})`;
}

export class UIElement {
  protected _elementType: string;
  protected _id?: string;
  protected _template?: string;
  protected _text?: string;
  protected _placeholder?: string;
  protected _texturePath?: string;
  protected _value?: boolean | number;
  protected _min?: number;
  protected _max?: number;
  protected _anchor?: AnchorProps;
  protected _padding?: PaddingProps;
  protected _background?: BackgroundProps;
  protected _style?: StyleProps;
  protected _layoutMode?: LayoutMode;
  protected _visible?: boolean;
  protected _flexWeight?: number;
  protected _children: UIElement[] = [];
  protected _rawProps: Map<string, string | number> = new Map();
  protected _templateParams: Map<string, string> = new Map();

  constructor(elementType: string, props?: ElementProps) {
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

  template(templateRef: string): this {
    this._template = templateRef;
    return this;
  }

  text(value: string): this {
    this._text = value;
    return this;
  }

  anchor(props: AnchorProps): this {
    this._anchor = props;
    return this;
  }

  padding(props: PaddingProps): this {
    this._padding = props;
    return this;
  }

  background(props: BackgroundProps): this {
    this._background = props;
    return this;
  }

  style(props: StyleProps): this {
    this._style = props;
    return this;
  }

  layoutMode(mode: LayoutMode): this {
    this._layoutMode = mode;
    return this;
  }

  visible(value: boolean): this {
    this._visible = value;
    return this;
  }

  flexWeight(value: number): this {
    this._flexWeight = value;
    return this;
  }

  children(...elements: UIElement[]): this {
    this._children = elements;
    return this;
  }

  raw(property: string, value: string | number): this {
    this._rawProps.set(property, value);
    return this;
  }

  param(name: string, value: string): this {
    this._templateParams.set(name, value);
    return this;
  }

  build(indent: number = 0): string {
    const indentStr = "  ".repeat(indent);
    const childIndent = "  ".repeat(indent + 1);
    const lines: string[] = [];

    const elementHeader = this._template ? `${this._template}${this._id ? ` #${this._id}` : ""}` : `${this._elementType}${this._id ? ` #${this._id}` : ""}`;

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
  private _imports: Map<string, string> = new Map();
  private _roots: UIElement[] = [];

  import(alias: string, path: string): this {
    this._imports.set(alias, path);
    return this;
  }

  root(element: UIElement): this {
    this._roots = [element];
    return this;
  }

  roots(...elements: UIElement[]): this {
    this._roots = elements;
    return this;
  }

  build(): string {
    const parts: string[] = [];

    if (this._imports.size > 0) {
      const importLines: string[] = [];
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

export function group(props?: ElementProps): UIElement {
  return new UIElement("Group", props);
}

export function label(props?: ElementProps): UIElement {
  return new UIElement("Label", props);
}

export function textButton(props?: ElementProps): UIElement {
  return new UIElement("TextButton", props);
}

export function button(props?: ElementProps): UIElement {
  return new UIElement("Button", props);
}

export function textField(props?: ElementProps): UIElement {
  return new UIElement("TextField", props);
}

export function sprite(props?: ElementProps): UIElement {
  return new UIElement("Sprite", props);
}

export function checkbox(props?: ElementProps): UIElement {
  return new UIElement("CheckBox", props);
}

export function slider(props?: ElementProps): UIElement {
  return new UIElement("Slider", props);
}

export function progressBar(props?: ElementProps): UIElement {
  return new UIElement("ProgressBar", props);
}

export function backButton(): UIElement {
  return new UIElement("BackButton");
}

export function timerLabel(props?: ElementProps): UIElement {
  return new UIElement("TimerLabel", props);
}

export function multilineTextField(props?: ElementProps): UIElement {
  return new UIElement("MultilineTextField", props);
}

export function compactTextField(props?: ElementProps): UIElement {
  return new UIElement("CompactTextField", props);
}

export function numberField(props?: ElementProps): UIElement {
  return new UIElement("NumberField", props);
}

export function dropdownBox(props?: ElementProps): UIElement {
  return new UIElement("DropdownBox", props);
}

export function colorPicker(props?: ElementProps): UIElement {
  return new UIElement("ColorPicker", props);
}

export function assetImage(props?: ElementProps): UIElement {
  return new UIElement("AssetImage", props);
}

export function itemSlot(props?: ElementProps): UIElement {
  return new UIElement("ItemSlot", props);
}

export function itemIcon(props?: ElementProps): UIElement {
  return new UIElement("ItemIcon", props);
}

export function itemGrid(props?: ElementProps): UIElement {
  return new UIElement("ItemGrid", props);
}

export function itemSlotButton(props?: ElementProps): UIElement {
  return new UIElement("ItemSlotButton", props);
}
