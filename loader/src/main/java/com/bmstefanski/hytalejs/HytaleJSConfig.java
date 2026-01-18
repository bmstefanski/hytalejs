package com.bmstefanski.hytalejs;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.logging.Level;
import java.util.logging.Logger;

public class HytaleJSConfig {
  private static final Logger LOGGER = Logger.getLogger("HytaleJS");
  private static final int DEFAULT_POOL_SIZE = 6;

  private int poolSize = DEFAULT_POOL_SIZE;

  public static HytaleJSConfig load(Path configPath) {
    HytaleJSConfig config = new HytaleJSConfig();

    if (!Files.exists(configPath)) {
      config.save(configPath);
      LOGGER.log(Level.INFO, "Created default config.json with poolSize: " + DEFAULT_POOL_SIZE);
      return config;
    }

    try {
      String content = Files.readString(configPath);
      String[] lines = content.split("\n");
      for (String line : lines) {
        if (line.contains("\"poolSize\"")) {
          String value = line.substring(line.indexOf(":") + 1).trim();
          value = value.replaceAll("[^0-9]", "");
          if (!value.isEmpty()) {
            config.poolSize = Integer.parseInt(value);
          }
        }
      }
      LOGGER.log(Level.INFO, "Loaded config.json with poolSize: " + config.poolSize);
    } catch (Exception e) {
      LOGGER.log(Level.WARNING, "Failed to load config.json, using defaults", e);
    }

    return config;
  }

  public void save(Path configPath) {
    try {
      String json = "{\n  \"poolSize\": " + poolSize + "\n}\n";
      Files.writeString(configPath, json);
    } catch (IOException e) {
      LOGGER.log(Level.SEVERE, "Failed to save config.json", e);
    }
  }

  public int getPoolSize() {
    return poolSize;
  }
}
