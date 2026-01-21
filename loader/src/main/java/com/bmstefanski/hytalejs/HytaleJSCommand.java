package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.Message;
import com.hypixel.hytale.server.core.command.system.CommandContext;
import com.hypixel.hytale.server.core.command.system.basecommands.CommandBase;

import javax.annotation.Nonnull;

public class HytaleJSCommand extends CommandBase {
  private final HytaleJS plugin;

  private static final String COLOR_HEADER = "#5DADE2";
  private static final String COLOR_ACCENT = "#A569BD";
  private static final String COLOR_LABEL = "#AEB6BF";
  private static final String COLOR_VALUE = "#F8F9F9";
  private static final String COLOR_SUCCESS = "#52BE80";
  private static final String COLOR_WARNING = "#F39C12";
  private static final String COLOR_COMMAND = "#85C1E9";
  private static final String COLOR_DESC = "#99A3A4";

  public HytaleJSCommand(HytaleJS plugin) {
    super("hytalejs", "HytaleJS plugin management commands");
    this.plugin = plugin;
    setAllowsExtraArguments(true);
  }

  @Override
  protected void executeSync(@Nonnull CommandContext context) {
    String input = context.getInputString();
    String[] parts = input.split(" ");

    if (parts.length < 2) {
      showHelp(context);
      return;
    }

    String subcommand = parts[1].toLowerCase();

    switch (subcommand) {
      case "runtime":
        showRuntimeInfo(context);
        break;
      case "reload":
        doReload(context);
        break;
      default:
        showHelp(context);
        break;
    }
  }

  private void showHelp(CommandContext context) {
    context.sendMessage(Message.empty()
      .insert(Message.raw("--- ").color(COLOR_ACCENT))
      .insert(Message.raw("HytaleJS").color(COLOR_HEADER).bold(true))
      .insert(Message.raw(" ---").color(COLOR_ACCENT)));

    context.sendMessage(Message.empty()
      .insert(Message.raw("  /hytalejs runtime").color(COLOR_COMMAND).bold(true))
      .insert(Message.raw(" > ").color(COLOR_ACCENT))
      .insert(Message.raw("Show runtime debug information").color(COLOR_DESC)));

    context.sendMessage(Message.empty()
      .insert(Message.raw("  /hytalejs reload").color(COLOR_COMMAND).bold(true))
      .insert(Message.raw(" > ").color(COLOR_ACCENT))
      .insert(Message.raw("Reload all scripts").color(COLOR_DESC)));
  }

  private void showRuntimeInfo(CommandContext context) {
    HytaleJS.RuntimeDebugInfo info = plugin.getRuntimeDebugInfo();

    context.sendMessage(Message.empty()
      .insert(Message.raw("--- ").color(COLOR_ACCENT))
      .insert(Message.raw("Runtime Debug").color(COLOR_HEADER).bold(true))
      .insert(Message.raw(" ---").color(COLOR_ACCENT)));

    context.sendMessage(Message.empty()
      .insert(Message.raw("  Runtime      ").color(COLOR_LABEL))
      .insert(Message.raw("| ").color(COLOR_ACCENT))
      .insert(Message.raw(info.getRuntimeName()).color(COLOR_VALUE).bold(true)));

    context.sendMessage(Message.empty()
      .insert(Message.raw("  Scripts Dir  ").color(COLOR_LABEL))
      .insert(Message.raw("| ").color(COLOR_ACCENT))
      .insert(Message.raw(String.valueOf(info.getScriptsDir())).color(COLOR_VALUE)));

    context.sendMessage(Message.empty()
      .insert(Message.raw("  Javet Lib    ").color(COLOR_LABEL))
      .insert(Message.raw("| ").color(COLOR_ACCENT))
      .insert(Message.raw(info.getJavetLibVersion()).color(COLOR_VALUE)));

    context.sendMessage(Message.empty()
      .insert(Message.raw("  Javet DL     ").color(COLOR_LABEL))
      .insert(Message.raw("| ").color(COLOR_ACCENT))
      .insert(Message.raw(info.isJavetDownloadEnabled() ? "enabled" : "disabled").color(COLOR_VALUE)));

    context.sendMessage(Message.empty()
      .insert(Message.raw("  Javet URL    ").color(COLOR_LABEL))
      .insert(Message.raw("| ").color(COLOR_ACCENT))
      .insert(Message.raw(info.getJavetBaseUrl()).color(COLOR_VALUE)));

    context.sendMessage(Message.raw("-------------------").color(COLOR_ACCENT));
  }

  private void doReload(CommandContext context) {
    context.sendMessage(Message.empty()
      .insert(Message.raw("[*] ").color(COLOR_WARNING))
      .insert(Message.raw("Reloading scripts...").color(COLOR_VALUE)));

    HytaleJS.ReloadResult result = plugin.reloadScripts();

    if (result.getFailed() == 0) {
      context.sendMessage(Message.empty()
        .insert(Message.raw("[OK] ").color(COLOR_SUCCESS))
        .insert(Message.raw("Reloaded " + result.getLoaded() + " scripts").color(COLOR_SUCCESS).bold(true)));
    } else {
      context.sendMessage(Message.empty()
        .insert(Message.raw("[!] ").color(COLOR_WARNING))
        .insert(Message.raw("Reloaded " + result.getLoaded() + " scripts (" + result.getFailed() + " failed)").color(COLOR_WARNING).bold(true)));
    }
  }
}
