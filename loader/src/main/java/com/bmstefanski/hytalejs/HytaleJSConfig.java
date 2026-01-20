package com.bmstefanski.hytalejs;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.logging.Level;
import java.util.logging.Logger;

public class HytaleJSConfig {
  private static final Logger LOGGER = Logger.getLogger("HytaleJS");
  private static final int DEFAULT_POOL_SIZE = 6;
  private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

  private RuntimeConfig runtime = new RuntimeConfig();
  private JavetConfig javet = new JavetConfig();

  public static HytaleJSConfig load(Path configPath) {
    if (!Files.exists(configPath)) {
      HytaleJSConfig config = new HytaleJSConfig();
      config.save(configPath);
        LOGGER.log(Level.INFO,
        "Created default config.json with poolSize: " + config.getRuntimePoolSize());
      return config;
    }

    try {
      String content = Files.readString(configPath);
      JsonObject root = JsonParser.parseString(content).getAsJsonObject();
      HytaleJSConfig config = new HytaleJSConfig();

      JsonElement runtimeElement = root.get("runtime");
      if (runtimeElement != null && runtimeElement.isJsonObject()) {
        RuntimeConfig runtimeConfig = GSON.fromJson(runtimeElement, RuntimeConfig.class);
        if (runtimeConfig != null) {
          config.runtime = runtimeConfig;
        }
      }

      JsonElement poolSizeElement = root.get("poolSize");
      if (poolSizeElement != null && poolSizeElement.isJsonPrimitive()) {
        int legacyPoolSize = poolSizeElement.getAsInt();
        config.runtime.setPoolSize(legacyPoolSize);
      }

      JsonElement javetElement = root.get("javet");
      if (javetElement != null && javetElement.isJsonObject()) {
        JavetConfig javetConfig = GSON.fromJson(javetElement, JavetConfig.class);
        if (javetConfig != null) {
          config.javet = javetConfig;
        }
      }

      LOGGER.log(Level.INFO,
        "Loaded config.json with poolSize: " + config.getRuntimePoolSize());
      return config;
    } catch (Exception e) {
      LOGGER.log(Level.WARNING, "Failed to load config.json, using defaults", e);
      return new HytaleJSConfig();
    }
  }

  public void save(Path configPath) {
    try {
      String json = GSON.toJson(this);
      Files.writeString(configPath, json);
    } catch (IOException e) {
      LOGGER.log(Level.SEVERE, "Failed to save config.json", e);
    }
  }

  public int getRuntimePoolSize() {
    int size = runtime == null ? DEFAULT_POOL_SIZE : runtime.getPoolSize();
    if (!isRuntimeMultithreaded()) {
      return 1;
    }
    return size;
  }

  public boolean isRuntimeMultithreaded() {
    return runtime == null || runtime.isMultithreaded();
  }

  public JavetConfig getJavet() {
    return javet;
  }

  public RuntimeConfig getRuntimeConfig() {
    return runtime;
  }

  public static class RuntimeConfig {
    private int poolSize = DEFAULT_POOL_SIZE;
    private boolean multithreaded = true;

    public int getPoolSize() {
      return poolSize > 0 ? poolSize : DEFAULT_POOL_SIZE;
    }

    public void setPoolSize(int poolSize) {
      if (poolSize > 0) {
        this.poolSize = poolSize;
      }
    }

    public boolean isMultithreaded() {
      return multithreaded;
    }
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
