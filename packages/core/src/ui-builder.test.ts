import { describe, it, expect } from "vitest";
import { UIBuilder, group, label, textButton, button, textField, sprite, checkbox, slider, progressBar, slot } from "./ui-builder";

describe("UIBuilder", () => {
  describe("basic elements", () => {
    it("should create an empty group", () => {
      const ui = group().build();
      expect(ui).toBe("Group {\n}");
    });

    it("should create a group with id", () => {
      const ui = group({ id: "MyGroup" }).build();
      expect(ui).toBe("Group #MyGroup {\n}");
    });

    it("should create a label with text", () => {
      const ui = label({ text: "Hello World" }).build();
      expect(ui).toBe('Label {\n  Text: "Hello World";\n}');
    });

    it("should create a label with id and text", () => {
      const ui = label({ id: "Title", text: "Welcome" }).build();
      expect(ui).toBe('Label #Title {\n  Text: "Welcome";\n}');
    });

    it("should create a text button", () => {
      const ui = textButton({ text: "Click Me" }).build();
      expect(ui).toBe('TextButton {\n  Text: "Click Me";\n}');
    });

    it("should create a button with id", () => {
      const ui = button({ id: "IconBtn" }).build();
      expect(ui).toBe("Button #IconBtn {\n}");
    });

    it("should create a text field with placeholder", () => {
      const ui = textField({ placeholder: "Enter name..." }).build();
      expect(ui).toBe('TextField {\n  PlaceholderText: "Enter name...";\n}');
    });

    it("should create a sprite with texture path", () => {
      const ui = sprite({ texturePath: "Common/Icon.png" }).build();
      expect(ui).toBe('Sprite {\n  TexturePath: "Common/Icon.png";\n}');
    });

    it("should create a checkbox with value", () => {
      const ui = checkbox({ value: true }).build();
      expect(ui).toBe("CheckBox {\n  Value: true;\n}");
    });

    it("should create a slider with min/max/value", () => {
      const ui = slider({ min: 0, max: 100, value: 50 }).build();
      expect(ui).toContain("Min: 0;");
      expect(ui).toContain("Max: 100;");
      expect(ui).toContain("Value: 50;");
    });

    it("should create a progress bar with value", () => {
      const ui = progressBar({ value: 0.75 }).build();
      expect(ui).toBe("ProgressBar {\n  Value: 0.75;\n}");
    });
  });

  describe("nested elements", () => {
    it("should create nested groups", () => {
      const ui = group({ id: "Parent" })
        .children(group({ id: "Child" }))
        .build();
      expect(ui).toBe("Group #Parent {\n  Group #Child {\n  }\n}");
    });

    it("should create group with multiple children", () => {
      const ui = group({ id: "Container" })
        .children(label({ id: "Title", text: "Hello" }), label({ id: "Subtitle", text: "World" }))
        .build();
      expect(ui).toBe('Group #Container {\n  Label #Title {\n    Text: "Hello";\n  }\n  Label #Subtitle {\n    Text: "World";\n  }\n}');
    });

    it("should create deeply nested structures", () => {
      const ui = group({ id: "Root" })
        .children(group({ id: "Header" }).children(label({ text: "Title" })), group({ id: "Content" }).children(textButton({ text: "Submit" })))
        .build();
      expect(ui).toContain("Group #Root");
      expect(ui).toContain("Group #Header");
      expect(ui).toContain("Group #Content");
      expect(ui).toContain('Text: "Title"');
      expect(ui).toContain('Text: "Submit"');
    });
  });

  describe("anchor properties", () => {
    it("should set width and height", () => {
      const ui = group().anchor({ width: 100, height: 50 }).build();
      expect(ui).toBe("Group {\n  Anchor: (Width: 100, Height: 50);\n}");
    });

    it("should set position offsets", () => {
      const ui = group().anchor({ top: 10, left: 20, right: 30, bottom: 40 }).build();
      expect(ui).toContain("Anchor:");
      expect(ui).toContain("Top: 10");
      expect(ui).toContain("Left: 20");
      expect(ui).toContain("Right: 30");
      expect(ui).toContain("Bottom: 40");
    });

    it("should set full shorthand", () => {
      const ui = group().anchor({ full: 10 }).build();
      expect(ui).toBe("Group {\n  Anchor: (Full: 10);\n}");
    });

    it("should set horizontal and vertical shorthands", () => {
      const ui = group().anchor({ horizontal: 20, vertical: 10 }).build();
      expect(ui).toBe("Group {\n  Anchor: (Horizontal: 20, Vertical: 10);\n}");
    });

    it("should set min/max width", () => {
      const ui = group().anchor({ minWidth: 100, maxWidth: 500 }).build();
      expect(ui).toBe("Group {\n  Anchor: (MinWidth: 100, MaxWidth: 500);\n}");
    });
  });

  describe("layout mode", () => {
    it("should set layout mode Top", () => {
      const ui = group().layoutMode("Top").build();
      expect(ui).toBe("Group {\n  LayoutMode: Top;\n}");
    });

    it("should set layout mode Left", () => {
      const ui = group().layoutMode("Left").build();
      expect(ui).toBe("Group {\n  LayoutMode: Left;\n}");
    });

    it("should set layout mode Middle", () => {
      const ui = group().layoutMode("Middle").build();
      expect(ui).toBe("Group {\n  LayoutMode: Middle;\n}");
    });

    it("should set layout mode CenterMiddle", () => {
      const ui = group().layoutMode("CenterMiddle").build();
      expect(ui).toBe("Group {\n  LayoutMode: CenterMiddle;\n}");
    });
  });

  describe("padding", () => {
    it("should set full padding", () => {
      const ui = group().padding({ full: 16 }).build();
      expect(ui).toBe("Group {\n  Padding: (Full: 16);\n}");
    });

    it("should set directional padding", () => {
      const ui = group().padding({ top: 10, bottom: 20, left: 5, right: 15 }).build();
      expect(ui).toBe("Group {\n  Padding: (Top: 10, Bottom: 20, Left: 5, Right: 15);\n}");
    });

    it("should set horizontal and vertical padding", () => {
      const ui = group().padding({ horizontal: 20, vertical: 10 }).build();
      expect(ui).toBe("Group {\n  Padding: (Horizontal: 20, Vertical: 10);\n}");
    });
  });

  describe("background", () => {
    it("should set color background", () => {
      const ui = group().background({ color: "#1a2530" }).build();
      expect(ui).toBe("Group {\n  Background: (Color: #1a2530);\n}");
    });

    it("should set color background with opacity", () => {
      const ui = group().background({ color: "#0a0e14", opacity: 0.85 }).build();
      expect(ui).toBe("Group {\n  Background: (Color: #0a0e14(0.85));\n}");
    });

    it("should set texture background", () => {
      const ui = group().background({ texturePath: "Common/Panel.png" }).build();
      expect(ui).toBe('Group {\n  Background: (TexturePath: "Common/Panel.png");\n}');
    });

    it("should set texture background with border", () => {
      const ui = group().background({ texturePath: "Common/Panel.png", border: 16 }).build();
      expect(ui).toBe('Group {\n  Background: (TexturePath: "Common/Panel.png", Border: 16);\n}');
    });
  });

  describe("label style", () => {
    it("should set font size", () => {
      const ui = label({ text: "Title" }).style({ fontSize: 24 }).build();
      expect(ui).toBe('Label {\n  Text: "Title";\n  Style: (FontSize: 24);\n}');
    });

    it("should set text color", () => {
      const ui = label({ text: "Title" }).style({ textColor: "#FFFFFF" }).build();
      expect(ui).toBe('Label {\n  Text: "Title";\n  Style: (TextColor: #FFFFFF);\n}');
    });

    it("should set bold and uppercase", () => {
      const ui = label({ text: "Title" }).style({ renderBold: true, renderUppercase: true }).build();
      expect(ui).toBe('Label {\n  Text: "Title";\n  Style: (RenderBold: true, RenderUppercase: true);\n}');
    });

    it("should set alignment", () => {
      const ui = label({ text: "Title" }).style({ horizontalAlignment: "Center", verticalAlignment: "Center" }).build();
      expect(ui).toBe('Label {\n  Text: "Title";\n  Style: (HorizontalAlignment: Center, VerticalAlignment: Center);\n}');
    });

    it("should set multiple style properties", () => {
      const ui = label({ text: "Title" })
        .style({
          fontSize: 24,
          textColor: "#f5c542",
          renderBold: true,
          renderUppercase: true,
          horizontalAlignment: "Center",
        })
        .build();
      expect(ui).toContain("FontSize: 24");
      expect(ui).toContain("TextColor: #f5c542");
      expect(ui).toContain("RenderBold: true");
      expect(ui).toContain("RenderUppercase: true");
      expect(ui).toContain("HorizontalAlignment: Center");
    });
  });

  describe("visibility", () => {
    it("should set visible true", () => {
      const ui = group().visible(true).build();
      expect(ui).toBe("Group {\n  Visible: true;\n}");
    });

    it("should set visible false", () => {
      const ui = group().visible(false).build();
      expect(ui).toBe("Group {\n  Visible: false;\n}");
    });
  });

  describe("flex weight", () => {
    it("should set flex weight", () => {
      const ui = group().flexWeight(2).build();
      expect(ui).toBe("Group {\n  FlexWeight: 2;\n}");
    });
  });

  describe("imports", () => {
    it("should add single import", () => {
      const ui = new UIBuilder()
        .import("C", "../Common.ui")
        .root(group({ id: "Main" }))
        .build();
      expect(ui).toBe('$C = "../Common.ui";\n\nGroup #Main {\n}');
    });

    it("should add multiple imports", () => {
      const ui = new UIBuilder()
        .import("C", "../Common.ui")
        .import("Sounds", "../Sounds.ui")
        .root(group({ id: "Main" }))
        .build();
      expect(ui).toBe('$C = "../Common.ui";\n$Sounds = "../Sounds.ui";\n\nGroup #Main {\n}');
    });
  });

  describe("template references", () => {
    it("should use template reference", () => {
      const ui = new UIBuilder().import("C", "../Common.ui").root(group().template("$C.@PageOverlay")).build();
      expect(ui).toBe('$C = "../Common.ui";\n\n$C.@PageOverlay {\n}');
    });

    it("should use template with children", () => {
      const ui = new UIBuilder()
        .import("C", "../Common.ui")
        .root(
          group()
            .template("$C.@DecoratedContainer")
            .anchor({ width: 400 })
            .children(label({ id: "Title", text: "Hello" })),
        )
        .build();
      expect(ui).toContain("$C.@DecoratedContainer");
      expect(ui).toContain("Anchor: (Width: 400)");
      expect(ui).toContain("Label #Title");
    });
  });

  describe("complex real-world examples", () => {
    it("should create a scoreboard-like HUD", () => {
      const ui = new UIBuilder()
        .import("C", "../Common.ui")
        .root(
          group({ id: "Scoreboard" })
            .anchor({ right: 20, top: 100, width: 200, height: 170 })
            .layoutMode("Top")
            .background({ color: "#0a0e14", opacity: 0.85 })
            .padding({ full: 12 })
            .children(
              label({ id: "Title" })
                .style({
                  fontSize: 24,
                  textColor: "#f5c542",
                  renderBold: true,
                  renderUppercase: true,
                  horizontalAlignment: "Center",
                })
                .anchor({ height: 30 })
                .text("HytaleJS"),
              group({ id: "Separator1" }).anchor({ height: 1, top: 8 }).background({ color: "#2b3542" }),
              group({ id: "PlayerRow" })
                .layoutMode("Left")
                .anchor({ height: 22, top: 10 })
                .children(
                  label({ id: "PlayerLabel" }).style({ fontSize: 13, textColor: "#8a9aab", verticalAlignment: "Center" }).anchor({ width: 80 }).text("Player:"),
                  label({ id: "PlayerValue" }).style({ fontSize: 13, textColor: "#ffffff", verticalAlignment: "Center", renderBold: true }).flexWeight(1).text("Unknown"),
                ),
            ),
        )
        .build();

      expect(ui).toContain("Group #Scoreboard");
      expect(ui).toContain("Width: 200");
      expect(ui).toContain("Height: 170");
      expect(ui).toContain("Top: 100");
      expect(ui).toContain("Right: 20");
      expect(ui).toContain("LayoutMode: Top");
      expect(ui).toContain("Background: (Color: #0a0e14(0.85))");
      expect(ui).toContain("Padding: (Full: 12)");
      expect(ui).toContain("Label #Title");
      expect(ui).toContain("FontSize: 24");
      expect(ui).toContain("Group #PlayerRow");
      expect(ui).toContain("Label #PlayerLabel");
      expect(ui).toContain("Label #PlayerValue");
    });

    it("should create a page with template overlay", () => {
      const ui = new UIBuilder()
        .import("C", "../Common.ui")
        .import("Sounds", "../Sounds.ui")
        .root(
          group()
            .template("$C.@PageOverlay")
            .layoutMode("Middle")
            .children(
              group()
                .template("$C.@DecoratedContainer")
                .anchor({ width: 400 })
                .children(
                  group({ id: "Content" })
                    .padding({ vertical: 32, horizontal: 45 })
                    .children(
                      label({ id: "title" }).style({ renderBold: true, textColor: "#FFFFFF" }).text("Default Title"),
                      label({ id: "message" }).anchor({ top: 20 }).style({ textColor: "#94a7bb" }).text("Default Message"),
                      group()
                        .layoutMode("Center")
                        .anchor({ top: 30 })
                        .children(textButton({ id: "CloseButton", text: "Close" }).flexWeight(1)),
                    ),
                ),
            ),
        )
        .build();

      expect(ui).toContain('$C = "../Common.ui"');
      expect(ui).toContain('$Sounds = "../Sounds.ui"');
      expect(ui).toContain("$C.@PageOverlay");
      expect(ui).toContain("LayoutMode: Middle");
      expect(ui).toContain("$C.@DecoratedContainer");
      expect(ui).toContain("Anchor: (Width: 400)");
      expect(ui).toContain("Group #Content");
      expect(ui).toContain("Label #title");
      expect(ui).toContain("Label #message");
      expect(ui).toContain("TextButton #CloseButton");
    });
  });

  describe("text method for labels", () => {
    it("should set text via method", () => {
      const ui = label({ id: "Title" }).text("Hello").build();
      expect(ui).toBe('Label #Title {\n  Text: "Hello";\n}');
    });

    it("should override initial text", () => {
      const ui = label({ id: "Title", text: "Initial" }).text("Updated").build();
      expect(ui).toBe('Label #Title {\n  Text: "Updated";\n}');
    });
  });

  describe("raw property setting", () => {
    it("should set raw properties", () => {
      const ui = group().raw("CustomProperty", "value123").raw("NumericProp", 42).build();
      expect(ui).toBe("Group {\n  CustomProperty: value123;\n  NumericProp: 42;\n}");
    });
  });

  describe("back button template", () => {
    it("should create back button reference", () => {
      const ui = new UIBuilder()
        .import("C", "../Common.ui")
        .roots(
          group()
            .template("$C.@PageOverlay")
            .children(label({ text: "Content" })),
          group().template("$C.@BackButton"),
        )
        .build();
      expect(ui).toContain("$C.@PageOverlay");
      expect(ui).toContain("$C.@BackButton");
    });
  });

  describe("template parameters", () => {
    it("should set template parameter with string value", () => {
      const ui = group().template("$C.@TextButton").param("Text", '"Click Me"').build();
      expect(ui).toContain("$C.@TextButton");
      expect(ui).toContain('@Text = "Click Me";');
    });

    it("should set template parameter with reference value", () => {
      const ui = group().template("$C.@TextButton").param("Sounds", "$Sounds.@ButtonsCancel").build();
      expect(ui).toContain("@Sounds = $Sounds.@ButtonsCancel;");
    });

    it("should support multiple template parameters", () => {
      const ui = group().template("$C.@Title").param("Text", '"Example Page"').param("Color", "#FFFFFF").build();
      expect(ui).toContain('@Text = "Example Page";');
      expect(ui).toContain("@Color = #FFFFFF;");
    });
  });

  describe("slot references", () => {
    it("should create a slot reference with just #id", () => {
      const ui = slot("Title")
        .children(label({ text: "Hello" }))
        .build();
      expect(ui).toBe('#Title {\n  Label {\n    Text: "Hello";\n  }\n}');
    });

    it("should work with template slots in decorated container", () => {
      const ui = new UIBuilder()
        .import("C", "../Common.ui")
        .root(
          group()
            .template("$C.@DecoratedContainer")
            .children(
              slot("Title").children(group().template("$C.@Title").param("Text", '"My Page"')),
              slot("Content")
                .padding({ full: 20 })
                .children(label({ text: "Content here" })),
            ),
        )
        .build();
      expect(ui).toContain("#Title {");
      expect(ui).toContain("#Content {");
      expect(ui).toContain("Padding: (Full: 20)");
      expect(ui).not.toContain("Group #Title");
      expect(ui).not.toContain("Group #Content");
    });
  });
});
