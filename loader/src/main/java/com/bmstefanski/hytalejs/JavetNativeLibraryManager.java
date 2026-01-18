package com.bmstefanski.hytalejs;

import com.caoccao.javet.enums.JSRuntimeType;
import com.caoccao.javet.exceptions.JavetException;
import com.caoccao.javet.interop.loader.IJavetLibLoadingListener;
import com.caoccao.javet.interop.loader.JavetLibLoader;
import com.caoccao.javet.utils.JavetOSUtils;
import com.hypixel.hytale.logger.HytaleLogger;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Locale;
import java.util.logging.Level;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

public final class JavetNativeLibraryManager {
  private static final String DEFAULT_MAVEN_BASE_URL = "https://repo1.maven.org/maven2";

  private JavetNativeLibraryManager() {}

  public static void prepare(HytaleJSConfig config, Path dataDir, HytaleLogger logger) {
    HytaleJSConfig.JavetConfig javetConfig = config.getJavet();
    boolean downloadEnabled = javetConfig == null || javetConfig.isDownloadEnabled();
    String baseUrl = javetConfig == null ? DEFAULT_MAVEN_BASE_URL : javetConfig.getDownloadBaseUrl();

    Path javetDir = dataDir.resolve("javet");
    Path jarDir = javetDir.resolve("jars");
    Path libDir = javetDir.resolve("native");

    String libFileName = getLibFileName();
    Path libFile = libDir.resolve(libFileName);

    if (downloadEnabled) {
      try {
        Files.createDirectories(jarDir);
        Files.createDirectories(libDir);
        Path jarPath = downloadNativeJar(baseUrl, jarDir, logger);
        extractLibFromJar(jarPath, libFileName, libFile);
        setExecutableIfNeeded(libFile);
        configureLibLoader(libDir);
      } catch (IOException e) {
        throw new RuntimeException("Failed to prepare Javet native library", e);
      }
    } else if (Files.exists(libFile)) {
      configureLibLoader(libDir);
    } else {
      logger.at(Level.WARNING).log(
        "Javet native download disabled and library not found at %s. Javet may fail to load.",
        libFile.toAbsolutePath());
    }
  }

  private static String getLibFileName() {
    try {
      return new JavetLibLoader(JSRuntimeType.V8).getLibFileName();
    } catch (JavetException e) {
      throw new RuntimeException("Failed to resolve Javet library file name", e);
    }
  }

  private static String resolveOs() {
    if (JavetOSUtils.IS_MACOS) {
      return "macos";
    }
    if (JavetOSUtils.IS_LINUX) {
      return "linux";
    }
    if (JavetOSUtils.IS_WINDOWS) {
      return "windows";
    }
    return null;
  }

  private static String resolveArch() {
    if (JavetOSUtils.IS_ARM64) {
      return "arm64";
    }
    if (JavetOSUtils.IS_X86_64) {
      return "x86_64";
    }
    return null;
  }

  private static Path downloadNativeJar(String baseUrl, Path jarDir, HytaleLogger logger) throws IOException {
    String os = resolveOs();
    String arch = resolveArch();
    if (os == null || arch == null) {
      throw new IllegalStateException("Unsupported OS/arch for Javet native download");
    }

    String artifactId = String.format(Locale.ROOT, "javet-v8-%s-%s", os, arch);
    String version = JavetLibLoader.LIB_VERSION;
    String jarName = artifactId + "-" + version + ".jar";
    Path jarPath = jarDir.resolve(jarName);

    if (Files.exists(jarPath) && Files.size(jarPath) > 0) {
      return jarPath;
    }

    String normalizedBase = baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
    String url = normalizedBase + "/com/caoccao/javet/" + artifactId + "/" + version + "/" + jarName;

    logger.at(Level.INFO).log("Downloading Javet native runtime from %s", url);
    Path tempFile = jarDir.resolve(jarName + ".tmp");
    HttpClient client = HttpClient.newBuilder()
      .followRedirects(HttpClient.Redirect.NORMAL)
      .build();
    HttpRequest request = HttpRequest.newBuilder(URI.create(url))
      .GET()
      .build();
    try {
      HttpResponse<Path> response = client.send(request, HttpResponse.BodyHandlers.ofFile(tempFile));
      if (response.statusCode() != 200) {
        throw new IOException("Failed to download Javet native jar, HTTP " + response.statusCode());
      }
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
      throw new IOException("Interrupted while downloading Javet native jar", e);
    }

    Files.move(tempFile, jarPath, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.ATOMIC_MOVE);
    return jarPath;
  }

  private static void extractLibFromJar(Path jarPath, String libFileName, Path libFile) throws IOException {
    if (Files.exists(libFile) && Files.size(libFile) > 0) {
      return;
    }

    try (ZipFile zipFile = new ZipFile(jarPath.toFile())) {
      ZipEntry entry = zipFile.getEntry(libFileName);
      if (entry == null) {
        throw new IOException("Native library " + libFileName + " not found in " + jarPath.getFileName());
      }
      try (var inputStream = zipFile.getInputStream(entry)) {
        Files.copy(inputStream, libFile, StandardCopyOption.REPLACE_EXISTING);
      }
    }
  }

  private static void setExecutableIfNeeded(Path libFile) throws IOException {
    if (!JavetOSUtils.IS_WINDOWS) {
      File file = libFile.toFile();
      if (!file.setExecutable(true, false)) {
        throw new IOException("Failed to mark native library as executable: " + libFile);
      }
    }
  }

  private static void configureLibLoader(Path libDir) {
    JavetLibLoader.setLibLoadingListener(new IJavetLibLoadingListener() {
      @Override
      public File getLibPath(JSRuntimeType jsRuntimeType) {
        return libDir.toFile();
      }

      @Override
      public boolean isDeploy(JSRuntimeType jsRuntimeType) {
        return false;
      }

      @Override
      public boolean isLibInSystemPath(JSRuntimeType jsRuntimeType) {
        return false;
      }
    });
  }
}
