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
export declare class UIElement {
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
    protected _children: UIElement[];
    protected _rawProps: Map<string, string | number>;
    protected _templateParams: Map<string, string>;
    constructor(elementType: string, props?: ElementProps);
    template(templateRef: string): this;
    text(value: string): this;
    anchor(props: AnchorProps): this;
    padding(props: PaddingProps): this;
    background(props: BackgroundProps): this;
    style(props: StyleProps): this;
    layoutMode(mode: LayoutMode): this;
    visible(value: boolean): this;
    flexWeight(value: number): this;
    children(...elements: UIElement[]): this;
    raw(property: string, value: string | number): this;
    param(name: string, value: string): this;
    build(indent?: number): string;
}
export declare class UIBuilder {
    private _imports;
    private _roots;
    import(alias: string, path: string): this;
    root(element: UIElement): this;
    roots(...elements: UIElement[]): this;
    build(): string;
}
export declare function group(props?: ElementProps): UIElement;
export declare function label(props?: ElementProps): UIElement;
export declare function textButton(props?: ElementProps): UIElement;
export declare function button(props?: ElementProps): UIElement;
export declare function textField(props?: ElementProps): UIElement;
export declare function sprite(props?: ElementProps): UIElement;
export declare function checkbox(props?: ElementProps): UIElement;
export declare function slider(props?: ElementProps): UIElement;
export declare function progressBar(props?: ElementProps): UIElement;
export declare function backButton(): UIElement;
export declare function timerLabel(props?: ElementProps): UIElement;
export declare function multilineTextField(props?: ElementProps): UIElement;
export declare function compactTextField(props?: ElementProps): UIElement;
export declare function numberField(props?: ElementProps): UIElement;
export declare function dropdownBox(props?: ElementProps): UIElement;
export declare function colorPicker(props?: ElementProps): UIElement;
export declare function assetImage(props?: ElementProps): UIElement;
export declare function itemSlot(props?: ElementProps): UIElement;
export declare function itemIcon(props?: ElementProps): UIElement;
export declare function itemGrid(props?: ElementProps): UIElement;
export declare function itemSlotButton(props?: ElementProps): UIElement;
//# sourceMappingURL=ui-builder.d.ts.map