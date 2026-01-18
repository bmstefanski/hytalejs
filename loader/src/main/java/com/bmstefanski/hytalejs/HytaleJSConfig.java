package com.bmstefanski.hytalejs;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.logging.Level;
import java.util.logging.Logger;

public class HytaleJSConfig {
  private static final Logger LOGGER = Logger.getLogger("HytaleJS");
  private static final int DEFAULT_POOL_SIZE = 6;
  private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

  private int poolSize = DEFAULT_POOL_SIZE;
  private String runtime = "graal";
  private JavetConfig javet = new JavetConfig();

  public static HytaleJSConfig load(Path configPath) {
    if (!Files.exists(configPath)) {
      HytaleJSConfig config = new HytaleJSConfig();
      config.save(configPath);
      LOGGER.log(Level.INFO, "Created default config.json with poolSize: " + DEFAULT_POOL_SIZE + ", runtime: " + config.runtime);
      return config;
    }

    try {
      String content = Files.readString(configPath);
      HytaleJSConfig config = GSON.fromJson(content, HytaleJSConfig.class);
      LOGGER.log(Level.INFO, "Loaded config.json with poolSize: " + config.poolSize + ", runtime: " + config.runtime);
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

  public int getPoolSize() {
    return poolSize;
  }

  public String getRuntime() {
    return runtime;
  }

  public JavetConfig getJavet() {
    return javet;
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
