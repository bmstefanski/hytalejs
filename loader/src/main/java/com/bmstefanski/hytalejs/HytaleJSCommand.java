package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.Message;
import com.hypixel.hytale.server.core.command.system.CommandContext;
import com.hypixel.hytale.server.core.command.system.basecommands.CommandBase;

import javax.annotation.Nonnull;
import java.util.List;

public class HytaleJSCommand extends CommandBase {
  private final HytaleJS plugin;

  private static final String COLOR_HEADER = "#5DADE2";
  private static final String COLOR_ACCENT = "#A569BD";
  private static final String COLOR_LABEL = "#AEB6BF";
  private static final String COLOR_VALUE = "#F8F9F9";
  private static final String COLOR_SUCCESS = "#52BE80";
  private static final String COLOR_WARNING = "#F39C12";
  private static final String COLOR_DANGER = "#E74C3C";
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
      case "poolstats":
        showPoolStats(context);
        break;
      case "tasks":
        showTasks(context);
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
      .insert(Message.raw("  /hytalejs poolstats").color(COLOR_COMMAND).bold(true))
      .insert(Message.raw(" > ").color(COLOR_ACCENT))
      .insert(Message.raw("View context pool statistics").color(COLOR_DESC)));

    context.sendMessage(Message.empty()
      .insert(Message.raw("  /hytalejs tasks").color(COLOR_COMMAND).bold(true))
      .insert(Message.raw(" > ").color(COLOR_ACCENT))
      .insert(Message.raw("Show queued operations").color(COLOR_DESC)));
  }

  private void showPoolStats(CommandContext context) {
    HytaleJS.ContextPoolStats stats = plugin.getContextPoolStats();

    context.sendMessage(Message.empty()
      .insert(Message.raw("--- ").color(COLOR_ACCENT))
      .insert(Message.raw("Context Pool").color(COLOR_HEADER).bold(true))
      .insert(Message.raw(" ---").color(COLOR_ACCENT)));

    context.sendMessage(Message.empty()
      .insert(Message.raw("  Pool Size    ").color(COLOR_LABEL))
      .insert(Message.raw("| ").color(COLOR_ACCENT))
      .insert(Message.raw(String.valueOf(stats.getTotal())).color(COLOR_VALUE).bold(true)));

    context.sendMessage(Message.empty()
      .insert(Message.raw("  Available    ").color(COLOR_LABEL))
      .insert(Message.raw("| ").color(COLOR_ACCENT))
      .insert(Message.raw(String.valueOf(stats.getAvailable())).color(COLOR_SUCCESS).bold(true)));

    context.sendMessage(Message.empty()
      .insert(Message.raw("  Busy         ").color(COLOR_LABEL))
      .insert(Message.raw("| ").color(COLOR_ACCENT))
      .insert(Message.raw(String.valueOf(stats.getBusy())).color(COLOR_WARNING).bold(true)));

    int usagePercent = stats.getTotal() > 0
      ? Math.round((float) stats.getBusy() / stats.getTotal() * 100)
      : 0;

    String usageColor = usagePercent >= 100 ? COLOR_DANGER
      : usagePercent >= 75 ? COLOR_WARNING
      : usagePercent >= 50 ? "#F4D03F"
      : COLOR_SUCCESS;

    String bar = generateUsageBar(usagePercent);

    context.sendMessage(Message.empty()
      .insert(Message.raw("  Usage        ").color(COLOR_LABEL))
      .insert(Message.raw("| ").color(COLOR_ACCENT))
      .insert(Message.raw(usagePercent + "%").color(usageColor).bold(true))
      .insert(Message.raw(" " + bar).color(usageColor)));

    if (stats.getBusy() >= stats.getTotal()) {
      context.sendMessage(Message.empty()
        .insert(Message.raw("  [!] ").color(COLOR_DANGER))
        .insert(Message.raw("All contexts busy - operations queued").color(COLOR_DANGER).bold(true)));
    } else if (stats.getBusy() >= stats.getTotal() * 0.75) {
      context.sendMessage(Message.empty()
        .insert(Message.raw("  [*] ").color(COLOR_WARNING))
        .insert(Message.raw("High load - " + usagePercent + "% capacity").color(COLOR_WARNING)));
    }

    context.sendMessage(Message.raw("-------------------").color(COLOR_ACCENT));
  }

  private void showTasks(CommandContext context) {
    List<ContextPool.QueuedOperation> queued = plugin.getQueuedOperations();

    context.sendMessage(Message.empty()
      .insert(Message.raw("--- ").color(COLOR_ACCENT))
      .insert(Message.raw("Queued Tasks").color(COLOR_HEADER).bold(true))
      .insert(Message.raw(" ---").color(COLOR_ACCENT)));

    if (queued.isEmpty()) {
      context.sendMessage(Message.empty()
        .insert(Message.raw("  [OK] ").color(COLOR_SUCCESS))
        .insert(Message.raw("No operations waiting - pool is healthy").color(COLOR_SUCCESS)));
      context.sendMessage(Message.raw("-------------------").color(COLOR_ACCENT));
      return;
    }

    for (int i = 0; i < queued.size(); i++) {
      ContextPool.QueuedOperation op = queued.get(i);
      String waitTime = formatWaitTime(op.getWaitTimeMs());
      String icon = getOperationIcon(op.getOperation());

      String timeColor = op.getWaitTimeMs() > 5000 ? COLOR_DANGER
        : op.getWaitTimeMs() > 2000 ? COLOR_WARNING
        : COLOR_VALUE;

      context.sendMessage(Message.empty()
        .insert(Message.raw("  " + icon + " ").color(COLOR_ACCENT))
        .insert(Message.raw(op.getOperation()).color(COLOR_VALUE))
        .insert(Message.raw(" - ").color(COLOR_LABEL))
        .insert(Message.raw(waitTime).color(timeColor).bold(true)));
    }

    if (queued.size() > 3) {
      context.sendMessage(Message.empty()
        .insert(Message.raw("  [!] ").color(COLOR_WARNING))
        .insert(Message.raw("High queue depth - consider increasing pool size").color(COLOR_WARNING)));
    }

    context.sendMessage(Message.raw("-------------------").color(COLOR_ACCENT));
  }

  private String formatWaitTime(long ms) {
    if (ms < 1000) {
      return ms + "ms";
    } else if (ms < 60000) {
      return String.format("%.1fs", ms / 1000.0);
    } else {
      return String.format("%.1fm", ms / 60000.0);
    }
  }

  private String getOperationIcon(String operation) {
    if (operation.startsWith("command:")) return "[CMD]";
    if (operation.startsWith("event:")) return "[EVT]";
    if (operation.startsWith("scheduler:")) return "[SCH]";
    return "[???]";
  }

  private String generateUsageBar(int percent) {
    int filledBlocks = percent / 10;
    StringBuilder bar = new StringBuilder("[");
    for (int i = 0; i < 10; i++) {
      bar.append(i < filledBlocks ? "#" : ".");
    }
    bar.append("]");
    return bar.toString();
  }
}

