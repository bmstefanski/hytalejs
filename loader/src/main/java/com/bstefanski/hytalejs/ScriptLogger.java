package com.bstefanski.hytalejs;

import com.hypixel.hytale.logger.HytaleLogger;
import java.util.logging.Level;

public class ScriptLogger {
    private final HytaleLogger logger;

    public ScriptLogger(HytaleLogger logger) {
        this.logger = logger;
    }

    public void info(String message) {
        logger.at(Level.INFO).log(message);
    }

    public void warning(String message) {
        logger.at(Level.WARNING).log(message);
    }

    public void severe(String message) {
        logger.at(Level.SEVERE).log(message);
    }

    public void fine(String message) {
        logger.at(Level.FINE).log(message);
    }
}
