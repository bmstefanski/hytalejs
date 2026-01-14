package com.hytale.typescript;

import com.hypixel.hytale.server.core.Message;

public class ScriptMessage {

    public static Message raw(String text) {
        return Message.raw(text);
    }

    public Message create(String text) {
        return Message.raw(text);
    }
}
