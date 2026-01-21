package com.bmstefanski.hytalejs;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.nio.file.Files;
import java.nio.file.Path;

public class HytaleJSConfig {
  private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

  private JavetConfig javet = new JavetConfig();
  private boolean disableJoinMessage = true;
  private boolean disableLeaveMessage = true;

  public static HytaleJSConfig load(Path configPath) {
    if (!Files.exists(configPath)) {
      HytaleJSConfig config = new HytaleJSConfig();
      config.save(configPath);
      return config;
    }

    try {
      String content = Files.readString(configPath);
      JsonObject root = JsonParser.parseString(content).getAsJsonObject();
      HytaleJSConfig config = new HytaleJSConfig();

      JsonElement javetElement = root.get("javet");
      if (javetElement != null && javetElement.isJsonObject()) {
        JavetConfig javetConfig = GSON.fromJson(javetElement, JavetConfig.class);
        if (javetConfig != null) {
          config.javet = javetConfig;
        }
      }

      JsonElement disableJoinElement = root.get("disableJoinMessage");
      if (disableJoinElement != null && disableJoinElement.isJsonPrimitive()) {
        config.disableJoinMessage = disableJoinElement.getAsBoolean();
      }

      JsonElement disableLeaveElement = root.get("disableLeaveMessage");
      if (disableLeaveElement != null && disableLeaveElement.isJsonPrimitive()) {
        config.disableLeaveMessage = disableLeaveElement.getAsBoolean();
      }

      return config;
    } catch (Exception e) {
      return new HytaleJSConfig();
    }
  }

  public void save(Path configPath) {
    try {
      String json = GSON.toJson(this);
      Files.writeString(configPath, json);
    } catch (Exception ignored) {
    }
  }

  public JavetConfig getJavet() {
    return javet;
  }

  public boolean isDisableJoinMessage() {
    return disableJoinMessage;
  }

  public boolean isDisableLeaveMessage() {
    return disableLeaveMessage;
  }

  public static class JavetConfig {
    private boolean download = true;
    private String downloadBaseUrl = "https://repo1.maven.org/maven2";

    public boolean isDownloadEnabled() {
      return download;
    }

    public String getDownloadBaseUrl() {
      return downloadBaseUrl == null || downloadBaseUrl.isBlank()
        ? "https://repo1.maven.org/maven2"
        : downloadBaseUrl;
    }
  }
}
